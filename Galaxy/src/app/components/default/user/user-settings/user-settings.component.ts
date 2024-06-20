import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  constructor(private unit: UnitService) { }

  ToggleForm:boolean = false;
  oldValues:any

ngOnInit(): void {
  this.GetProfile()
}

  UpdateForm: FormGroup = new FormGroup({
    firstname: new FormControl('',[ Validators.required,Validators.minLength(2),Validators.maxLength(25)]),
    lastname: new FormControl('',[ Validators.required,Validators.minLength(2),Validators.maxLength(25)]),
    email: new FormControl('',[ Validators.required,Validators.email]),
    address: new FormControl('',[Validators.maxLength(400)]),
  });

  FNameError = () => this.UpdateForm.get('firstname')?.errors
  LNameError = () => this.UpdateForm.get('lastname')?.errors
  EmailError = () => this.UpdateForm.get('email')?.errors
  AddressError = () => this.UpdateForm.get('password')?.errors

  onSubmit(){
    if(!this.UpdateForm.valid) return;
    this.unit.user.UpdateUser(this.UpdateForm.value).subscribe(()=>{
      this.unit.user.FetchUser();
    });
  }

  GetProfile(){
    this.unit.user.GetUser().subscribe((res)=>{
      this.updateProfileForm(res)
    })
  }
  FormVisability = () => this.ToggleForm;
  ToggleFromFunc = ()=> this.ToggleForm = true;
  ToggleFromMainFunc = ()=> this.ToggleForm = false;
  

  updateProfileForm(profileValues:any){
    this.UpdateForm.patchValue({
    firstname: profileValues.firstName,
    lastname: profileValues.lastName,
    email: profileValues.email,
    address:profileValues.address,
    });
  }

}
