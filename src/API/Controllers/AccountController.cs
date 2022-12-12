using API.Core.DbModels.Identity;
using API.Dtos;
using API.Errors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        // user işlemleri için usermanager kullan ve appuserı içine ver.
        private readonly UserManager<AppUser> userManager;

        //Giriş yapıldı mı yapılmadı mı kontrol etmek için.
        private readonly SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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
                Email=user.Email,
                DisplayName=user.DisplayName,
                Token ="This will be token value"
            };
        } 


    }
}
