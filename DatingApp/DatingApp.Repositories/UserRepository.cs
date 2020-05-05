using System;
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
            var users = _db.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();
            users = users.Where(u => u.Id != userPrams.UserId);
            users = users.Where(u => u.Gender == userPrams.Gender);

            if (userPrams.Likers)
            {
                var userLikers = await GetUserLikes(userPrams.UserId, userPrams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userPrams.Likees)
            {
                var userLikees = await GetUserLikes(userPrams.UserId, userPrams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (userPrams.MinAge != 18 || userPrams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userPrams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userPrams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }
            if (!string.IsNullOrEmpty(userPrams.OrderBy))
            {
                switch (userPrams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            return await PageList<User>.CreateAsync(users, userPrams.PageNumber, userPrams.PageSize);
        }

        private async Task<IEnumerable<long>> GetUserLikes(long id, bool likers)
        {
            var user = await _db.Users
            .Include(x => x.Likers)
            .Include(x => x.Likees)
            .FirstOrDefaultAsync(u => u.Id == id);
            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }
        public override async Task<User> GetById(long id)
        {
            return await _db.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}