using API.Core.DbModels.Identity;
using API.Infrastructure.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class IdentityServiceExtension
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services)
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
            services.AddAuthentication(); 


            return services;
        }
    }
}
