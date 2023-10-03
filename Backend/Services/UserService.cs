using DotNet2Try.BL.Interfaces.Services;
using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DotNet2Try.Configurations;
using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.DAL;
using System.Linq;

namespace DotNet2Try.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        public string identity = "identity";
        public string refresh = TokenConfig.Refresh;
        private byte[] key = TokenConfig.Jwt_pk;
        private DateTime _accessTokenTime = DateTime.Now.ToLocalTime().AddSeconds(TokenConfig.AccessTokenSeconds);

        public UserService(UserManager<User> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<TokenDto?> CreateUserAsync(bool usingJwt, string userName)
        {
            TokenDto? tokenDto;
            TokenManager tokenManager = new TokenManager();

            var dbUser = await _userManager.FindByNameAsync(userName);
            if (dbUser != null) return null;

            var user = new User() { UserName = userName };
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded) return null;

            var claims = new Claim[] { new Claim(ClaimTypes.Name, userName) };
            await _userManager.AddClaimsAsync(user, claims);
            tokenManager.Claims = claims;

            if (usingJwt)
            {
                tokenDto = tokenManager.GetJwtTokens();
                if (tokenDto == null || tokenDto.RefreshToken == null) return null;
                var res = await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, tokenDto.RefreshToken);
                if (!res.Succeeded) return null;
            }
            else
            {
                //TODO error: noTwofactorauth implemented
                //var refreshToken = await _userManager.GenerateUserTokenAsync(dbUser, identity, refresh);
                var refreshToken = tokenManager.GetRefreshToken();
                tokenDto = await CreateUserUsingIdentity(refreshToken, user);
            }

            return tokenDto;
        }

        public string? GetAccessToken(string refreshToken)
        {
            if (GetUserFromToken(refreshToken) == null) return null;
            if (!ValidateToken(refreshToken)) return null;

            TokenManager tokenManager = new TokenManager();
            return tokenManager.GetJwtToken(_accessTokenTime);
        }

        public async Task<TokenDto?> GetNewRefreshTokenAsync(bool usingJwt, string refreshToken)
        {
            TokenDto? tokenDto;
            TokenManager tokenManager = new TokenManager();

            var user = GetUserFromToken(refreshToken);
            if (user == null) return null;

            var dbRefresh = await _userManager.GetAuthenticationTokenAsync(user, identity, refresh);
            if (refreshToken == null || refreshToken != dbRefresh) return null;

            tokenDto = tokenManager.GetJwtTokens();
            if (tokenDto == null || tokenDto.RefreshToken == null) return null;
            var newRefreshToken = tokenManager.GetRefreshToken();

            var isRemoved = await _userManager.RemoveAuthenticationTokenAsync(user, identity, refresh);
            if (!isRemoved.Succeeded) return null;

            if (usingJwt)
            {
                //if (!ValidateToken()) return null;
                var res = await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, tokenDto.RefreshToken);
                if (!res.Succeeded)
                {
                    await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, dbRefresh);
                    return null;
                }
            }
            else
            {
                //TODO error: noTwofactorauth implemented
                //var refreshToken = await _userManager.GenerateUserTokenAsync(dbUser, identity, refresh);
                tokenDto = await CreateUserUsingIdentity(newRefreshToken, user);
            }
            return tokenDto;
        }

        public async Task<TokenDto?> LoginAsync(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            if (user == null) return null;

            TokenManager tokenManager = new TokenManager();
            var tokens = tokenManager.GetJwtTokens();
            if (tokens == null || tokens.RefreshToken == null) return null;

            var dbRefresh = await _userManager.GetAuthenticationTokenAsync(user, identity, refresh);
            var res = await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, tokens.RefreshToken);
            if (!res.Succeeded)
            {
                await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, dbRefresh);
                return null;
            }

            return tokens;
        }

        public async Task<TokenDto?> CreateUserUsingIdentity(string refreshToken, User user)
        {
            TokenManager tokenManager = new TokenManager();

            await _userManager.SetAuthenticationTokenAsync(user, identity, refresh, refreshToken);
            var accessToken = tokenManager.GetJwtToken(_accessTokenTime);
            var tokenIdentityDto = new TokenDto(accessToken, refreshToken);
            return tokenIdentityDto;
        }

        public User? GetUserFromToken(string refreshToken)
        {
            var tokenUser = _context.UserTokens.FirstOrDefault(_ => _.Value == refreshToken);
            if (tokenUser == null) return null;
            var user = _context.Users.FirstOrDefault(_ => _.Id == tokenUser.UserId);
            if (user == null) return null;
            return user;
        }

        public bool ValidateToken(string refreshToken)
        {
            if (refreshToken == null) return false;
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var claimsPrincipal = tokenHandler.ValidateToken(refreshToken,
                    new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                    }, out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;

                if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
                    return false;

                var expiringTimeString = claimsPrincipal.Claims.First(claim => claim.Type == "exp").Value;
                var expirationTime = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expiringTimeString)).DateTime.ToLocalTime();
                var now = DateTime.Now.ToLocalTime();
                if (expirationTime < now)
                    return false;
            }
            catch (SecurityTokenExpiredException e)
            {
                return false;
            }
            return true;
        }

    }

}
