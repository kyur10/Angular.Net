using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNet2Try.BL.Model.Dto
{
    public class UserDto
    {
        public string? UserName { get; set; }
        public bool IsJwt { get; set; } = true;
    }
    public class TokenDto
    {
        public TokenDto(string? accessToken = null, string? refreshToken = null)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
