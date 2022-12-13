using API.Core.DbModels;
using API.Core.DbModels.Identity;
using API.Dtos;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDTO>()
                .ForMember(x=>x.ProductBrand,y=>y.MapFrom(z=>z.ProductBrand.Name))
                .ForMember(x=>x.ProductType,y=>y.MapFrom(z=>z.ProductType.Name));


            CreateMap<Adress, AdressDTO>().ReverseMap();
            CreateMap<CustomerBasketDTO, CustomerBasket>();
            CreateMap<BasketItemDTO, BasketItem>();
        }
    }
}
