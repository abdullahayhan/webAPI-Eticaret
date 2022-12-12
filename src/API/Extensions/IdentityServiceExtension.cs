using API.Core.DbModels.Identity;
using API.Infrastructure.DataContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class IdentityServiceExtension
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config)
        {
            // bu classı identitycore olarak ekle
            var builder = services.AddIdentityCore<AppUser>(); 

            // builder oluştur ve userType ve bir adet service ver
            builder = new IdentityBuilder(builder.UserType,builder.Services);
            
            // Bu context üzerinden işlemlerini yapacaksın. 
            builder.AddEntityFrameworkStores<StoreContext>();

            // SingInManager gördüğün anda AppUser üzerinden işlem yaptığını anla.
            builder.AddSignInManager<SignInManager<AppUser>>();

            // yetkili mi değil mi diye
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => 
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                        ValidIssuer = config["Token:Issuer"],
                        ValidateIssuer = true
                };
                }); 


            return services;
        }
    }
}
