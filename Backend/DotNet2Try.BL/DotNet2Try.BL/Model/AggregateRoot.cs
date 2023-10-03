namespace DotNet2Try.BL.Model
{
    public abstract class AggregateRoot<TKey> : BaseEntity<TKey> 
    {
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }
    }
}
