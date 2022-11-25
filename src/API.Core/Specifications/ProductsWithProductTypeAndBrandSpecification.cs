using API.Core.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Specifications
{
    public class ProductsWithProductTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductsWithProductTypeAndBrandSpecification()
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
        public ProductsWithProductTypeAndBrandSpecification(int id):base(x=>x.ID==id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
