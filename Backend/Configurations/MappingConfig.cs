using AutoMapper;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.BL.Model.Dto;

namespace DotNet2Try.Configurations
{
    public class MappingConfig:Profile
    {
        public MappingConfig()
        {
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
