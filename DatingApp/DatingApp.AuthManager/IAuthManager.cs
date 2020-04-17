using System.Threading.Tasks;
using DatingApp.Models;

namespace DatingApp.AuthManager
{
    public interface IAuthManager
    {
         Task<User> Login(string userName, string password);
         Task<User> Register(User user, string password);
         Task<bool> UserExists(string userName);
    }
}