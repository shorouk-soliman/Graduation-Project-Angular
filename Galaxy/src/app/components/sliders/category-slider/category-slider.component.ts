import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { ICategoryRead } from '../../../Models/Category/category-read';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent implements OnInit {
  categories: ICategoryRead[] = [];
  
  constructor(private unit: UnitService) { }

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories(){
    this.unit.category.getGeneralCategories().subscribe((categories:ICategoryRead[])=>{
        this.categories = categories;
    })
  }

  FetchCategories(){
    this.unit.category.fetchGeneralCategories();
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
}
