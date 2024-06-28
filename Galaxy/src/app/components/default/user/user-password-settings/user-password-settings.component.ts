import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-user-password-settings',
  templateUrl: './user-password-settings.component.html',
  styleUrls: ['./user-password-settings.component.css']
})
export class UserPasswordSettingsComponent {
  submissionSuccess: boolean = false;
  submissionError: boolean = false;

  constructor(private unit: UnitService, public dialog: MatDialog) {}

  @Output() ToggleForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshUser: EventEmitter<any> = new EventEmitter<any>();

  Toggle() {
    this.ToggleForm.emit();
  }

  PasswordForm: FormGroup = new FormGroup({
    oldpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  OldError = () => this.PasswordForm.get('oldpassword')?.errors;
  NewError = () => this.PasswordForm.get('newpassword')?.errors;

  onSubmit() {
    if (!this.PasswordForm.valid) return;

    this.unit.user.UpdatePassword(this.PasswordForm.value).subscribe(
      () => {
        this.submissionSuccess = true;
        this.submissionError = false;        this.refreshUser.emit();
        setTimeout(() => {
        }, 5000);
      },
      (error) => {
        console.error('Password change failed:', error);
        this.submissionError = true;
        this.submissionSuccess = false;      }
    );
  }

  confirmUpdateuser(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to change the password?' ,
        title :'Change password'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      } else {
        this.submissionError = true;
        this.submissionSuccess = false;       }
    });
  }

  cancelUpdate(): void {
    this.PasswordForm.reset();
  }
}
