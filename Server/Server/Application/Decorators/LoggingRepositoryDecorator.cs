//using Server.Infrastructure.Repositories;

//namespace Server.Application.Decorators
//{
//    public class LoggingRepositoryDecorator<T> : IGenericRepository<T> where T : BaseEntity
//    {
//        private readonly IGenericRepository<T> _repository;
//        private readonly ILogger<LoggingRepositoryDecorator<T>> _logger;

//        public LoggingRepositoryDecorator(IGenericRepository<T> repository, ILogger<LoggingRepositoryDecorator<T>> logger)
//        {
//            _repository = repository;
//            _logger = logger;
//        }

//        public async Task<T> GetByIdAsync(int id)
//        {
//            _logger.LogInformation($"Getting {typeof(T).Name} with id {id}");
//            var result = await _repository.GetByIdAsync(id);
//            _logger.LogInformation($"Got {typeof(T).Name} with id {id}");
//            return result;
//        }

//        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
//        {
//            _logger.LogInformation($"Listing {typeof(T).Name}s with specification {spec.GetType().Name}");
//            var result = await _repository.ListAsync(spec);
//            _logger.LogInformation($"Listed {result.Count} {typeof(T).Name}s");
//            return result;
//        }
//    }
//}
