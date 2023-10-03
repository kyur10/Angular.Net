namespace DotNet2Try.BL.Model.Wrappers
{
    public class Response<T>
    {
        public Response() { }
        public bool Succeeded { get; set; }
        public T? Data { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
