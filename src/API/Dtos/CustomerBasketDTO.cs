using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CustomerBasketDTO
    {
        [Required]
        public string ID { get; set; }
        [Required]
        public string userToken { get; set; }
        public List<BasketItemDTO> Items { get; set; }
    }
}