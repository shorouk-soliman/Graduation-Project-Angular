import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-banner-slider',
  templateUrl: './category-banner-slider.component.html',
  styleUrl: './category-banner-slider.component.css'
})
export class CategoryBannerSliderComponent implements OnInit {
  @Input() CategoryBanners:any;
  
  ngOnInit(): void {
    
  }
}
