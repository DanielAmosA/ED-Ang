using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using Server.DALInterfaces;
using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;
using Server.Domain.GeneralStructure;
using Server.Infrastructure.CustomException;
using Server.Infrastructure.Data;

namespace Server.DAL
{
    /// <summary>
    /// The class responsible for Calling the procedures and their data 
    /// According to the Register Customers area.
    /// </summary>
    public class CustomersDAL : BaseDal<Customers>, ICustomersDAL
    {
        public CustomersDAL(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<object> GetCustomerMainData(int id)
        {
            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                bool isRolledBack = false;
                try
                {

                    var customer = await dbContext.Customers.Where(customer => customer.Id == id)
                                    .Select(customers => new
                                    {
                                        Name = customers.Name,
                                        CustomerNumber = customers.CustomerNumber,
                                        CustomerTypeName = customers.CustomerType.CustomerTypeName,
                                        CustomerTypeID = customers.CustomerTypeID,
                                        Addresses = customers.Addresses
                                        .Select(addresses => new
                                        {
                                            city = addresses.City,
                                            street = addresses.Street,
                                            AddressTypesID = addresses.AddressTypesID,
                                            AddressTypeName = addresses.AddressType.AddressTypeName
                                        })
                                        ,

                                        Contacts = customers.Contacts
                                        .Select(contacts => new
                                        {
                                            FullName = contacts.FullName,
                                            OfficeNumber = contacts.OfficeNumber,
                                            Email = contacts.Email
                                        })
                                    })
                                    .FirstOrDefaultAsync();

                    if (customer == null)
                    {
                        await transaction.RollbackAsync();
                        isRolledBack = true;
                        throw new NotFoundException("Customer not found");
                    }
                    else
                    {
                        await transaction.CommitAsync();
                        return customer;
                    }

                }
                catch (Exception ex)
                {
                    if (!isRolledBack)
                        await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

        }

        public async Task CreateNewCustomer(Customers newCustomer)
        {
            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                bool isRolledBack = false;
                try
                {
                    Customers? customer = await dbContext.Customers.Where(customer => customer.Name == newCustomer.Name)
                                           .FirstOrDefaultAsync();
                    if (customer != null)
                    {
                        await transaction.RollbackAsync();
                        isRolledBack = true;
                        throw new CreateException("Customer name already exists in the database.");
                    }
                    else
                    {
                        customer = new Customers
                        {
                            Name = newCustomer.Name,
                            CustomerNumber = newCustomer.CustomerNumber,
                            CustomerTypeID = newCustomer.CustomerTypeID,
                            Created = DateTime.Now,
                            Addresses = new List<Addresses>(),
                            Contacts = new List<Contacts>()
                        };

                        // Adding addresses
                        if (newCustomer.Addresses != null)
                        {
                            foreach (Addresses address in newCustomer.Addresses)
                            {
                                customer.Addresses.Add(new Addresses
                                {
                                    City = address.City,
                                    Street = address.Street,
                                    AddressTypesID = address.AddressTypesID,
                                    Created = DateTime.Now
                                });
                            }
                        }

                        // Adding contacts
                        if (newCustomer.Contacts != null)
                        {
                            foreach (Contacts contact in newCustomer.Contacts)
                            {
                                customer.Contacts.Add(new Contacts
                                {
                                    FullName = contact.FullName,
                                    OfficeNumber = contact.OfficeNumber,
                                    Email = contact.Email,
                                    Created = DateTime.Now
                                });
                            }
                        }

                        dbContext.Customers.Add(customer);
                        await dbContext.SaveChangesAsync();
                        await transaction.CommitAsync();

                    }
                }
                catch (Exception ex)
                {
                    if (!isRolledBack)
                        await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

        }
        public async Task UpdateCustomer(int id, Customers updateCustomer)
        {
            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                bool isRolledBack = false;

                try
                {
                    Customers? customer = await dbContext.Customers
                        .Where(customer => customer.Id == id)
                        .Include(customer => customer.Addresses)
                        .Include(customer => customer.Contacts)
                        .FirstOrDefaultAsync();

                    if (customer == null)
                    {
                        await transaction.RollbackAsync();
                        isRolledBack = true;
                        throw new NotFoundException("Customer not found");
                    }

                    customer.CustomerNumber = updateCustomer.CustomerNumber;
                    customer.CustomerTypeID = updateCustomer.CustomerTypeID;
                    customer.Name = updateCustomer.Name;
                    customer.Created = DateTime.Now;

                    // Update addresses
                    if (customer.Addresses != null)
                    {
                        dbContext.Addresses.RemoveRange(customer.Addresses);
                        await dbContext.SaveChangesAsync();
                    }

                    if (updateCustomer.Addresses != null)
                    {
                        foreach (var address in updateCustomer.Addresses)
                        {
                            customer.Addresses?.Add(new Addresses
                            {
                                City = address.City,
                                Street = address.Street,
                                AddressTypesID = address.AddressTypesID,
                                Created = DateTime.Now
                            });
                        }
                    }

                    // Update contacts
                    if (customer.Contacts != null)
                    {
                        dbContext.Contacts.RemoveRange(customer.Contacts);
                        await dbContext.SaveChangesAsync();
                    }

                    if (updateCustomer.Contacts != null)
                    {
                        foreach (var contact in updateCustomer.Contacts)
                        {
                            customer.Contacts?.Add(new Contacts
                            {
                                FullName = contact.FullName,
                                OfficeNumber = contact.OfficeNumber,
                                Email = contact.Email,
                                Created = DateTime.Now
                            });
                        }
                    }

                    await dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    if (!isRolledBack)
                        await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }
        }

        public async Task DeleteCustomer (int id)
        {
            using (IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
            {
                bool isRolledBack = false;
                try
                {
                    Customers? customer = await dbContext.Customers.Where(customer => customer.Id == id && !customer.IsDeleted)
                                      .FirstOrDefaultAsync();

                    if (customer == null)
                    {
                        await transaction.RollbackAsync();
                        isRolledBack = true;
                        throw new DeleteException("Customer not found");
                    }

                    //Delete as Logic
                    customer.IsDeleted = true;
                    await dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();

                }
                catch (Exception ex)
                {
                    if (!isRolledBack)
                        await transaction.RollbackAsync();
                    string err = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                    throw new SqlActionException(err);
                }
            }

        }
    }
}
