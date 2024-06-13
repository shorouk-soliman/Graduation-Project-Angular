import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(private unit:UnitService) { }

  productsArray:any;
  Totalpages:number = 1;

  sort:string = "default";
  page:number = 1;
  limit:number = 30;
  
  ngOnInit() {
    this.FetchGeneralProducts();
    this.GetGeneralProducts();
  }
  
  FetchGeneralProducts():void{
    this.unit?.products?.FetchGeneralProducts(this.page,this.limit,this.sort,0,0);
  }

  GetGeneralProducts() : void{
    const productsSubscription = this.unit.products.GetProducts().subscribe((productsData:any)=>{
      this.productsArray = productsData?.products;
      this.Totalpages = productsData?.totalPages;
    })
    this.subscription.add(productsSubscription);
  }

  OnSortChange(sort:string):void{    
    this.sort = sort;
    this.FetchGeneralProducts();
  }
  
  OnLimitChange(limit:number):void{
    this.limit = limit;
    this.page = 1;
    this.FetchGeneralProducts();
  }
  
  OnPageChange(page:number):void{
    this.page = page;
    this.FetchGeneralProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
