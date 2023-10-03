using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using DotNet2Try.DAL;
using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.BL.Interfaces.Repository;


namespace DotNet2Try.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public BrandController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        [HttpPost]
        public bool Insert(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);
            unitOfWork.Brands.Insert(brand);
            unitOfWork.Save();
            return true;
        }

        [HttpGet("Get")]
        public IEnumerable<Brand> Get()
        {
            var brands = unitOfWork.Brands.GetAll();
            return brands;
        }

        [HttpGet("GetById")]
        public BrandDto Get(int id)
        {
            var brand = unitOfWork.Brands.GetById(id);
            var brandDto = _mapper.Map<BrandDto>(brand);
            return brandDto;
        }

        [HttpDelete]
        public bool Delete(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);
            unitOfWork.Brands.Delete(brand);
            unitOfWork.Save();
            return true;
        }
    }
}
