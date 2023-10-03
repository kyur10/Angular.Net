
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.Configurations;
using Microsoft.AspNetCore.Identity;

namespace DotNet2Try.Services
{
    public interface ITokenService
    {
        Task SaveToken(string refreshToken, User user);
    }

    public class JwtService : ITokenService
    {
        private string providerIdentity = TokenConfig.IdentityRefresh;
        private string typeRefresh = TokenConfig.Refresh;
        private readonly UserManager<User> _userManager;
        public JwtService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task SaveToken(string refreshToken, User user)
        {
            var res = await _userManager.SetAuthenticationTokenAsync(user, providerIdentity, typeRefresh, refreshToken);
        }
    }

    public class IdentityDefaultTokenService : ITokenService
    {
        public async Task SaveToken(string refreshToken, User user)
        {
            // return await TimeSpan.FromSeconds(1);
        }
    }
}