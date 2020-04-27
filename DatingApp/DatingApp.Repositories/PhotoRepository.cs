using System.Linq;
using System.Threading.Tasks;
using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories
{
    public class PhotoRepository : EfRepository<Photo>, IPhotoRepository
    {
        private readonly DatingAppData _db;
        public PhotoRepository(DbContext db) : base(db)
        {
            _db = db as DatingAppData;
        }
        public async override Task<Photo> GetById(long id)
        {
            return await _db.Photos.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Photo> GetMainPhotoForUser(long userId)
        {
            return await _db.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }
    }
}