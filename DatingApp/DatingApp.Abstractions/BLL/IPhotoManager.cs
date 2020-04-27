using System.Threading.Tasks;
using DatingApp.Abstractions.BLL.Base;
using DatingApp.Models;

namespace DatingApp.Abstractions.BLL
{
    public interface IPhotoManager : IManager<Photo>
    {
        Task<Photo> GetMainPhotoForUser(long userId);
    }
}