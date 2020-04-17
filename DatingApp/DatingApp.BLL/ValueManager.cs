using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL.Base;
using DatingApp.Models;

namespace DatingApp.BLL
{
    public class ValueManager : Manager<Value>, IValueManager
    {
        private readonly IValueRepository _repo;
        public ValueManager(IValueRepository repo) : base(repo)
        {
            _repo = repo;

        }
    }
}