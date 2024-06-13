import { Component } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-admin-values',
  templateUrl: './main-admin-values.component.html',
  styleUrl: './main-admin-values.component.css'
})
export class MainAdminValuesComponent {
  constructor(private unit: UnitService) { }
  values: any;


  ngOnInit(): void {
    this.GetValues()
  }

  DeleteAttribute(attributeId:any){
    this.unit.values.DeleteValues(attributeId).subscribe(()=>{
      this.GetValues()
    },error=>{
    })
  }

  GetValues():void{
    this.unit.values.GetValues().subscribe((res: any) => {
      this.values = res;
    });
  }

}
