
using Microsoft.AspNetCore.Identity;

namespace DotNet2Try.BL.Model.Entities
{
    public class User : IdentityUser, ITrackable
    {
        public string? City { get; set; }
        public DateTime Created_At { get; set; } 
            = DateTime.Now.ToLocalTime();
        public DateTime Updated_At { get; set; } 
            = DateTime.Now.ToLocalTime();
        //public string UserName { get; set; }
        //public string Location { get; set; }
    }
}
