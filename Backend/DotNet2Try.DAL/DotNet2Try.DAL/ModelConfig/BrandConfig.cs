using DotNet2Try.BL.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNet2Try.ModelConfig
{
    public class BrandConfig : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.HasKey(p => p.BrandId);
            builder.Property(p => p.BrandName).IsRequired().HasMaxLength(100);
        }
    }
}
