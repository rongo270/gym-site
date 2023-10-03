using Microsoft.AspNetCore.Mvc;
using gym_siteAPI.Models;
using gym_siteAPI.data;
using Microsoft.EntityFrameworkCore;

namespace gym_siteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly gym_siteDbContext gym_siteDbContext;
        private readonly IConfiguration _configuration;

        public OrderController(gym_siteDbContext gym_siteDbContext, IConfiguration configuration)
        {
            this.gym_siteDbContext = gym_siteDbContext;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCarts()
        {
            var cart = await gym_siteDbContext.user.ToListAsync();
            return Ok(cart);
        }



        [HttpGet]
        [Route("getPrice/{id:Guid}")]
        public async Task<IActionResult> getTotlaPrice([FromRoute] Guid id)
        {
            var cartItems = await gym_siteDbContext.CartItems.Where(x => x.UserId == id).ToListAsync();
            int totalPrice = 0;
            int count = 0;
            try
            {
                foreach (var cartItem in cartItems)
                {
                    count = cartItem.Quantity;
                    while (count > 0)
                    {
                        var product = await gym_siteDbContext.products.Where
                            (p => p.id == cartItem.ProductId).FirstOrDefaultAsync();
                        if (product != null)
                        {
                            totalPrice += product.price;
                        }
                        count--;
                    }
                }
                return Ok(totalPrice);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
