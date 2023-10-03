using Microsoft.Net.Http.Headers;
using gym_siteAPI.Helpers;
using gym_siteAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static gym_siteAPI.Helpers.ExceptionHandler;
using System.Text;

namespace gym_siteAPI.Controllers
{
    public partial class ProductsController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] product productRequest)
        {
            try
            {


                var CheckingExistingNameCar = await gym_siteDbContext.products.FirstOrDefaultAsync(x => x.name == productRequest.name);

                if (CheckingExistingNameCar != null)
                {
                    return Conflict("A product with this name already exists, duplicates are not allowed.");
                }

                //check if ok
                if (!string.IsNullOrEmpty(checkName(productRequest.name)))
                    return BadRequest(new { Message = checkName(productRequest.name).ToString() });

                if (!string.IsNullOrEmpty(checkPrice(productRequest.price)))
                    return BadRequest(new { Message = checkPrice(productRequest.price).ToString() });

                if (!string.IsNullOrEmpty(checkAvailable(productRequest.available)))
                    return BadRequest(new { Message = checkAvailable(productRequest.available).ToString() });

                productRequest.image = productRequest.name + ".jpg";

                productRequest.id = Guid.NewGuid();
                await gym_siteDbContext.products.AddAsync(productRequest);
                await gym_siteDbContext.SaveChangesAsync();
                return Ok(productRequest);
            }
            catch (Exception exception)
            {
                string myError = "Failed to add a product, unknown error:";
                MyLogger.LogException(myError, exception);
                return BadRequest(myError + exception.Message);
            }
        }
        private string checkPrice(int price)
        {
            StringBuilder sb = new StringBuilder();
            if (price < 1 || price > 9999999) sb.Append("price need to be between 1 - 9999999" + Environment.NewLine);
            return sb.ToString();
        }
        private string checkName(string name)
        {
            StringBuilder sb = new StringBuilder();
            if (name.Length < 1 || name.Length > 50) sb.Append("name need to be between 1 - 50 letters" + Environment.NewLine);
            return sb.ToString();
        }
        private string checkAvailable(int available)
        {
            StringBuilder sb = new StringBuilder();
            if (available < 1 || available > 100) sb.Append("available need to be between 1 - 100" + Environment.NewLine);
            return sb.ToString();
        }


        [HttpPost]
        [Route("Image")]
        public async Task<IActionResult> UploadProductImage()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.FirstOrDefault();

                if (file == null || file.Length == 0)
                {
                    throw new ImageAddingException("Failed to upload a product image, file was empty.");
                }

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim();
                var fullPath = Path.Combine(Paths.GetGlobalPath(), fileName.ToString());
                var dbPath = Path.Combine(Paths.GetLocalPath(), fileName.ToString());

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Created("Product image uploaded successfully!", new { file });
            }
            catch (ImageAddingException ex)
            {
                MyLogger.LogException(ex.Message, ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                string message = "Failed to upload a product image, unknown error.";
                MyLogger.LogException(message, ex);
                return NotFound(message);
            }
        }




    }
}
