using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooSalesMarket.Models;
using ZooSalesMarket.Data;

namespace ZooSalesMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoinsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/coins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coin>>> GetCoins()
        {
            return await _context.Coins.ToListAsync();
        }

        // POST: api/coins
        [HttpPost]
        public async Task<ActionResult<Coin>> PostCoin(Coin coin)
        {
            _context.Coins.Add(coin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoin", new { id = coin.Id }, coin);
        }
    }
}
