using gym_siteAPI.Models;
using gym_siteAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static gym_siteAPI.Helpers.ExceptionHandler;
using System;

namespace gym_siteAPI.Controllers
{
    public partial class ProductsController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                bool InvalidImageCheck = false;
                var products = await gym_siteDbContext.products.ToArrayAsync();

                foreach (var p in products)
                {
                    // If image exists use it, else use empty
                    string imagePath = Paths.GetLocalPath() + @"/" + p.image!;
                    if (System.IO.File.Exists(imagePath))
                    {
                        p.image = System.IO.File.ReadAllBytesAsync(Paths.GetLocalPath() + @"/" + p.image!).ToString();
                    }

                    else
                    {
                        p.image = "";
                        InvalidImageCheck = true;
                    }
                }
                if (InvalidImageCheck)
                {
                    // Partial Content because not all images loaded
                    return StatusCode(StatusCodes.Status206PartialContent, products);
                }
                return Ok(products);
            }
            catch (Exception exception)
            {
                string myError = "Failed to get all products, unknown error:";
                MyLogger.LogException(myError, exception);
                return StatusCode(StatusCodes.Status500InternalServerError, myError);
            }
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProdact([FromRoute] Guid id)
        {
            var product = await gym_siteDbContext.products.FirstOrDefaultAsync(x => x.id == id);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product); 
        }


        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetProductImage(Guid id)
        {
            try
            {
                var product = await gym_siteDbContext.products.FindAsync(id);

                if (product == null)
                {
                    throw new NotFoundInDbException();
                }

                var imagePath = Path.Combine(Paths.GetGlobalPath(), product.image!);

                if (!System.IO.File.Exists(imagePath))
                {
                    return NotFound();
                }

                var imageBytes = await System.IO.File.ReadAllBytesAsync(imagePath);

                return File(imageBytes, "image/jpeg");
            }
            catch (NotFoundInDbException notFoundInDbException)
            {
                string myError = "Product with id: " + id.ToString() + " was not found in the database.";
                MyLogger.LogException(myError, notFoundInDbException);
                return NotFound(myError);
            }
            catch (Exception exception)
            {
                string myError = "Failed to get product image with id " + id.ToString() + ", unknown error:";
                MyLogger.LogException(myError, exception);
                return StatusCode(StatusCodes.Status500InternalServerError, myError + exception.Message);
            }
        }


    }
}
