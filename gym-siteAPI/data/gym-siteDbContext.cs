using gym_siteAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace gym_siteAPI.data
{
    public class gym_siteDbContext : DbContext
    {
        public gym_siteDbContext()
        {
        }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }

        public gym_siteDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships between entities, if any

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<user> user { get; set; }
        public DbSet<product> products { get; set; }


    }
}
