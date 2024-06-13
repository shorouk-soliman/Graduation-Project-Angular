import { Component, OnDestroy } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-admin-attribute',
  templateUrl: './main-admin-attribute.component.html',
  styleUrl: './main-admin-attribute.component.css'
})
export class MainAdminAttributeComponent implements OnDestroy {
  constructor(private unit: UnitService) { }
  attributes: any;
  private attributeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.GetAttributes()
  }

  DeleteAttribute(attributeId:any){
    this.unit.attribute.DeleteAttribute(attributeId).subscribe(()=>{
      this.GetAttributes()
    },error=>{
    })
  }

  GetAttributes():void{
    this.attributeSubscription = this.unit.attribute.GetAttributes().subscribe((res: any) => {
      this.attributes = res;
    });
  }

  ngOnDestroy(): void {
    this.attributeSubscription? this.attributeSubscription.unsubscribe():null;
  }
}
