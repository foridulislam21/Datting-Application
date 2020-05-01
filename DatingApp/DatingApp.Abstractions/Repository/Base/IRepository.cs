using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Models.PaginationHelper;

namespace DatingApp.Abstractions.Repository.Base
{
    public interface IRepository<T> where T : class
    {
        Task<bool> Add(T entity);
        Task<bool> Remove(T entity);
        Task<bool> Update(T entity);
        Task<PageList<T>> GetAll(UserPrams userPrams);
        Task<T> GetById(long id);
        Task<bool> SaveAll();
    }
}