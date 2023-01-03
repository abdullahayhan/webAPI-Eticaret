using API.Core.DbModels;
using API.Core.DbModels.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Infrastructure.DataContext
{
    public class StoreContext: IdentityDbContext<AppUser>
    {
        public StoreContext(DbContextOptions<StoreContext> options):base(options)
        {
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
    }
}
