using API.Core.DbModels;
using API.Core.Interfaces;
using API.Core.Specifications;
using API.Infrastructure.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        
        private readonly IGenericRepository<Product> productRepository;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        public ProductsController(IGenericRepository<Product> productRepository, IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo)
        {
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.productRepository = productRepository;
        }
        [HttpGet]
        public async  Task<ActionResult<List<Product>>> GetProducts()
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification();
            var data = await productRepository.ListAsync(spec);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetSingleProduct(int id)
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification(id);
            return await productRepository.GetEntityWithSpec(spec);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductType()
        {
            return Ok(await productTypeRepo.ListAllAsync());
        }
    }
}
