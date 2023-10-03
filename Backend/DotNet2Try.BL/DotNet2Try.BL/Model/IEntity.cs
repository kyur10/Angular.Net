using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNet2Try.BL.Model
{
    public interface ITrackable
    {
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }
    }
    public interface ISuccess { }
    public interface IExpiring { }
}
