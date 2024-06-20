import { Component, HostListener } from '@angular/core';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css'
})
export class BrandSliderComponent {
  items: any;
  
  constructor(private unit: UnitService) { }

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories(){
    this.unit.brand.getGeneralBrands().subscribe((categories:any)=>{
        this.items = categories;
    })
  }

  FetchCategories(){
    this.unit.category.fetchGeneralCategories();
  }

  itemsPerSlide: number = this.calculateItemsPerSlide();

  calculateItemsPerSlide(): any {
    const breakpoints = { 715: 2, 1070: 3, 1440: 4, 1780: 5, 1781: 9 };
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
