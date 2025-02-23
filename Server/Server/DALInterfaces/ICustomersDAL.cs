using Server.DAL;
using Server.Domain.Entities;

namespace Server.DALInterfaces
{
    /// <summary>
    /// The interface responsible for Structure declaration for CustomersDAL
    /// </summary>
    public interface ICustomersDAL : IBaseDal<Customers>
    {
        Task<object> GetCustomerMainData(int id);
        Task CreateNewCustomer(Customers newCustomer);
        Task UpdateCustomer(int id, Customers updateCustomer);
        Task DeleteCustomer(int id);
    }
}
