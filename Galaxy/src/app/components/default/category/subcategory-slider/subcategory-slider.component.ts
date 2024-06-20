import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISubCategoryRead } from '../../../../Models/Sub Category/subcategory-read';

@Component({
  selector: 'app-subcategory-slider',
  templateUrl: './subcategory-slider.component.html',
  styleUrl: './subcategory-slider.component.css'
})
export class SubcategorySliderComponent {

  @Input() subcategories: ISubCategoryRead[] = [];

  itemsPerSlide: number = this.calculateItemsPerSlide();

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

};