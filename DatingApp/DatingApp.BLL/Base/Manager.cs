using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL.Base;
using DatingApp.Abstractions.Repository.Base;

namespace DatingApp.BLL.Base
{
    public abstract class Manager<T> : IManager<T> where T : class
    {
        private readonly IRepository<T> _repo;
        public Manager(IRepository<T> repo)
        {
            _repo = repo;

        }
        public virtual async Task<bool> Add(T entity)
        {
            return await _repo.Add(entity);
        }

        public virtual async Task<ICollection<T>> GetAll()
        {
            return await _repo.GetAll();
        }

        public virtual async Task<T> GetById(long id)
        {
            return await _repo.GetById(id);
        }

        public virtual async Task<bool> Remove(T entity)
        {
            return await _repo.Remove(entity);
        }

        public virtual async Task<bool> SaveAll()
        {
            return await _repo.SaveAll();
        }

        public virtual async Task<bool> Update(T entity)
        {
            return await _repo.Update(entity);
        }
    }
}