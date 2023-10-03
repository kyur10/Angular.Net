using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNet2Try.BL.Model.Entities
{
    public class TBrand : AggregateRoot<bool>
    {
        public string? TBrandName { get; set; }
    }
}
