import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'] 
})
export class UserSettingsComponent implements OnInit {
  notificationMessage: string | null = null;
  ToggleForm: boolean = false;
  oldValues: any;

  @Output() formUpdated = new EventEmitter<void>(); 

  constructor(private unit: UnitService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetProfile();
  }

  UpdateForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.maxLength(400)])
  });

  FNameError = () => this.UpdateForm.get('firstname')?.errors;
  LNameError = () => this.UpdateForm.get('lastname')?.errors;
  EmailError = () => this.UpdateForm.get('email')?.errors;
  AddressError = () => this.UpdateForm.get('address')?.errors; 

  onSubmit() {
    if (!this.UpdateForm.valid) return;
    this.unit.user.UpdateUser(this.UpdateForm.value).subscribe(() => {
      this.unit.user.FetchUser();
      this.notificationMessage = "updated sucessfully"; 
      this.formUpdated.emit(); 
    });
  }

  GetProfile() {
    this.unit.user.GetUser().subscribe((res) => {
      this.oldValues = res;
      this.updateProfileForm(res);
    });
  }

  FormVisability = () => this.ToggleForm;
  ToggleFromFunc = () => this.ToggleForm = true;
  ToggleFromMainFunc = () => this.ToggleForm = false;

  updateProfileForm(profileValues: any) {
    this.UpdateForm.patchValue({
      firstname: profileValues.firstName,
      lastname: profileValues.lastName,
      email: profileValues.email,
      address: profileValues.address,
    });
  }

  confirmUpdateuser(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to update your profile?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit(); 
      } else {
        this.notificationMessage = "it is cancelled"; 
        this.cancelUpdate();
      }
    });
  }

  cancelUpdate(): void {
    this.UpdateForm.patchValue({
      firstname: this.oldValues.firstName, 
      lastname: this.oldValues.lastName,
      email: this.oldValues.email,
      address: this.oldValues.address,
    });
  }
}
