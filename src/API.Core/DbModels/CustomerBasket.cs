using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.DbModels
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {

        }
        public CustomerBasket(string ID)
        {
            this.ID = ID;
        }
        public string ID { get; set; }
        public string UserToken { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

    }
}
