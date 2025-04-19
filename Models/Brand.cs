using System.ComponentModel.DataAnnotations;

namespace ZooSalesMarket.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<Products>? Product { get; set; }
    }
}
