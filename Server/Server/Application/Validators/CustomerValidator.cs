//using Server.Application.Commands;

//namespace Server.Application.Validators
//{
//    public class CustomerValidator : AbstractValidator<CreateCustomerCommand>
//    {
//        private readonly ICustomerRepository _customerRepository;

//        public CustomerValidator(ICustomerRepository customerRepository)
//        {
//            _customerRepository = customerRepository;

//            RuleFor(x => x.Name)
//                .NotEmpty().WithMessage("שם לקוח הוא שדה חובה")
//                .MustAsync(BeUniqueName).WithMessage("שם לקוח כבר קיים במערכת");

//            RuleFor(x => x.CustomerNumber)
//                .NotEmpty().WithMessage("מספר ח.פ הוא שדה חובה")
//                .Matches(@"^\d{9}$").WithMessage("מספר ח.פ חייב להכיל 9 ספרות בדיוק");
//        }

//        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
//        {
//            var spec = new CustomerByNameSpecification(name);
//            var existingCustomer = await _customerRepository.FirstOrDefaultAsync(spec);
//            return existingCustomer == null;
//        }
//    }

//}
