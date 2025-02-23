//using Microsoft.EntityFrameworkCore;
//using Server.Domain.SpecificationsInterfaces;
//using System;

//namespace Server.Infrastructure.Repositories
//{
//    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
//    {
//        private readonly AppDbContext _context;

//        public async Task<T> GetByIdAsync(int id)
//        {
//            return await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
//        }

//        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
//        {
//            return await ApplySpecification(spec).ToListAsync();
//        }

//        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
//        {
//            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
//        }
//    }

//}
