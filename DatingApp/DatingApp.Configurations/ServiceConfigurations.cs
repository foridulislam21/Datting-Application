using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL;
using DatingApp.DbServer;
using DatingApp.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Configurations
{
    public static class ServiceConfigurations
    {
        public static void Configure(IServiceCollection services)
        {
            // user
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserManager, UserManager>();
            //photo
            services.AddTransient<IPhotoRepository, PhotoRepository>();
            services.AddTransient<IPhotoManager, PhotoManager>();
            //Like
            services.AddTransient<ILikeRepository, LikeRepository>();
            services.AddTransient<ILikeManager, LikeManager>();
            services.AddTransient<DbContext, DatingAppData>();
            services.AddTransient<DatingAppData>();
        }
    }
}