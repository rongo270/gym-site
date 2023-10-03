using gym_siteAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace gym_siteAPI.Controllers
{
    public partial class UsersController : ControllerBase
    {
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] user userRequest)
        {
            try
            {
                // Check if the user already exists
                var existingUser = await _gym_siteDbContext.user.FirstOrDefaultAsync(x => x.email == userRequest.email);
                if (existingUser != null)
                {
                    return BadRequest("User already exists.");
                }
                if (!await _gym_siteDbContext.user.AnyAsync())
                    userRequest.admin = true;

                // Create a new user
                var newUser = new user
                {
                    email = userRequest.email,
                    password = userRequest.password,
                    name = userRequest.name,
                    lastName = userRequest.lastName,
                    admin = userRequest.admin 
                };

                _gym_siteDbContext.user.Add(newUser);
                await _gym_siteDbContext.SaveChangesAsync();

                // Return a success response
                return Ok(newUser);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

    }
}
