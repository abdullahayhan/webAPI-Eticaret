using API.Core.DbModels;
using API.Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Infrastructure.Implements
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase(); // IConnectionMultiplexer bir redis belirteci onun üzerinden ulaşıyoruz.
                                            // IDtabase tipinde oluşturup bunun içine atıyoruz.
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await database.KeyDeleteAsync(basketId); // easy peacy
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId) 
        {
            var data = await database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null: JsonSerializer.Deserialize<CustomerBasket>(data); 
            // gelen ifade json tipinde gelicek deserialize demek ise gelen bu json tipini al ve bir modele çevir.
            // bunun için de customerbasket tipindeki modele çevireceksin çevireceğin değişken ise datadır diyoz.
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await database.StringSetAsync(basket.ID
                , JsonSerializer.Serialize(basket)
                ,TimeSpan.FromDays(30));
            if (!created)
                return null;
            return await GetBasketAsync(basket.ID);
        }
    }
}
