using DotNet2Try.BL.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNet2Try.ModelConfig
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //builder.HasKey(u => u.Id);
            //builder.Property(u => u.UserName).IsRequired().HasMaxLength(100);
            //builder.Property(u => u.Location).IsRequired().HasMaxLength(100);
        }
    }
}
