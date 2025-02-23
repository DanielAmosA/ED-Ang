//using Microsoft.Extensions.Caching.Memory;
//using Server.Infrastructure.Repositories;

//namespace Server.Application.Decorators
//{
//    public class CachingRepositoryDecorator<T> : IGenericRepository<T> where T : BaseEntity
//    {
//        private readonly IGenericRepository<T> _repository;
//        private readonly IMemoryCache _cache;
//        private readonly string _cacheKeyPrefix;

//        public CachingRepositoryDecorator(IGenericRepository<T> repository, IMemoryCache cache)
//        {
//            _repository = repository;
//            _cache = cache;
//            _cacheKeyPrefix = typeof(T).Name;
//        }

//        public async Task<T> GetByIdAsync(int id)
//        {
//            var cacheKey = $"{_cacheKeyPrefix}_{id}";
//            return await _cache.GetOrCreateAsync(cacheKey, async entry =>
//            {
//                entry.SlidingExpiration = TimeSpan.FromMinutes(10);
//                return await _repository.GetByIdAsync(id);
//            });
//        }
//    }
//}
