import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-subcategory',
  templateUrl: './main-subcategory.component.html',
  styleUrl: './main-subcategory.component.css'
})
export class MainSubcategoryComponent implements OnInit{

  subcategoryId: string|null = '';
  subcategory:any;

  constructor(
    private route: ActivatedRoute,
    private unit:UnitService
  ){}


  productsArray:any;
  Totalpages:number = 1;

  sort:string = "default";
  page:number = 1;
  limit:number = 30;
  
  ngOnInit(): void {
    this.subcategoryId = this.route.snapshot.paramMap.get('id');
    this.GetSubCategory();
    this.FetchGeneralProducts();
    this.GetGeneralProducts();
  }

  GetSubCategory(){
    this.unit.subcategory.GetOneSubCategory(this.subcategoryId).subscribe((subcategory:any)=>{
      this.subcategory = subcategory;
    })
  }

  FetchGeneralProducts():void{
    this.unit?.products?.FetchGeneralProducts(this.page,this.limit,this.sort,this.subcategoryId,0);
  }

  GetGeneralProducts() : void{
    const productsSubscription = this.unit.products.GetProducts().subscribe((productsData:any)=>{
      this.productsArray = productsData?.products;
      this.Totalpages = productsData?.totalPages;
    })
    // this.subscription.add(productsSubscription);
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


}
