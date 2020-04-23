using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL.Base;
using DatingApp.Models;

namespace DatingApp.BLL
{
    public class UserManager : Manager<User>, IUserManager
    {
        private readonly IUserRepository _repo;
        public UserManager(IUserRepository repo) : base(repo)
        {
            _repo = repo;
        }
    }
}