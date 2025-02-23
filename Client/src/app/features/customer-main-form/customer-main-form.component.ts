import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Customer } from '../../core/models/customer.model';
import { filter, map, of, Subject, takeUntil } from 'rxjs';
import { Contact } from '../../core/models/contact.model';
import { Addresses } from '../../core/models/addresses.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  errorMessageAnimation, fadeInAnimation, fadeInOutAnimation, inputFocusAnimation, submitAnimation,
} from '../../shared/animations/animations';
import { ValidForFormService } from '../../core/validators/valid-for-form.service';
import { ActionLoadDataComponent } from '../../shared/components/action-load-data/action-load-data.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionTrackingDialogComponent } from '../../shared/components/action-tracking.dialog/action-tracking.dialog.component';
import { GenericDialogService } from '../../core/services/genericAction/generic-dialog.service';
import { customerFormFeature } from '../../core/store/customer-form.reducer';
import { Store } from '@ngrx/store';
import { CustomerFormActions } from '../../core/store/customer-form.actions';

@Component({
  selector: 'app-customer-main-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ActionLoadDataComponent,
    MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatOptionModule],
  templateUrl: './customer-main-form.component.html',
  styleUrl: './customer-main-form.component.scss',
  animations: [fadeInAnimation, fadeInOutAnimation, submitAnimation, inputFocusAnimation, errorMessageAnimation],
})

// Responsible for customer main form
export class CustomerMainFormComponent  implements OnInit, OnDestroy {
  //#region Members
  customerForm!: FormGroup;
  destroy$ = new Subject<void>();
  store = inject(Store);

  //#region Store Selectors
  loading$ = this.store.select(customerFormFeature.selectLoading);
  formState$ = this.store.select(customerFormFeature.selectFormState);
  customerTypes$ = this.store.select(customerFormFeature.selectCustomerTypes);
  addressTypes$ = this.store.select(customerFormFeature.selectAddressTypes);
  error$ = this.store.select(customerFormFeature.selectError);
  isEditMode$ = this.formState$.pipe(map(state => state.isEditMode));
  isSubmitting$ = this.formState$.pipe(map(state => state.isSubmitting));
  //#endregion

   constructor(
      // Direct injections
      @Inject(FormBuilder) private fb: FormBuilder = inject(FormBuilder),
      @Inject(ActivatedRoute) private route: ActivatedRoute = inject(ActivatedRoute),
      @Inject(Router) private router:Router = inject(Router),
      @Inject(ValidForFormService) private validForFormService: ValidForFormService = inject(ValidForFormService),
      @Inject(GenericDialogService<any>) private dialogService: GenericDialogService<any> = inject(GenericDialogService<any>),
    ) {
      this.initializeForm();
    }

    loadInitialData() {
      this.store.dispatch(CustomerFormActions.loadAllTypes());
    }

    ngOnInit() {
      this.setupRouteSubscription();
      this.loadInitialData();
    }

    ngOnDestroy() {
      // Reset store when leaving component
    this.store.dispatch(CustomerFormActions.resetFormData());
      this.destroy$.next();
      this.destroy$.complete();
    }

  //#region Form Initialization
  initializeForm() {
    this.customerForm = this.fb.group({
      name: ['', [
        Validators.required,
        this.validForFormService.fullNameValidator()
      ]],
      customerNumber: ['', [
        Validators.required,
        this.validForFormService.customerNumberValidator()
      ]],
      customerTypeID: ['', Validators.required],
      addresses: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      contacts: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });

    this.onInitCustomerAddressContactsArrays();
  }

  private setupRouteSubscription() {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(paramMap => {
      const id = paramMap.get('id');

      this.store.dispatch(CustomerFormActions.updateFormState({
        state: {
          isEditMode: !!id,
          isSubmitting: false,
          customerData: null
        }
      }));

      if (id) {
        this.store.dispatch(CustomerFormActions.initFormData({ id }));
      } else {
        this.initializeForm();
      }

      this.store.dispatch(CustomerFormActions.loadAllTypes());
    });

    this.formState$.pipe(
      takeUntil(this.destroy$),
      filter(state => state.customerData !== null)
    ).subscribe(formState => {
      if (formState.customerData) {
        this.onFillCustomerForm(formState.customerData);
      }
    });
  }

  //#endregion

