using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.Repository.Base;
using DatingApp.Models.PaginationHelper;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories.Base
{
    public abstract class EfRepository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _db;
        public EfRepository(DbContext db)
        {
            _db = db;

        }
        public virtual async Task<bool> Add(T entity)
        {
            await _db.Set<T>().AddAsync(entity);
            return await _db.SaveChangesAsync() > 0;
        }

        public virtual async Task<ICollection<T>> GetAll()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public virtual async Task<PageList<T>> GetAll(UserPrams userPrams)
        {
            var TClass = _db.Set<T>();
            return await PageList<T>.CreateAsync(TClass, userPrams.PageNumber, userPrams.PageSize);
        }

        public virtual async Task<T> GetById(long id)
        {
            return await _db.Set<T>().FindAsync(id);
        }

        public virtual async Task<bool> Remove(T entity)
        {
            _db.Set<T>().Remove(entity);
            return await _db.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> Update(T entity)
        {
            _db.Set<T>().Update(entity);
            return await _db.SaveChangesAsync() > 0;
        }
    }
}