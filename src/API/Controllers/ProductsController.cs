using API.Core.DbModels;
using API.Core.Interfaces;
using API.Core.Specifications;
using API.Dtos;
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
        public async  Task<ActionResult<List<ProductDTO>>> GetProducts()
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification();
            var data = await productRepository.ListAsync(spec);
            //return Ok(data);
            return data.Select(p => new ProductDTO 
            {
                ID = p.ID,
                Name = p.Name,
                Description = p.Description,
                PictureUrl = p.PictureUrl,
                Price = p.Price,
                ProductBrand = p.ProductBrand != null ? p.ProductBrand.Name : string.Empty,
                ProductType = p.ProductType != null ? p.ProductType.Name : string.Empty
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetSingleProduct(int id)
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification(id);
            // return await productRepository.GetEntityWithSpec(spec);
            var product = await productRepository.GetEntityWithSpec(spec);
            return new ProductDTO
            {
                ID = product.ID,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                ProductBrand = product.ProductBrand != null ? product.ProductBrand.Name : string.Empty,
                ProductType = product.ProductType != null ? product.ProductType.Name : string.Empty
            };
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
