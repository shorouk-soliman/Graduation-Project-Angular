import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subcategory-products-banner-slider',
  templateUrl: './subcategory-products-banner-slider.component.html',
  styleUrl: './subcategory-products-banner-slider.component.css'
})
export class SubcategoryProductsBannerSliderComponent {
  @Input() banners:any;
}
