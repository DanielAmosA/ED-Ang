using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.GeneralStructure;
using Server.Infrastructure.CustomException;
using Server.Infrastructure.Data;
using System.Xml.Linq;

namespace Server.DAL
{
    /// <summary>
    /// The class responsible for The basic form of Dal 
    /// </summary>
    public class BaseDal<TModelDal> :IBaseDal<TModelDal>
            where TModelDal : class
    {
        public readonly AppDbContext dbContext;

        public BaseDal(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<TModelDal>> GetAll()
        {
            List<TModelDal> result;

            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    result = await dbContext.Set<TModelDal>().ToListAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

            return result;
        }

        public async Task<PageApiActionResponse<TModelDal>> GetAllByPageAndSize(int page,int pageSize)
        {

            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    IQueryable<TModelDal> customersQuery = dbContext.Set<TModelDal>().AsQueryable();
                    PageApiActionResponse<TModelDal> paginatedResponse = await customersQuery.ToPaginatedResponseAsync<TModelDal>(page, pageSize);
                    await transaction.CommitAsync();
                    return paginatedResponse;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

        }

        public async Task<TModelDal?> GetById(int id)
        {
            TModelDal? result;

            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    result = await dbContext.Set<TModelDal>().FindAsync(id);
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

            return result;
        }

        public async Task Delete(TModelDal modelData)
        {

            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    dbContext.Set<TModelDal>().Remove(modelData);
                    await dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }
        }

        public async Task Update(TModelDal modelData)
        {
            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    dbContext.Set<TModelDal>().Update(modelData);
                    await dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }
        }

        public async Task Add(TModelDal modelData)
        {

            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    await dbContext.Set<TModelDal>().AddAsync(modelData);
                    await dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }
        }
    }
}
