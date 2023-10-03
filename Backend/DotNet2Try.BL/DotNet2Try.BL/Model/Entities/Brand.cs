namespace DotNet2Try.BL.Model.Entities
{
    public class Brand : AggregateRoot<int>
    {
        public Brand()
        {
            BrandCategories = new HashSet<Product>();
        }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public ICollection<Product> BrandCategories { get; set; }
    }
}
