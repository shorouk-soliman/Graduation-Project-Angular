import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-password-settings',
  templateUrl: './user-password-settings.component.html',
  styleUrls: ['./user-password-settings.component.css']
})
export class UserPasswordSettingsComponent {
  notificationMessage: string | null = null;

  constructor(private unit: UnitService, public dialog: MatDialog, private router: Router) {}

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
    this.unit.user.UpdatePassword(this.PasswordForm.value).subscribe((res) => {
      this.notificationMessage = "ok! It changed successfully";
      this.refreshUser.emit();
    });
  }

  confirmUpdateuser(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want change the password؟' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      } else {
        this.notificationMessage = "cancelled";
      }
    });
  }
// going to user-setting 
  navigateToUserSettings() {
    this.router.navigate(['/settings']);
  }
}
