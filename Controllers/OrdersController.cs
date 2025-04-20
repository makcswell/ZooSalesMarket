using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooSalesMarket.Models;
using ZooSalesMarket.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ZooSalesMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            
            var orders = await _context.Orders.Include(o => o.OrderItems).ToListAsync();
            return Ok(orders); 
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
         
            if (order == null || order.OrderItems == null || order.OrderItems.Count == 0)
            {
                return BadRequest("Order is null or has no items."); 
            }

            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync(); 
            }
            catch (DbUpdateException ex)
            {
               
                return StatusCode(500, "Internal server error while saving the order: " + ex.Message);
            }

            
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // GET: api/orders/test
        [HttpGet("test")]
        public ActionResult<string> Test()
        {
            return "Controller is working!"; 
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(); 
            }

            return Ok(order);
        }
    }
}
