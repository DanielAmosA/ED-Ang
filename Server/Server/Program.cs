using Microsoft.EntityFrameworkCore;
using Serilog;
using Server.BL.Factory;
using Server.BL;
using Server.BLInterfaces;
using Server.Domain.GeneralStructureInterfaces;
using Server.Infrastructure.Data;
using Server.Infrastructure.Middleware;
using Server.Infrastructure.ServiceInterfaces;
using Server.DALInterfaces;
using Server.DAL;
using Server.OrchestrationInterfaces;
using Server.Orchestration;
using Server.Domain.Entities;
using Server.Infrastructure.Service;
using Server.Domain.EntitiesInterfaces;

var builder = WebApplication.CreateBuilder(args);

// Setting up a connection to SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));


// Add services to the container.

// Configure Dependency injection

// AddScoped: Service depends on the context of the request
//           and needs to share data for a request of that request,

// DAL Layer
builder.Services.AddScoped<IAddressesDAL, AddressesDAL>();
builder.Services.AddScoped<IAddressTypesDAL, AddressTypesDAL>();
builder.Services.AddScoped<IContactsDAL, ContactsDAL>();
builder.Services.AddScoped<ICustomersDAL, CustomersDAL>();
builder.Services.AddScoped<ICustomerTypesDAL, CustomerTypesDAL>();

builder.Services.AddScoped<IBaseDal<Addresses>, BaseDal<Addresses>>();
builder.Services.AddScoped<IBaseDal<AddressTypes>, BaseDal<AddressTypes>>();
builder.Services.AddScoped<IBaseDal<Contacts>, BaseDal<Contacts>>();
builder.Services.AddScoped<IBaseDal<Customers>, BaseDal<Customers>>();
builder.Services.AddScoped<IBaseDal<CustomerTypes>, BaseDal<CustomerTypes>>();

// Factory - BL Layer
builder.Services.AddScoped<IFactory<AddressesBL>, AddressesBLFactory>();
builder.Services.AddScoped<IFactory<AddressTypesBL>, AddressTypesBLFactory>();
builder.Services.AddScoped<IFactory<ContactsBL>, ContactsBLFactory>();
builder.Services.AddScoped<IFactory<CustomersBL>, CustomersBLFactory>();
builder.Services.AddScoped<IFactory<CustomerTypesBL>, CustomerTypesBLFactory>();


// Orc Layer
builder.Services.AddScoped<IAddressesOrcWrite, AddressesOrcWrite>();
builder.Services.AddScoped<IAddressesOrcRead, AddressesOrcRead>();
builder.Services.AddScoped<IAddressTypesOrcWrite, AddressTypesOrcWrite>();
builder.Services.AddScoped<IAddressTypesOrcRead, AddressTypesOrcRead>();
builder.Services.AddScoped<IContactsOrcWrite, ContactsOrcWrite>();
builder.Services.AddScoped<IContactsOrcRead, ContactsOrcRead>();
builder.Services.AddScoped<ICustomersOrcWrite, CustomersOrcWrite>();
builder.Services.AddScoped<ICustomersOrcRead, CustomersOrcRead>();
builder.Services.AddScoped<ICustomerTypesOrcWrite, CustomerTypesOrcWrite>();
builder.Services.AddScoped<ICustomerTypesOrcRead, CustomerTypesOrcRead>();


// Configure Validators
builder.Services.AddScoped<IValidatorService<Customers>, ValidatorCustomer>();

/// AddSingleton: Service does not depend on a specific request
//              (e.g., services that perform fixed settings, database
//              access that only requires one share).

builder.Services.AddSingleton<IHelperService, HelperService>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configure CORS (Cross-Origin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClientSide",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});


// Configure Log Tool
builder.Host.UseSerilog((context, configuration) =>
configuration.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();

// Middleware
app.UseMiddleware<LogRequest>();
app.UseMiddleware<ExceptionRequest>();

// Cors
app.UseCors("AllowClientSide");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
