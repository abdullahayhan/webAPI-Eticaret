using API.Core.DbModels;
using API.Core.Interfaces;
using API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketRepository;
        private readonly IMapper mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            this.basketRepository = basketRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDTO basket)
        {
            var customerBasket = mapper.Map<CustomerBasketDTO, CustomerBasket>(basket);
            var updated = await basketRepository.UpdateBasketAsync(customerBasket);
            return Ok(updated);
        }


        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await basketRepository.DeleteBasketAsync(id);
        }

    }
}