  //#region Form Arrays Methods
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  get contacts(): FormArray {
    return this.customerForm.get('contacts') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.createAddressForm());
  }

  addContact(){
    this.contacts.push(this.createContactForm());
  }

  onInitCustomerAddressContactsArrays() {
    if (this.addresses.length === 0) {
      this.addAddress();
    }
    if (this.contacts.length === 0) {
      this.addContact();
    }
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    } else {
      this.onShowError(
        'Validation Error',
        'Cannot remove the last address. At least one address is required.'
      );
    }
  }

  removeContact(index: number): void  {
    if (this.contacts.length > 1) {
      this.contacts.removeAt(index);
    } else {
      this.onShowError(
        'Validation Error',
        'Cannot remove the last contact. At least one contact is required.'
      );
    }
  }
  //#endregion

  //#region Form Creation
  private createAddressForm(address?: Addresses): FormGroup  {
    return this.fb.group({
      city: [address?.city || '', [
        Validators.required,
        this.validForFormService.cityValidator()
      ]],
      street: [address?.street || '', [
        Validators.required,
        this.validForFormService.streetValidator()
      ]],
      addressTypesID: [address?.addressTypesID || '', Validators.required]
    });
  }

  private createContactForm(contact?: Contact): FormGroup {
    return this.fb.group({
      fullName: [contact?.fullName || '', [
        Validators.required,
        this.validForFormService.fullNameValidator()
      ]],
      officeNumber: [contact?.officeNumber || '', [
        this.validForFormService.officePhoneValidator()
      ]],
      email: [contact?.email || '', [
        this.validForFormService.emailValidator()
      ]]
    });
  }
  //#endregion

  //#region Form Actions
  onSubmit() {
    if (this.customerForm.invalid ||
        this.addresses.length === 0 ||
        this.contacts.length === 0) {

      if (this.addresses.length === 0) {
        this.onShowError(
          'Validation Error',
          'At least one address is required'
        );
      }
      if (this.contacts.length === 0) {
        this.onShowError(
          'Validation Error',
          'At least one contact is required'
        );
      }
      return;
    }

    const formData = this.customerForm.value;
    const id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(CustomerFormActions.submitForm({
      customer: {
        ...formData,
        id: id ? Number(id) : undefined
      },
      isEdit: !!id
    }));
  }

  onResetCustomerData() {
    this.store.dispatch(CustomerFormActions.resetFormData());
    this.addresses.clear();
    this.contacts.clear();
    this.onInitCustomerAddressContactsArrays();
    this.customerForm.reset();
  }

  onGetErrorMessage(field: string, formGroupIndex?: number, arrayName?: string): string {
    const control = arrayName && typeof formGroupIndex === 'number'
      ? (this.customerForm.get(arrayName) as FormArray).at(formGroupIndex).get(field)
      : this.customerForm.get(field);

    return control && control.invalid && (control.dirty || control.touched)
      ? this.validForFormService.getErrorMessage(control, field)
      : '';
  }
  //#endregion

  //#region Form Fill
  onFillCustomerForm(customerData: Customer) {
    this.customerForm.patchValue({
      name: customerData.name,
      customerNumber: customerData.customerNumber,
      customerTypeID: customerData.customerTypeID
    });

    this.onFillCustomerAddresses(customerData.addresses || []);
    this.onFillCustomerContacts(customerData.contacts || []);
  }

  onFillCustomerAddresses(addresses: Addresses[]) {
    const addressesArray = this.addresses;
    addressesArray.clear();

    if (addresses?.length) {
      addresses.forEach(address => {
        addressesArray.push(this.createAddressForm(address));
      });
    } else {
      this.addAddress();
    }
  }

  onFillCustomerContacts(contacts: Contact[]) {
    const contactsArray = this.contacts;
    contactsArray.clear();

    if (contacts?.length) {
      contacts.forEach(contact => {
        contactsArray.push(this.createContactForm(contact));
      });
    } else {
      this.addContact();
    }
  }
  //#endregion

  //#region Dialog Handling
  private onShowError(title: string, message: string) {
    this.dialogService.openDialog(
      {
        type: 'error',
        title,
        message
      },
      ActionTrackingDialogComponent
    );
  }

  private onShowSuccess(title: string, message: string) {
    this.dialogService.openDialog(
      {
        type: 'success',
        title,
        message
      },
      ActionTrackingDialogComponent
    );
  }
  //#endregion
}
