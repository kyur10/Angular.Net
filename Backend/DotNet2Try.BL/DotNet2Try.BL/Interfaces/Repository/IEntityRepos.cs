using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNet2Try.BL.Interfaces.Repository
{
    public interface IBrandRepo : IRepository<Brand> { }

    public interface IProductRepo : IRepository<Product> { }

    public interface ICategoryRepo : IRepository<Category> { }

    public interface IPostRepo : IRepository<Post> { }
    public interface IEmployeeRepo : IRepository<Employee> { }
}
