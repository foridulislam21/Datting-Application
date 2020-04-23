using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories
{
    public class UserRepository : EfRepository<User>, IUserRepository
    {
        private readonly DatingAppData _db;
        public UserRepository(DbContext db) : base(db)
        {
            _db = db as DatingAppData;

        }
        public override async Task<ICollection<User>> GetAll()
        {
            return await _db.Users.Include(p => p.Photos).ToListAsync();
        }
        public override async Task<User> GetById(long id)
        {
            return await _db.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}