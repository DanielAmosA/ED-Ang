using Server.Domain.Entities;
using Server.Domain.EntitiesInterfaces;
using Server.Infrastructure.ServiceInterfaces;
using Server.Infrastructure.Validation;
using Server.Infrastructure.Validator;

namespace Server.Infrastructure.Service
{
    /// <summary>
    /// The class responsible for performs validation on the Customer model 
    /// and verifies that certain fields meet the specified conditions 
    /// </summary>
    public class ValidatorCustomer : IValidatorService<Customers>
    {
        private readonly ValidatorStruct<Customers> validator;

        public ValidatorCustomer()
        {
            validator = new ValidatorStruct<Customers>(); 

            // Validate Name
            validator.ValidatorFor(customer => customer.Name)
                .Required()
                .ValidateAllowedCharsOnly()
                .MinLength(2)
                .MaxLength(50);

            // Validate CustomerNumber
            validator.ValidatorFor(customer => customer.CustomerNumber)
                .Required()
                .OnlyDigits()
                .MinLength(9)
                .MaxLength(9);


            // Validate Addresses collection
            validator.ValidatorFor(customer => customer.Addresses)
                .Required()
                .MinCollectionSize(1, "At least one address is required")
                .ValidateCollection<Addresses>(addressValidator =>
                {
                    addressValidator.ValidatorFor(address => address.City)
                        .Required()
                        .MinLength(2)
                        .MaxLength(30)
                        .ValidateAllowedCharsOnly();

                    addressValidator.ValidatorFor(address => address.Street)
                       .Required()
                       .MinLength(2)
                       .MaxLength(50)
                       .ValidateAllowedCharsOnly(@"[a-zA-Z\u0590-\u05FF0-9'\-\s]");

                });

            // Validate Contacts collection
            validator.ValidatorFor(customer => customer.Contacts)
                .Required()
                .MinCollectionSize(1, "At least one contact is required")
                .ValidateCollection<Contacts>(contactsValidator =>
                {
                    contactsValidator.ValidatorFor(contact => contact.FullName)
                        .Required()
                        .MinLength(2)
                        .MaxLength(50)
                        .ValidateAllowedCharsOnly();

                    contactsValidator.ValidatorFor(contact => contact.OfficeNumber)
                         .ValidatePhone();

                    contactsValidator.ValidatorFor(contact => contact.Email)
                         .ValidateEmail();

                }); ;
        }

        public ValidationResultStruct Validate(Customers customers)
        {
            return validator.Validate(customers);
        }
    }
}
