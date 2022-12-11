using API.Core.DbModels.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Infrastructure.DataContext
{
    public class AppIdentitySeedData
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Abdullah",
                    Email = "aayhaan4@gmail.com",
                    UserName = "AbdullahAyhan",
                    Adress = new Adress 
                    {
                      FirstName="Abdullah",
                      LastName="Ayhan",
                      Street="Şeker Mahalle",
                      City="Sakarya",
                      State="TR",
                      ZipCode="54000"
                    },
                };
                var x = await userManager.CreateAsync(user,"aA.&12345");
            }
        }
    }
}
