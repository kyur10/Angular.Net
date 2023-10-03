namespace DotNet2Try.BL.Model
{
    public abstract class BaseEntity<TKey>
    {
        public TKey? Id { get; set; }
    }
}
