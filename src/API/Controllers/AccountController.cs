using API.Core.DbModels.Identity;
using API.Core.Interfaces;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        // user işlemleri için usermanager kullan ve appuserı içine ver.
        private readonly UserManager<AppUser> userManager;

        // Giriş yapıldı mı yapılmadı mı kontrol etmek için.
        private readonly SignInManager<AppUser> signInManager;


        // token için
        private readonly ITokenService tokenService;


        //mapper için
        private readonly IMapper mapper;


        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            if (user ==null)
                return Unauthorized(new ApiResponse(401));
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized(new ApiResponse(401));

            return new UserDTO
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {

            if (CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use. Please use different email account or login." } });
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
                return BadRequest(new ApiResponse(400));

            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Email=user.Email,
                Token = tokenService.CreateToken(user)
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByUserByClaimPrincipleWithAddressAsync(HttpContext.User);
            return new UserDTO
            {
               DisplayName = user.DisplayName,
               Email = user.Email,
               Token = tokenService.CreateToken(user)
            };
        }



        [HttpGet("emailexists")]
        // parametrede bu sana urlden gelicek diyorum.
        public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }



        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AdressDTO>> GetUserAdress()
        {
            var user = await userManager.FindByUserByClaimPrincipleWithAddressAsync(HttpContext.User);
            return mapper.Map<Adress, AdressDTO>(user.Adress);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AdressDTO>> UpdateUserAdress(AdressDTO adress)
        {
            var user = await userManager.FindByUserByClaimPrincipleWithAddressAsync(HttpContext.User);
            user.Adress = mapper.Map<AdressDTO,Adress>(adress);
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(mapper.Map<Adress, AdressDTO>(user.Adress));
            }
            else
            {
                return BadRequest("Update Error");
            }

        }



    }
}
