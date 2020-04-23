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
            services.AddTransient<IValueRepository, ValueRepository>();
            services.AddTransient<IValueManager, ValueManager>();
            // user
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<DbContext, DatingAppData>();
            services.AddTransient<DatingAppData>();
        }
    }
}