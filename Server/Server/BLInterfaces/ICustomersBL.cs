using Server.Domain.Entities;
using Server.Domain.GeneralStructure;

namespace Server.BLInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for CustomersBL
    /// </summary>
    public interface ICustomersBL : IDisposable
    {
        Task<PageApiActionResponse<Customers>> GetAllByPageAndSize(int page, int pageSize);
        Task<object> GetCustomerMainData(int id);
        Task CreateNewCustomer(Customers newCustomer);
        Task UpdateCustomer(int id, Customers updateCustomer);
        Task DeleteCustomer(int id);
    }
}
