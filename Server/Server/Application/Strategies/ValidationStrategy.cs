//using Microsoft.IdentityModel.Tokens;
//using Server.Application.Commands;
//using Server.Application.Validators;
//using System.ComponentModel.DataAnnotations;

//namespace Server.Application.Strategies
//{
//    public interface IValidationStrategy
//    {
//        Task<ValidationResult> ValidateAsync(CreateCustomerCommand command);
//    }

//    public class StandardValidationStrategy : IValidationStrategy
//    {
//        private readonly CustomerValidator _validator;

//        public StandardValidationStrategy(CustomerValidator validator)
//        {
//            _validator = validator;
//        }

//        public async Task<ValidationResult> ValidateAsync(CreateCustomerCommand command)
//        {
//            return await _validator.ValidateAsync(command);
//        }
//    }

//    public class EnterpriseValidationStrategy : IValidationStrategy
//    {
//        private readonly CustomerValidator _validator;

//        public async Task<ValidationResult> ValidateAsync(CreateCustomerCommand command)
//        {
//            var result = await _validator.ValidateAsync(command);

//            // Additional enterprise-specific validation rules
//            if (command.Contacts == null || !command.Contacts.Any())
//            {
//                result.Errors.Add(new ValidationFailure("Contacts", "לקוח ארגוני חייב לכלול לפחות איש קשר אחד"));
//            }

//            return result;
//        }
//    }

//}
