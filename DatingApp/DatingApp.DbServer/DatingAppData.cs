using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.DbServer
{
    public class DatingAppData : DbContext
    {
        public DatingAppData(DbContextOptions<DatingAppData> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Value> Values { get; set; }
    }
}