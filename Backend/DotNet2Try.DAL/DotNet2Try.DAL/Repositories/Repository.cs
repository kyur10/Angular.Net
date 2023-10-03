using DotNet2Try.BL.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DotNet2Try.DAL.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {

        #region Constructor
        private readonly AppDbContext _db;
        private DbSet<T> Dbset;
        public Repository(AppDbContext context)
        {
            _db = context;
            Dbset = _db.Set<T>(); 
        }
        #endregion


        public T? Insert(T entity)
        {
            Dbset.Add(entity);
            return entity;
        }

        public T? Get(Expression<Func<T, bool>> filter)
        {
            return Dbset.FirstOrDefault(filter);
        }

        public T? GetById(int id)
        {
            return Dbset.Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return Dbset.AsEnumerable();
        }

        public T? Update(T entity)
        {
            return Dbset.Update(entity).Entity;
        }

        public T? Delete(T entity)
        {
            return Dbset.Remove(entity).Entity;
        }

    }
}
