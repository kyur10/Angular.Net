using DotNet2Try.DAL;
using DotNet2Try.DAL.Repositories.SpecifiedRepos;
using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Interfaces.Repository;

namespace DotNet2Try.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;

        public UnitOfWork(AppDbContext context)
        {
            this.context = context;
            Products = new ProductRepo(context);
            Categories = new CategoryRepo(context);
            Brands = new BrandRepo(context);
            PostRepo = new PostRepo(context);
            EmployeeRepo = new EmployeeRepo(context);
        }
        public IProductRepo Products { get; set; }
        public ICategoryRepo Categories { get; set; }
        public IBrandRepo Brands { get; set; }
        public IPostRepo PostRepo { get; }
        public IEmployeeRepo EmployeeRepo { get; }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
