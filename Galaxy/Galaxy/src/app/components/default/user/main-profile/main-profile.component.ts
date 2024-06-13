import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent implements OnInit{

constructor(private unit: UnitService){}

  user:any;

  ngOnInit(): void {
    this.FetchUser();
    this.GetUser();
  }

  FetchUser():void{
    this.unit.user.FetchUser();
  }

  GetUser():void{
    this.unit.user.GetUser().subscribe((user:any)=>{
      this.user = user;
    });
  }

}
