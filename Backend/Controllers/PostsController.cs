using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.BL.Interfaces.Repository;
using Microsoft.AspNetCore.Mvc;
using DotNet2Try.DAL;
using DotNet2Try.BL.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;

namespace DotNet2Try.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IUserService _userService;

        public PostsController(IUnitOfWork unitOfWork, IUserService userService)
        {
            this._uow = unitOfWork;
            this._userService = userService;
        }

        [HttpPost(nameof(AddPost))]
        public IActionResult AddPost(Post post)
        {
            Post? dbPost = _uow.PostRepo.Insert(post);
            if (dbPost == null) return BadRequest();
            Save();
            return Ok(dbPost);
        }

        [HttpGet(nameof(GetPosts))]
        public IActionResult GetPosts()
        {
            IEnumerable<Post> posts = _uow.PostRepo.GetAll();
            return Ok(posts);
        }

        [HttpGet(nameof(GetPostById))]
        public IActionResult GetPostById(int id)
        {
            Post? post = _uow.PostRepo.Get(p => p.Id == id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [HttpPut(nameof(UpdatePost))]
        public IActionResult UpdatePost(Post post)
        {
            Post? postDb = _uow.PostRepo.Get(p => p.Id == post.Id);
            if (postDb == null) return BadRequest();
            postDb.Title = post.Title;
            postDb.Body = post.Body;
            _uow.PostRepo.Update(postDb);
            Save();
            return Ok(postDb);
        }

        [HttpDelete(nameof(DeletePost))]
        public IActionResult DeletePost(int id)
        {
            Post? postDb = _uow.PostRepo.Get(p => p.Id == id);
            if (postDb == null) return BadRequest();
            _uow.PostRepo.Delete(postDb);
            Save();
            return Ok();
        }

        private void Save() => _uow.Save();
    }

}