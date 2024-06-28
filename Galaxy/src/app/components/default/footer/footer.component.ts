import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { ViewportScroller } from '@angular/common';
import { ICategoryRead } from '../../../Models/Category/category-read';
import { IBrandRead } from '../../../Models/Brand/Brand-Read-model';
import { ICategorySubs } from '../../../Models/Category/category-with-subs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private unit: UnitService, private viewportScroller: ViewportScroller) { }

  categroies: ICategoryRead[] = [];
  brands: IBrandRead[] = [];
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    this.unit.brand.FetchGeneralBrands();
    this.GetBrands();
    this.GetCategory();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  GetBrands() {
    this.unit.brand.getGeneralBrands().subscribe((res: any) => {
      this.brands = res;
    });
  };

  GetCategory() {
    this.unit.category.getGeneralCategories().subscribe((res: ICategoryRead[]) => {
      this.categroies = res;
    });
  };

}
