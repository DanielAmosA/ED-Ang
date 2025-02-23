import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

// Create and manage form validations in a flexible and modular way.
export class ValidForFormService {

  // Universal error messages
  private errorMessages: {
    [key: string]: ((field: string, value?: any) => string) | string;
  } = {
    required: (field: string) => `${field} is required`,
    email: () => 'Invalid email format',
    minLength: (field: string, value: number) =>
      `${field} must be at least ${value} characters long`,
    maxLength: (field: string, value: number) =>
      `${field} cannot exceed ${value} characters`,
    pattern: (field: string) => `Invalid format for ${field}`,
    customError: (message: string) => message,
  };


  //#region  Helpers

  // Helper function to check if string starts with space
  private startsWithSpace(value: string): boolean {
    if(value)
    {
      return value.startsWith(' ');
    }
    return true;
  }

  // Helper function to combine space check with other validators
  private createValidatorWithSpaceCheck(
    regex: RegExp,
    errorMessage: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if(value === '')
      {
        return null;
      }
      // Check for space at start
      if (this.startsWithSpace(value)) {
        return { customError: 'Input cannot start with a space' };
      }

      // Check the original regex
      return regex.test(value) ? null : { customError: errorMessage };
    };
  }

  // Helper function to validation by RegExp and custom error message
  createValidator(regex: RegExp, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value != '')
        return regex.test(control.value) ? null : { customError: errorMessage };
      else
        return null;
    };
  }

  // Function that returns the appropriate error message
  getErrorMessage(control: AbstractControl, fieldName: string): string {
    if (!control.errors) return '';

    const errors = control.errors;

    // Check each possible error type
    if (errors['required']) {
      const errorMsg = this.errorMessages['required'];
      return typeof errorMsg === 'function' ? errorMsg(fieldName) : errorMsg;
    }

    if (errors['email']) {
      const errorMsg = this.errorMessages['email'];
      return typeof errorMsg === 'function' ? errorMsg(fieldName) : errorMsg;
    }

    if (errors['minlength']) {
      const errorMsg = this.errorMessages['minlength'];
      return typeof errorMsg === 'function'
        ? errorMsg(fieldName, errors['minlength'].requiredLength)
        : errorMsg;
    }

    if (errors['maxLength']) {
      const errorMsg = this.errorMessages['maxLength'];
      return typeof errorMsg === 'function'
        ? errorMsg(fieldName, errors['maxLength'].requiredLength)
        : errorMsg;
    }

    if (errors['pattern']) {
      const errorMsg = this.errorMessages['pattern'];
      return typeof errorMsg === 'function' ? errorMsg(fieldName) : errorMsg;
    }

    if (errors['customError']) {
      const errorMsg = this.errorMessages['customError'];
      return typeof errorMsg === 'function'
        ? errorMsg(errors['customError'])
        : errorMsg;
    }

    // If we don't recognize the error type, return a generic message
    return `Invalid ${fieldName}`;
  }

  //#endregion


  //#region Pre-made validations


  //#region Pre-made validations basic check

  // Pre-made validations using the createValidator function

  // Validation for customer number (9 digits only)
  customerNumberValidator(): ValidatorFn {
    return this.createValidator(
      /^\d{9}$/,
      'Customer number must contain exactly 9 digits'
    );
  }

  // Validation for numbers only
  digitsOnlyValidator(): ValidatorFn {
    return this.createValidator(/^\d+$/, 'Only digits are allowed');
  }

  // Validation for officePhone
  officePhoneValidator(): ValidatorFn {
    return this.createValidator(
      /^(0[2-9]-?\d{7})$/,
      'Office phone must be 9 digits and start with prefixes 02 / 03 / 04 / 05 / 06 / 07 / 08 / 09'
    );
  }

  // Custom validation for a strong password
  strongPasswordValidator(): ValidatorFn {
    return this.createValidator(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      'Password must contain uppercase, lowercase, number & special char'
    );
  }

  //#endregion


  //#region Pre-made validations with Space check

  // Validation for email
  emailValidator(): ValidatorFn {
    return this.createValidatorWithSpaceCheck(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    );
  }

  // Validation for street (Hebrew/English letters and numbers,
  //                        between 2 and 50 characters)
  streetValidator(): ValidatorFn {
    return this.createValidatorWithSpaceCheck(
      /^[a-zA-Zא-ת\s0-9]{2,50}$/,
      'Invalid street name : Street must contain only letters, spaces, and be 2-50 characters long'
    );
  }

  // Validation for city (Hebrew/English letters only,
  //                      between 2 and 30 characters)
  cityValidator(): ValidatorFn {
    return this.createValidatorWithSpaceCheck(
      /^[a-zA-Zא-ת\s]{2,30}$/,
      'Invalid city name : City must contain only letters, spaces, and be 2-30 characters long'
    );
  }

  // Validation for full name (letters only, 2-50 characters,
  //                           including spaces)
  fullNameValidator(): ValidatorFn {
    return this.createValidatorWithSpaceCheck(
      /^[a-zA-Zא-ת\s]{2,50}$/,
      'Full name must contain only letters, spaces, and be 2-50 characters long'
    );
  }

  //#endregion
  //#endregion
}
