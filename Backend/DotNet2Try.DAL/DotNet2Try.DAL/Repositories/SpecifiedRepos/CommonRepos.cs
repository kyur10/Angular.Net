using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Model.Entities;

namespace DotNet2Try.DAL.Repositories.SpecifiedRepos
{
    
    public class BrandRepo : Repository<Brand>, IBrandRepo
    {
        private readonly AppDbContext context;

        public BrandRepo(AppDbContext context) : base(context)
        {
            this.context = context;
        }
    }
    public class CategoryRepo : Repository<Category>, ICategoryRepo
    {
        private readonly AppDbContext context;

        public CategoryRepo(AppDbContext context) : base(context)
        {
            this.context = context;
        }
    }

    public class EmployeeRepo : Repository<Employee>, IEmployeeRepo
    {
        private readonly AppDbContext context;

        public EmployeeRepo(AppDbContext context) : base(context)
        {
            this.context = context;
        }
    }

    public class PostRepo : Repository<Post>, IPostRepo
    {
        private readonly AppDbContext context;

        public PostRepo(AppDbContext context) : base(context)
        {
            this.context = context;
        }
    }
    public class ProductRepo : Repository<Product>, IProductRepo
    {
        private readonly AppDbContext context;

        public ProductRepo(AppDbContext context) : base(context)
        {
            this.context = context;
        }
    }
}
