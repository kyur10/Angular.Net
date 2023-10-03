namespace DotNet2Try.BL.Model.Entities
{
    public class Post : BaseEntity<int>
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
    }
}
