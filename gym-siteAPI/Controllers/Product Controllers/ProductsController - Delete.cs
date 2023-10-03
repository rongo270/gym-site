using gym_siteAPI.data;
using gym_siteAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using static gym_siteAPI.Helpers.ExceptionHandler;

namespace gym_siteAPI.Controllers
{
    public partial class ProductsController : Controller
    {

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            try
            {
                var product = await gym_siteDbContext.products.FindAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                gym_siteDbContext.products.Remove(product);
                await gym_siteDbContext.SaveChangesAsync();

                string imagePath = Paths.GetLocalPath() + @"/" + product.image!;
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }

                return Ok(product);
            }
            catch (NotFoundInDbException exception)
            {
                string myError = "Not found in DataBase";
                MyLogger.LogException(myError, exception);
                return NotFound(myError);
            }
            catch (Exception exception)
            {
                string myError = "Unknown Error";
                MyLogger.LogException(myError, exception);
                return StatusCode(500, "An error occurred while deleting the product.");
            }

        }
    }
}
