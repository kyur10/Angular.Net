using DotNet2Try.BL.Model.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DotNet2Try.BL.Interfaces.Services
{
    public interface IUserService
    {
        Task<TokenDto?> CreateUserAsync(bool usingJwt, string UserName);
        Task<TokenDto?> LoginAsync(string UserName);
        Task<TokenDto?> GetNewRefreshTokenAsync(bool usingJwt, string RefreshToken);
        string? GetAccessToken(string RefreshToken);
    }
}
