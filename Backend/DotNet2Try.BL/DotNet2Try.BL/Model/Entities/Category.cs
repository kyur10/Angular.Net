namespace DotNet2Try.BL.Model.Entities
{
    public class Category
    {
        public Category()
        {
            BrandCategories = new HashSet<Product>();
        }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<Product> BrandCategories { get; set; }
    }
}
