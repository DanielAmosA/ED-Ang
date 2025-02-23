import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../core/services/modelsAction/customer.service';
import { Customer } from '../../core/models/customer.model';
import { GenTableComponent } from '../../shared/components/gen-table/gen-table.component';
import { PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import {
  buttonAnimation,
  fadeInOutAnimation,
  webButtonAnimation,
} from '../../shared/animations/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActionLoadDataComponent } from '../../shared/components/action-load-data/action-load-data.component';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  of,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { ApiActionResponse } from '../../core/interfaces/apiActionResponse.interface';
import { Router } from '@angular/router';
import { ActionTrackingDialogComponent } from '../../shared/components/action-tracking.dialog/action-tracking.dialog.component';
import { IActionTrackingDialog } from '../../core/interfaces/actionTrackingDialog.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericDialogService } from '../../core/services/genericAction/generic-dialog.service';
import { TButtonMode } from '../../core/types/animation.type';
import { LoadingState } from '../../core/interfaces/loadingState.interface';
import { CustomersState } from '../../core/interfaces/customersState.interface';
import { Store } from '@ngrx/store';
import { customerFeature } from '../../core/store/customer.reducer';
import { CustomerActions } from '../../core/store/customer.actions';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    GenTableComponent,
    ActionLoadDataComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
  animations: [fadeInOutAnimation, buttonAnimation, webButtonAnimation],
})

// Responsible for customer table
export class CustomerTableComponent {

  //#region  members
  store = inject(Store);

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'customerNumber', label: 'Customer Number' },
  ];

  buttonMode: TButtonMode = 'normal';

  //#region selector store & subject members
  destroy$ = new Subject<void>();

  loading$ = this.store.select(customerFeature.selectLoading);
  error$ = this.store.select(customerFeature.selectError);
  customers$ = this.store.select(customerFeature.selectCustomers);
  totalCustomers$ = this.store.select(customerFeature.selectTotalCustomers).pipe(
    map(total => total ?? 0)
  );
  currentPage$ = this.store.select(customerFeature.selectCurrentPage).pipe(
    map(page => page ?? 0)
  );
  pageSize$ = this.store.select(customerFeature.selectPageSize).pipe(
    map(size => size ?? 10)
  );

  tableData$ = combineLatest({
    loading: this.loading$,
    error: this.error$,
    customers: this.customers$,
    totalCustomers: this.totalCustomers$,
    currentPage: this.currentPage$,
    pageSize: this.pageSize$
  }).pipe(
    map(data => ({
      ...data,
      totalCustomers: data.totalCustomers ?? 0,
      currentPage: data.currentPage ?? 0,
      pageSize: data.pageSize ?? 10
    }))
  );

  //#endregion

  constructor(
    // Direct injections
    @Inject(MatSnackBar) private snackBar: MatSnackBar = inject(MatSnackBar),
    @Inject(Router) private router: Router = inject(Router),
    @Inject(GenericDialogService) private dialogService: GenericDialogService<any> = inject(GenericDialogService)
  ) {
    this.loadCustomers({
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    });
  }

  //#region Init action


  loadCustomersAgain() {
    combineLatest([
      this.currentPage$,
      this.pageSize$
    ]).pipe(
      take(1)
    ).subscribe(([page, pageSize]) => {
      this.store.dispatch(CustomerActions.loadCustomers({
        page: page || 0,
        pageSize: pageSize || 10
      }));
    });
  }

  loadCustomers(pageEvent: PageEvent): void {
    this.store.dispatch(CustomerActions.loadCustomers({
      page: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize
    }));
  }

  //#endregion

  //#region  main Action

  deleteCustomer(customer: Customer): void {
    const dialogData: IActionTrackingDialog = {
      type: 'warning',
      title: 'Customer deletion warning ⚠️',
      message: `Are you sure you want to delete ${customer.name} with number ${customer.customerNumber}?`,
    };

    this.dialogService
      .openDialog(dialogData, ActionTrackingDialogComponent)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result?.confirmed) {
          this.store.dispatch(CustomerActions.deleteCustomer({ id: customer.id }));
          this.showSnackB('Customer deleted successfully ✅');
        } else {
          this.showSnackB('Delete operation canceled ❎');
        }
      });
  }

  newCustomer() {
    this.router.navigate(['/customerMain']);
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/customerMain', customer.id]);
  }

  showSnackB(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  // #endregion
}
