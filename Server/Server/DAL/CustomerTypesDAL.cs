using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Server.BL;
using Server.DALInterfaces;
using static Azure.Core.HttpHeader;
using System.Data;
using Server.Domain.GeneralStructure;
using Server.Infrastructure.Data;
using Server.Domain.Entities;

namespace Server.DAL
{
    /// <summary>
    /// The class responsible for Calling the procedures and their data 
    /// According to the Customer Types area.
    /// </summary>
    public class CustomerTypesDAL : BaseDal<CustomerTypes>, ICustomerTypesDAL
    {
        public CustomerTypesDAL(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
