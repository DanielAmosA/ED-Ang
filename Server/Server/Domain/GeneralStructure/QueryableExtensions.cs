using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Server.Domain.GeneralStructure
{
    /// <summary>
    /// The class responsible for turns IQueryable data of generic type 
    /// into a sorted and paged result.
    /// </summary>
    public static class QueryableExtraForPageRes
    {
        public static async Task<PageApiActionResponse<TPageRes>> ToPaginatedResponseAsync<TPageRes>(
            this IQueryable<TPageRes> query,
            int page,
            int pageSize)
        {
            int totalItems = await query.CountAsync();
            List<TPageRes> listItems = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PageApiActionResponse<TPageRes>
            {
                Data = listItems,
                Total = totalItems,
                Page = page,
                PageSize = pageSize
            };
        }
    }
}
