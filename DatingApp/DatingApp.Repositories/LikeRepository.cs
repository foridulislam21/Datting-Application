using System.Threading.Tasks;
using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories
{
    public class LikeRepository : EfRepository<Like>, ILikeRepository
    {
        private readonly DatingAppData _db;
        public LikeRepository(DbContext db) : base(db)
        {
            _db = db as DatingAppData;

        }

        public async Task<Like> GetLike(long userId, long recipientId)
        {
            return  await _db.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }
    }
}