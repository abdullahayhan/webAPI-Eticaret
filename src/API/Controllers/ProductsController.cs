    using API.Core.DbModels;
using API.Core.Interfaces;
using API.Core.Specifications;
using API.Dtos;
using API.Helpers;
using API.Infrastructure.DataContext;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productRepository;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;
        public ProductsController(IGenericRepository<Product> productRepository, IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo, IMapper mapper)
        {
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.productRepository = productRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async  Task<ActionResult<Pagination<ProductDTO>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification(productSpecParams);

            var countSpec = new ProductWithFiltersForCountSpec(productSpecParams);

            var totalItems = await productRepository.CountAsync(countSpec);

            var products = await productRepository.ListAsync(spec);


            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDTO>>(products);

            return Ok(new Pagination<ProductDTO>(productSpecParams.PageIndex,productSpecParams.PageSize,totalItems,data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetSingleProduct(int id)
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification(id);
            var product = await productRepository.GetEntityWithSpec(spec);
            return mapper.Map<Product, ProductDTO>(product);
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
