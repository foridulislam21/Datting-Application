using DatingApp.AuthManager;
using DatingApp.AuthRepository;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Configurations.AuthConfiguration
{
    public class AuthServiceConfiguration
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddScoped<IAuthManager, IAuthRepository>();
        }
    }
}