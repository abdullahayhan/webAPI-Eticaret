namespace API.Core.DbModels.Order
{
    public class OrderItem:BaseEntity
    {
        public OrderItem()
        {
        }
        public OrderItem(ProductItemOrdered ıtemOrdered, decimal price, int quantity)
        {
            ItemOrdered = ıtemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

    }
}
