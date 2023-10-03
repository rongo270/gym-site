using gym_siteAPI.data;
using gym_siteAPI.Models;
using gym_siteAPI.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace gym_siteAPI.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly gym_siteDbContext gym_siteDbContext;
        private readonly IConfiguration _configuration;

        public CartController(gym_siteDbContext gym_siteDbContext, IConfiguration configuration)
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

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var cartItems = await gym_siteDbContext.CartItems.Where(x => x.UserId == id).ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                return NotFound();
            }
            else
            {
                foreach (var cartItem in cartItems)
                {
                    var product = await gym_siteDbContext.products.Where(x => x.id == cartItem.ProductId).FirstOrDefaultAsync();
                    product.available += cartItem.Quantity;
                    gym_siteDbContext.CartItems.Remove(cartItem);
                }

                
                await gym_siteDbContext.SaveChangesAsync();
                return Ok(cartItems);
            }
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> getCart([FromRoute] Guid id)
        {
            var CartItems = await gym_siteDbContext.CartItems
                .Where(x => x.UserId == id)
                .ToListAsync();

            if (CartItems == null || !CartItems.Any())
            {
                return NotFound();
            }

            return Ok(CartItems);
        }

        [HttpPost]
        [Route("Remove-to-cart")]
        public async Task<IActionResult> RemoveFromCart(CartItem itemRequest)
        {
            var item = await gym_siteDbContext.CartItems.FirstOrDefaultAsync(x => x.ProductId == itemRequest.ProductId && x.UserId == itemRequest.UserId);
            if (item == null)
            {
                return NotFound();
            }
            if (item.Quantity > 1)
            {
                item.Quantity = item.Quantity - 1;
            }
            else
            {
                gym_siteDbContext.CartItems.Remove(item);
            }
            await gym_siteDbContext.SaveChangesAsync();

            return Ok(new { message = "Item deleted from cart successfully." });
        }


        [HttpPost]
        [Route("add-to-cart")]
        public IActionResult AddToCart([FromBody] CartItem cartItemRequest)
        {
            try
            {
                var product = gym_siteDbContext.products.Find(cartItemRequest.ProductId);

                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                var user = gym_siteDbContext.user.Find(cartItemRequest.UserId);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var existingCartItem = gym_siteDbContext.CartItems
                    .FirstOrDefault(c => c.UserId == cartItemRequest.UserId && c.ProductId == cartItemRequest.ProductId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += 1; 
                }
                else
                {
                    var newItem = new CartItem
                    {
                        UserId = cartItemRequest.UserId,
                        ProductId = cartItemRequest.ProductId,
                        Quantity = 1 
                };

                    gym_siteDbContext.CartItems.Add(newItem);
                }

                gym_siteDbContext.SaveChanges();

                return Ok(new { message = "Item added to cart successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
