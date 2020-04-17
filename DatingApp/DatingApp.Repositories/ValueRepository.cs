using System.Threading.Tasks;
using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories
{
    public class ValueRepository : EfRepository<Value>, IValueRepository
    {
        private readonly DatingAppData _db;
        public ValueRepository(DbContext db) : base(db)
        {
            _db = db as DatingAppData;
        }
        public override async Task<Value> GetById(long id)
        {
            return await _db.Values.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}