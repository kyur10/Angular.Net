using AutoMapper;
using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNet2Try.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public bool Insert(ProductDto productDto)
        {
            if (!ModelState.IsValid)
                return false;

            Product product = _mapper.Map<Product>(productDto);

            var dbBrand = unitOfWork.Brands.Get(b =>
                b.BrandName == productDto.BrandName);

            var dbCategory = unitOfWork.Categories.Get(c =>
                c.CategoryName == productDto.CategoryName);

            if (dbBrand == null)
                return false;
            product.BrandId = dbBrand.BrandId;

            if (dbCategory == null)
                return false;
            product.CategoryId = dbCategory.CategoryId;

            unitOfWork.Products.Insert(product);
            unitOfWork.Save();
            return true;
        }

        [HttpGet("Get")]
        public IEnumerable<Product> Get()
        {
            var products = unitOfWork.Products.GetAll();
            return products;
        }

        [HttpGet("GetById")]
        public ProductDto Get(int id)
        {
            var product = unitOfWork.Products.Get(b => b.BrandId == id);
            var productDto = _mapper.Map<ProductDto>(product);
            return productDto;
        }

        [HttpPost("update")]
        public bool Update(ProductDto productDto)
        {
            Product product = _mapper.Map<Product>(productDto);

            var dbBrand = unitOfWork.Brands.Get(b =>
                b.BrandName == productDto.BrandName);
            var dbCategory = unitOfWork.Categories.Get(c =>
                c.CategoryName == productDto.CategoryName);
            var dbProduct = unitOfWork.Products.Get(p =>
                p.ProductName == productDto.ProductName);

            if (dbProduct != null)
            {
                if (dbProduct.BrandId != dbBrand?.BrandId && dbProduct.CategoryId != dbCategory?.CategoryId)
                    return false;
            }

            if (dbProduct == product)
                return false;

            if (dbBrand != null)
            {
                product.BrandId = dbBrand.BrandId;
            }

            unitOfWork.Products.Update(product);
            unitOfWork.Save();
            return true;
        }

        [HttpDelete]
        public bool Delete(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            unitOfWork.Products.Delete(product);
            unitOfWork.Save();
            return true;
        }
    }
}
