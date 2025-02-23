import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IActionTrackingDialog } from '../../../core/interfaces/actionTrackingDialog.interface';
import { buttonAnimation, dialogOpen, errorOpen, successOpen, warningOpen } from '../../animations/animations';

@Component({
  selector: 'app-action-tracking.dialog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './action-tracking.dialog.component.html',
  styleUrl: './action-tracking.dialog.component.scss',
  animations: [
    dialogOpen,
    successOpen,
    warningOpen,
    errorOpen,
    buttonAnimation
  ]
})

// Responsible for action tracking
export class ActionTrackingDialogComponent {

  constructor(
    // Direct injections
    @Inject(MatDialogRef<ActionTrackingDialogComponent>) public dialogRef: MatDialogRef<ActionTrackingDialogComponent> = inject(MatDialogRef),
    @Inject(MAT_DIALOG_DATA) public data: IActionTrackingDialog = inject(MAT_DIALOG_DATA)
  ) { }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close({ confirmed: true });
  }

  onCancel() {
    this.dialogRef.close({ confirmed: false });
  }
}
