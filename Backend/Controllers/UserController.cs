using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using DotNet2Try.Configurations;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DotNet2Try.BL.Model.Entities;
using System.Security.Claims;
using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using DotNet2Try.DAL;
using DotNet2Try.BL.Model.Dto;

namespace DotNet2Try.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string RefreshString = TokenConfig.Refresh;
        private readonly IUnitOfWork _uow;
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;

        public UserController(IUnitOfWork unitOfWork, IUserService userService, UserManager<User> userManager, AppDbContext context)
        {
            this._userManager = userManager;
            this._context = context;
            this._uow = unitOfWork;
            this._userService = userService;
        }

        private IActionResult AddCookieToContext(TokenDto? res)
        {
            if (res == null || res.AccessToken == null || res.RefreshToken == null) return BadRequest();

            CookieOptions cookieOptions = ModuleConfig.GetCookieOptions();
            Response.Cookies.Append(RefreshString, res.RefreshToken, cookieOptions);
            return Ok(res.AccessToken);
        }

        // [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            string? userName = userDto.UserName;
            if (string.IsNullOrWhiteSpace(userName)) return BadRequest();

            var res = await _userService.LoginAsync(userName);

            return AddCookieToContext(res);
        }

        // [AllowAnonymous]
        /** Auto-Login  */
        [HttpPost("refresh")]
        public IActionResult GetToken()
        {
            var cookies = Request.Cookies;
            var isTokenPresent = GetRefreshToken(cookies, out string? refreshToken);
            if (!isTokenPresent || string.IsNullOrWhiteSpace(refreshToken)) return BadRequest();

            var res = _userService.GetAccessToken(refreshToken);
            return (res == null) ? Forbid() : Ok(res);
        }

        [AllowAnonymous, HttpPost("newrefresh")]
        public async Task<IActionResult> RefreshToken([FromBody] UserDto? userDto)
        {
            var cookies = Request.Cookies;
            var isTokenPresent = GetRefreshToken(cookies, out string? refreshToken);
            if (!isTokenPresent || string.IsNullOrWhiteSpace(refreshToken)) return BadRequest();

            bool isJwt = (userDto != null) ? userDto.IsJwt : true;
            var res = await _userService.GetNewRefreshTokenAsync(isJwt, refreshToken);

            return AddCookieToContext(res);
        }

        [AllowAnonymous, HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            string? userName = userDto.UserName;
            if (string.IsNullOrWhiteSpace(userName)) return BadRequest();

            var res = await _userService.CreateUserAsync(userDto.IsJwt, userName);

            return AddCookieToContext(res);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var cookies = Request.Cookies;
            var isTokenPresent = GetRefreshToken(cookies, out string? refreshToken);
            if (!isTokenPresent || string.IsNullOrWhiteSpace(refreshToken)) return BadRequest();

            RemoveCookie(cookies, RefreshString);
            return Ok();
        }

        private bool GetRefreshToken(IRequestCookieCollection cookies, out string? refreshToken)
        {
            var isTokenPresent = cookies.TryGetValue(RefreshString, out string? token);
            refreshToken = token;
            return isTokenPresent;
        }

        private void RemoveCookie(IRequestCookieCollection reqCookies, string key)
        {
            foreach (var cookie in reqCookies)
            {
                Response.Cookies.Delete(key, ModuleConfig.GetCookieOptions());
            }
        }
    }
}
