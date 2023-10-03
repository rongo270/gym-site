using gym_siteAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace gym_siteAPI.Controllers
{
    public partial class UsersController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var user = await _gym_siteDbContext.user.ToListAsync();
            return Ok(user);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> getUser([FromRoute] Guid id)
        {
            var product = await _gym_siteDbContext.user.FirstOrDefaultAsync(x => x.id == id);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}
