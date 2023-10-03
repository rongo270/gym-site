using gym_siteAPI.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace gym_siteAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class ProductsController : Controller
    {
        private readonly gym_siteDbContext gym_siteDbContext;
        public ProductsController(gym_siteDbContext gym_siteDbContext)
        {
            this.gym_siteDbContext = gym_siteDbContext;
        }

    }
}