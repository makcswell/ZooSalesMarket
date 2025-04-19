using System.ComponentModel.DataAnnotations;

namespace ZooSalesMarket.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int BrandId { get; set; }
        public Brand? Brand { get; set; }
    }
}
