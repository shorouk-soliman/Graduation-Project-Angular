import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-user-password-settings',
  templateUrl: './user-password-settings.component.html',
  styleUrl: './user-password-settings.component.css'
})
export class UserPasswordSettingsComponent {
  constructor(private unit:UnitService){}


  @Output() ToggleForm:EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshUser:EventEmitter<any> = new EventEmitter<any>()


  Toggle(){
    this.ToggleForm.emit(); 
  }


  PasswordForm: FormGroup = new FormGroup({
    oldpassword: new FormControl('',[ Validators.required,Validators.minLength(8)]),
    newpassword: new FormControl('',[ Validators.required,Validators.minLength(8)]),
  });


  OldError = () => this.PasswordForm.get('oldpassword')?.errors
  NewError = () => this.PasswordForm.get('newpassword')?.errors


  onSubmit(){
    if(!this.PasswordForm.valid) return;
    this.unit.user.UpdatePassword(this.PasswordForm.value).subscribe((res)=>{
      this.refreshUser.emit();
    });
  }
}
