using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;
using System.Net;

namespace Server.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Addresses> Addresses { get; set; }
        public DbSet<AddressTypes> AddressTypes { get; set; }
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<CustomerTypes> CustomerTypes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<AddressTypes>()
                         .HasOne(a => a.Address)
                         .WithOne(at => at.AddressType)
                         .HasForeignKey<Addresses>(a => a.AddressTypesID)
                         .IsRequired();

            modelBuilder.Entity<CustomerTypes>()
               .HasOne(customer => customer.Customer)
               .WithOne(customerTypes => customerTypes.CustomerType)
               .HasForeignKey<Customers>(customer => customer.CustomerTypeID);

            modelBuilder.Entity<Addresses>()
               .HasOne(addresses => addresses.Customer)
               .WithMany(customer => customer.Addresses)
               .HasForeignKey(addresses => addresses.CustomerId);

            modelBuilder.Entity<Contacts>()
              .HasOne(contacts => contacts.Customer)
              .WithMany(customer => customer.Contacts)
              .HasForeignKey(contacts => contacts.CustomerId);
        }
    }
}
