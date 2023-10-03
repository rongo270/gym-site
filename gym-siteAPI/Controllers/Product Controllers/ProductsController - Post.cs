using gym_siteAPI.data;
using gym_siteAPI.Models;
using Microsoft.AspNetCore.Mvc;
using gym_siteAPI.Controllers;
using gym_siteAPI.Migrations;
using Microsoft.EntityFrameworkCore;

namespace gym_siteAPI.Controllers
{
    public partial class ProductsController : Controller
    {

        [HttpPut]
        [Route("Available/{id}")]
        public async Task<IActionResult> UpdateAvailable([FromRoute] Guid id, [FromBody] int plus)
        {
            var product = await gym_siteDbContext.products.FindAsync(id);
            if (product == null)
                return NotFound();
            product.available = product.available + plus;
            await gym_siteDbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id,gym_siteAPI.Models.product updateProductRequest)
        {
            var product = await gym_siteDbContext.products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            if (!string.IsNullOrEmpty(checkName(updateProductRequest.name)))
                return BadRequest(new { Message = checkName(updateProductRequest.name).ToString() });

            if (!string.IsNullOrEmpty(checkPrice(updateProductRequest.price)))
                return BadRequest(new { Message = checkPrice(updateProductRequest.price).ToString() });

            if (!string.IsNullOrEmpty(checkAvailable(updateProductRequest.available)))
                return BadRequest(new { Message = checkAvailable(updateProductRequest.available).ToString() });

            product.id = updateProductRequest.id;
            product.name = updateProductRequest.name;
            product.price = updateProductRequest.price;
            product.available = updateProductRequest.available;
            product.read = updateProductRequest.read;

            await gym_siteDbContext.SaveChangesAsync();

            return Ok(product);

        }

        [HttpPost]
        [Route("GetCartItem")]
        public async Task<IActionResult> GetCartItem([FromBody] CartItem[] cartItems)
        {
            var products = new gym_siteAPI.Models.product[0];
            foreach (var cartItem in cartItems)
            {
                var product = await RetrieveProductById(cartItem.ProductId);

                if (product != null)
                {
                    var newLength = products.Length + cartItem.Quantity;

                    var newProducts = new gym_siteAPI.Models.product[newLength];

                    products.CopyTo(newProducts, 0);

                    for (var i = products.Length; i < newLength; i++)
                    {
                        newProducts[i] = product;
                    }

                    products = newProducts;
                }
            }
                return Ok(products);
        }

        private async Task<gym_siteAPI.Models.product> RetrieveProductById(Guid productId)
        {
            try
            {
                var product = await gym_siteDbContext.products.FirstOrDefaultAsync(p => p.id == productId);

                return product;
            }
            catch (Exception exception)
            {
                return null; 
            }
        }

    }
}
