using System.Threading.Tasks;
using DatingApp.Abstractions.BLL.Base;
using DatingApp.Models;

namespace DatingApp.Abstractions.BLL
{
    public interface ILikeManager : IManager<Like>
    {
        Task<Like> GetLike(long userId, long recipientId);
    }
}