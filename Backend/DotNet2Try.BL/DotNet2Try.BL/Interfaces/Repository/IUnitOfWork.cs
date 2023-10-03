using DotNet2Try.BL.Interfaces.Repository;

namespace DotNet2Try.BL.Interfaces.Repository
{
    public interface IUnitOfWork
    {
        public IProductRepo Products { get; }
        public ICategoryRepo Categories { get; }
        public IBrandRepo Brands { get; }
        public IPostRepo PostRepo { get; }
        public IEmployeeRepo EmployeeRepo { get; }
        void Save();
    }
}
