using System.ComponentModel.DataAnnotations;

namespace ZooSalesMarket.Models
{
    public class Coin
    {
        [Key]
        public int Id { get; set; }
        public decimal Value { get; set; }
        public int Quantity { get; set; }
    }
}
