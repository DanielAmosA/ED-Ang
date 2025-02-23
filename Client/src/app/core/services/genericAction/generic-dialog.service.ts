import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Allows to open dialogs in a modular and convenient way with changing data,
// and it enables a rich and organized user experience.
export class GenericDialogService<TDialogComponent> {
  constructor(
    // Direct MatDialog injection
    @Inject(MatDialog) private dialog: MatDialog
  ) { }

  openDialog(data: any, dialogComponent: TDialogComponent): Observable<any> {
    const dialogRef = this.dialog.open(dialogComponent as any, {
      data: data,
    });

    return dialogRef.afterClosed();
  }
}
