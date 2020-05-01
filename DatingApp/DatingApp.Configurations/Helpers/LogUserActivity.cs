using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using DatingApp.AuthRepository;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Configurations.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            var userId = long.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserManager>();
            var user = await repo.GetById(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}