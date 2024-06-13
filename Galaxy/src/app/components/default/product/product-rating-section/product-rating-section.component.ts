import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-product-rating-section',
  templateUrl: './product-rating-section.component.html',
  styleUrls: ['./product-rating-section.component.css']
})
export class ProductRatingSectionComponent implements OnInit, OnChanges {

  constructor(private unit: UnitService) { }
  @Input() productId: any;
  @Output() UpdateAvgRate: EventEmitter<any> = new EventEmitter<any>();


  page: number = 1;
  ratings: any;
  totalpages: any;
  ratedBefore: any = null;

  ngOnInit(): void {
    this.GetRating();
  }

  ngOnChanges() {
    this.FetchRating();
  }

  FetchRating = () => this.unit.rate.FetchProductRating(this.page, this.productId);

  DeleteRate(){
    this.unit.rate.DeleteRating(this.productId).subscribe(()=>{
      this.FetchRating();
      this.UpdateAvgRate.emit();
    })
  }


  GetRating() {
    this.unit.rate.GetProductRating().subscribe((rateData: any) => {
      this.ratings = rateData.ratings;
      this.totalpages = rateData.totalPages;
      this.ratedBefore = rateData.ratedBefore;
    })
  }


}
