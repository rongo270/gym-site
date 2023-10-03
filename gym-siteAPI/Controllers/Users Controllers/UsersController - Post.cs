using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace gym_siteAPI.Controllers
{
    public partial class UsersController : ControllerBase
    {
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] user userRequest)
        {
            try
            {
                var user = await _gym_siteDbContext.user.FirstOrDefaultAsync(x => x.email == userRequest.email && x.password == userRequest.password);
                if (user == null)
                {
                    return Unauthorized("Invalid credentials");
                }

                var tokenString = CreateJwt(user);
                //return Ok(tokenString);
                return Ok(new { Token = tokenString, UserId = user.id, UserName = user.name });
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        private string CreateJwt(user user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("123BossRongoo123");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.lastName),
                new Claim(ClaimTypes.Name,user.name),
                new Claim(ClaimTypes.Email,user.email),
                new Claim("admin", user.admin.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString())
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, user updateProductRequest)
        {
            var user = await _gym_siteDbContext.user.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.id = updateProductRequest.id;
            user.name = updateProductRequest.name;
            user.lastName = updateProductRequest.lastName;
            user.email = updateProductRequest.email;
            user.admin = updateProductRequest.admin;

            await _gym_siteDbContext.SaveChangesAsync();

            return Ok(user);
        }
    }
}
