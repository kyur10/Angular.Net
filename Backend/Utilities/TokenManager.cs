using DotNet2Try.BL.Interfaces.Services;
using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace DotNet2Try.Utilities
{
    public class TokenManager
    {
        public TokenManager(Claim[]? claims = null)
        {
            Claims = claims;
        }
        public byte[] key = TokenConfig.Jwt_pk;

        public Claim[]? Claims { get; set; }

        public TokenDto? GetJwtTokens()
        {
            string accessToken = GetJwtToken(DateTime.Now.ToLocalTime().
                AddSeconds(TokenConfig.AccessTokenSeconds));
            string refreshToken = GetJwtToken(DateTime.Now.ToLocalTime().
                AddSeconds(TokenConfig.RefreshTokenSeconds));

            return new TokenDto(accessToken, refreshToken);
        }

        public string GetRefreshToken()
        {
            var key2 = new Byte[32];
            using (var refreshTokenGenerator = RandomNumberGenerator.Create())
            {
                refreshTokenGenerator.GetBytes(key2);
                return Convert.ToBase64String(key2);
            }
        }

        public string GetJwtToken(DateTime expireTime)
        {
            var claims = new ClaimsIdentity(Claims);
            var signingCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = expireTime,
                SigningCredentials = signingCredentials,
                NotBefore = DateTime.Now.AddDays(-1)
            };

            var createToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(createToken);
            return token;
        }
    }
}
