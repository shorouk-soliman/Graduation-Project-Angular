import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute } from '@angular/router';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';

@Component({
  selector: 'app-main-subcategory',
  templateUrl: './main-subcategory.component.html',
  styleUrl: './main-subcategory.component.css'
})
export class MainSubcategoryComponent implements OnInit{

  subcategoryId: number = 0;
  subcategory:any;

  constructor(
    private route: ActivatedRoute,
    private unit:UnitService
  ){}

  query:IProductQuery = new initProductQuery();

  productsArray:any;
  Totalpages:number = 1;

  
  ngOnInit(): void {
    this.subcategoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.query.subCategoryId = this.subcategoryId;
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
    this.unit?.products?.fetchGeneralProducts(this.query);
  }

  GetGeneralProducts() : void{
    const productsSubscription = this.unit.products.GetProducts().subscribe((productsData:any)=>{
      this.productsArray = productsData?.products;
      this.Totalpages = productsData?.totalPages;
    })
    // this.subscription.add(productsSubscription);
  }

  OnSortChange(sort:string):void{    
    this.query.sort = sort;
    this.FetchGeneralProducts();
  }
  
  OnLimitChange(limit:number):void{
    this.query.limit = limit;
    this.query.page = 1;
    this.FetchGeneralProducts();
  }
  
  OnKeywordChange(keyword:string):void{
    this.query.keyword = keyword;
    this.FetchGeneralProducts();
  }
  OnPageChange(page:number):void{
    this.query.page = page;
    this.FetchGeneralProducts();
  }


}
