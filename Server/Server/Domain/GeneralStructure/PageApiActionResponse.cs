namespace Server.Domain.GeneralStructure
{
    /// <summary>
    /// The class responsible for get PageApiActionResponse
    /// into a Total page , PageSize result.
    /// </summary>
    public class PageApiActionResponse<TPageRes>
    {
        public List<TPageRes> Data { get; set; }
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
