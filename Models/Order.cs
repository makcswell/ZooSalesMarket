using System.ComponentModel.DataAnnotations;

namespace ZooSalesMarket.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItem>? OrderItems { get; set; }
    }
}
