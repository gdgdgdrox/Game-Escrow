import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-item-received-dialog',
  imports: [],
  templateUrl: './confirm-item-received-dialog.component.html',
  styleUrl: './confirm-item-received-dialog.component.css'
})
export class ConfirmItemReceivedDialogComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmItemReceivedDialogComponent>) {}
  
    onCancel(): void {
      this.dialogRef.close(false);
    }
  
    onConfirm(): void {
      this.dialogRef.close(true);
    }
}
