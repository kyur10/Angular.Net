using DotNet2Try.BL.Model.Entities;
using DotNet2Try.ModelConfig;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DotNet2Try.DAL
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> AppUsers { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<TBrand> TBrands { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new BrandConfig());
            modelBuilder.ApplyConfiguration(new CategoryConfig());
            modelBuilder.ApplyConfiguration(new ProductConfig());

            modelBuilder.Entity<Employee>().HasKey(o => o.Code);
            modelBuilder.Entity<Employee>().Property(o => o.Code).HasColumnName("code").HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(o => o.Name).HasColumnName("name").HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(o => o.Gender).HasColumnName("gender").HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(o => o.DateOfBirth).HasColumnName("dateOfBirth").HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(o => o.AnnualSalary).HasColumnName("annualSalary")
                .HasPrecision(18, 3);
        }
    }
}
