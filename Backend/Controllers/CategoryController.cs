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
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public CategoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public bool Insert(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            unitOfWork.Categories.Insert(category);
            unitOfWork.Save();
            return true;
        }

        [HttpGet("Get")]
        public IEnumerable<Category> Get()
        {
            var brands = unitOfWork.Categories.GetAll();
            return brands;
        }

        [HttpGet("GetById")]
        public CategoryDto Get(int id)
        {
            var category = unitOfWork.Categories.GetById(id);
            var categoryDto = _mapper.Map<CategoryDto>(category);
            return categoryDto;
        }

        [HttpDelete]
        public bool Delete(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            unitOfWork.Categories.Delete(category);
            unitOfWork.Save();
            return true;
        }
    }
}
