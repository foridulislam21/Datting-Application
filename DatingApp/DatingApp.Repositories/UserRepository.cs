using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Models.PaginationHelper;
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
        public override async Task<PageList<User>> GetAll(UserPrams userPrams)
        {
            var users =  _db.Users.Include(p => p.Photos).AsQueryable();
            users = users.Where(u =>u.Id !=userPrams.UserId);
            users = users.Where(u => u.Gender == userPrams.Gender);
            return await PageList<User>.CreateAsync(users , userPrams.PageNumber, userPrams.PageSize);
        }
        public override async Task<User> GetById(long id)
        {
            return await _db.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}