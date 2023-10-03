namespace DotNet2Try.Utilities
{
    public class HttpHelper
    {
        public static string Send(HttpMethod httpMethod, string url)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(httpMethod, url);
            HttpResponseMessage response = client.Send(request);
            var res = response.Content.ReadAsStringAsync().Result;

            return res;
        }
    }
}
