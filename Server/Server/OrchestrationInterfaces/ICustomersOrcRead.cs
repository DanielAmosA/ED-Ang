using Server.Domain.Entities;
using Server.Domain.GeneralStructure;

namespace Server.OrchestrationInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for CustomersOrcRead
    /// </summary>
    public interface ICustomersOrcRead
    {
        Task<PageApiActionResponse<Customers>> GetAllByPageAndSize(int page, int pageSize);
        Task<object> GetCustomerMainData(int id);

    }
}
