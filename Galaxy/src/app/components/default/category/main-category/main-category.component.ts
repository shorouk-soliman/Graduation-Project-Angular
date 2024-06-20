import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { ICategoryDetails } from '../../../../Models/Category/category-details';
import { ISubCategoryRead } from '../../../../Models/Sub Category/subcategory-read';
import { ISubcategoryProducts } from '../../../../Models/Sub Category/subcategory-with-products';
import { ICategoryBanner } from '../../../../Models/Category/category-banner';
import { ICategoryRead, initCategoryRead } from '../../../../Models/Category/category-read';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrl: './main-category.component.css'
})

export class MainCategoryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  itemsPerSlide: number = this.calculateItemsPerSlide();
  categoryId: number = 0;
  category: ICategoryRead = initCategoryRead;
  subcatigories: ISubCategoryRead[] = [];
  subcatigorieswithproducts: ISubcategoryProducts[] = [];
  categoryBanner: ICategoryBanner[] = [];

  constructor(
    private route: ActivatedRoute,
    private unit: UnitService
  ) { };

  ngOnInit(): void {
    this.getIdParamter()
  };

  getIdParamter():void{
    this.route.paramMap.subscribe(params =>{
      this.categoryId = Number(params.get('id'));
      this.GetOneCategory();
      this.GetSubCatigoriesByCatigoryId();
      this.GetSubCategoreisWithProducts();
    });
  };

  GetOneCategory(): void {
    let categorySubscription = this.unit.category
      .GetOneCategory(this.categoryId).subscribe((categoryData: ICategoryDetails) => {
        this.category = categoryData.category;
        this.categoryBanner = categoryData.banners;
      });

    this.subscriptions.add(categorySubscription);
  };

  GetSubCatigoriesByCatigoryId(): void {
    this.unit.subcategory.GetSubCategoriesbyCategoryId(this.categoryId)
      .subscribe((subcategoriesData: ISubCategoryRead[]) => {
        this.subcatigories = subcategoriesData;
      });
  };

  GetSubCategoreisWithProducts(): void {
    this.unit.subcategory.GetSubCategoriesWithProductsbyCategory(this.categoryId)
      .subscribe((subCategoryWithProducts: ISubcategoryProducts[]) => {
        this.subcatigorieswithproducts = subCategoryWithProducts;
      });
  };

  calculateItemsPerSlide(): any {
    const breakpoints = { 715: 1, 1070: 2, 1440: 3, 1780: 4, 1781: 5 };
    const screenWidth = window.innerWidth;
    return Object.values(breakpoints)
    .find((value, index, array) => screenWidth < +Object.keys(breakpoints)[index] || index === array?.length - 1);
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.itemsPerSlide = this.calculateItemsPerSlide();
  };

  chunks(arr: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(arr?.length / size) }, (_, i) =>
      arr?.slice(i * size, i * size + size)
    );
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

};