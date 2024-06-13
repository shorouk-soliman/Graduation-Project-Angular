import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private unit:UnitService,private viewportScroller: ViewportScroller) { }

  categroies:any;
  brands:any;
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.unit.brand.FetchGeneralBrands();
    this.GetBrands();
    this.GetCategory();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  GetBrands(){
    this.unit.brand.GetGeneralBrands().subscribe((res:any)=>{
      this.brands = res;
    })
  }

  GetCategory(){
    this.unit.category.GetGeneralCategories().subscribe((res:any)=>{
      this.categroies = res;
    })
  }

}
