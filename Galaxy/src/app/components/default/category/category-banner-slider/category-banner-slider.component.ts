import { Component, Input, OnInit } from '@angular/core';
import { ICategoryBanner } from '../../../../Models/Category/category-banner';

@Component({
  selector: 'app-category-banner-slider',
  templateUrl: './category-banner-slider.component.html',
  styleUrl: './category-banner-slider.component.css'
})
export class CategoryBannerSliderComponent implements OnInit {
  @Input() CategoryBanners:ICategoryBanner[] = [];
  
  ngOnInit(): void {
    
  }
}
