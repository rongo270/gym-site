using gym_siteAPI.data;
using gym_siteAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using static gym_siteAPI.Helpers.ExceptionHandler;

namespace gym_siteAPI.Controllers
{
    public partial class UsersController : ControllerBase
    {
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            try
            {
                var user = await _gym_siteDbContext.user.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _gym_siteDbContext.user.Remove(user);
                await _gym_siteDbContext.SaveChangesAsync();


                return Ok(user);
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
                return StatusCode(500, "An error occurred while deleting the user.");
            }

        }
    }
}
