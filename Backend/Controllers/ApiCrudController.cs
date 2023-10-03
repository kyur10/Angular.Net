using Microsoft.AspNetCore.Mvc;

namespace DotNet2Try.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiCrudController : ControllerBase
    {
        [HttpGet("taglib")]
        public IActionResult TagLibM()
        {
            var tfile = TagLib.File.Create(@"C:\A__Z\295.mp3");

            string title = tfile.Tag.Title;
            TimeSpan duration = tfile.Properties.Duration;
            Console.WriteLine("Title: {0}, duration: {1}", title, duration);

            // change title in the file
            tfile.Tag.Title = "my new title";
            tfile.Save();
            return Ok();
        }

        // GET: api/<ApiCrud>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ApiCrud>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ApiCrud>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ApiCrud>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ApiCrud>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
