using System.Linq.Expressions;

namespace DotNet2Try.BL.Interfaces.Repository
{
    public interface IRepository<T>
    {
        T? Insert(T entity);
        T? GetById(int id);
        T? Get(Expression<Func<T, bool>> filter);
        IEnumerable<T> GetAll();
        T? Update(T entity);
        T? Delete(T entity);
    }
}
