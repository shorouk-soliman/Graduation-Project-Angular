import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrl: './main-category.component.css'
})
export class MainCategoryComponent implements OnInit, OnDestroy {
categoryId: string|null = '';
category:any;
subcatigories:any;
subcatigorieswithproducts:any;
categoryBanner:any;

constructor(
  private route: ActivatedRoute,
  private unit:UnitService
){}
private subscriptions: Subscription = new Subscription();
ngOnInit(): void {
  this.categoryId = this.route.snapshot.paramMap.get('id');
  this.GetOneCategory();
  this.GetSubCatigoriesByCatigoryId()
  this.GetSubCategoreisWithProducts()
}







itemsPerSlide: number = this.calculateItemsPerSlide();

calculateItemsPerSlide(): any {
  const breakpoints = { 715: 1, 1070: 2, 1440: 3, 1780: 4, 1781: 5 };
  const screenWidth = window.innerWidth;
  return Object.values(breakpoints).find((value, index, array) => screenWidth < +Object.keys(breakpoints)[index] || index === array?.length - 1);
}
@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.itemsPerSlide = this.calculateItemsPerSlide();
}

chunks(arr: any[], size: number): any[][] {
  return Array.from({ length: Math.ceil(arr?.length / size) }, (_, i) =>
    arr?.slice(i * size, i * size + size)
  );
}


















GetOneCategory():void{
  const categorySubscription = this.unit.category.GetOneCategory(this.categoryId).subscribe((categoryData:any)=>{
    this.category = categoryData.category;
    this.categoryBanner = categoryData.banners;
  })
}

GetSubCatigoriesByCatigoryId(){
  this.unit.subcategory.GetSubCategoriesbyCategoryId(this.categoryId).subscribe((subcategoriesData:any)=>{
    this.subcatigories = subcategoriesData;
  })
}

GetSubCategoreisWithProducts(){
  this.unit.subcategory.GetSubCategoriesWithProductsbyCategory(this.categoryId).subscribe((res:any)=>{
    console.log(res)
    this.subcatigorieswithproducts = res;
  })
}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}

}
