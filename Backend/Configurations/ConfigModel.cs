using System.Text;

namespace DotNet2Try.Configurations
{
    public static class TokenConfig
    {
        public const int AccessTokenSeconds = 20;
        public const int RefreshTokenSeconds = 40;
        public const string Refresh = "refresh";
        public const string IdentityRefresh = "identity-refresh";
        public static byte[] Jwt_pk { get; set; } = Encoding.ASCII.GetBytes("keyekekkfklsfkajasklfkajkfklasjfdaljf");
        public static string[] TokenProvider { get; set; } = new string[] { "jwt", "identity" };
        public static string[] TokenType { get; set; } = new string[] { "access", "refresh" };
    }
    public static class ConfigModel
    {

    }

}
