using DatingApp.AuthManager;
using DatingApp.AuthRepository;
using DatingApp.Configurations.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Configurations.AuthConfiguration
{
    public static class AuthServiceConfiguration
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddScoped<IAuthManager, IAuthRepository>();
            services.AddScoped<LogUserActivity>();

        }
    }
}