using Server.Domain.GeneralStructure;

namespace Server.DALInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for AddressTypesDAL
    /// </summary>
    public interface IBaseDal<TModelDal> where TModelDal : class
    {
        Task<List<TModelDal>> GetAll();
        Task<PageApiActionResponse<TModelDal>> GetAllByPageAndSize(int page, int pageSize);
        Task Add(TModelDal modelData);
        Task Update(TModelDal modelData);
        Task Delete(TModelDal modelData);
        Task<TModelDal?> GetById(int id);
    }
}
