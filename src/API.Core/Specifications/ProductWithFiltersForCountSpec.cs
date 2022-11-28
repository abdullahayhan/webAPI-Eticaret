using API.Core.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Specifications
{
    public class ProductWithFiltersForCountSpec : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpec(ProductSpecParams productSpecParams)
           : base(x =>
            (string.IsNullOrWhiteSpace(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search))
            &&
             (!productSpecParams.BrandId.HasValue || x.ProductBrandID == productSpecParams.BrandId)
             &&
             (!productSpecParams.TypeId.HasValue || x.ProductTypeID == productSpecParams.TypeId)
            )
        {

        }
    }
}
