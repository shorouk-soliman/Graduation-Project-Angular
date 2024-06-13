import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-rating-form',
  templateUrl: './product-rating-form.component.html',
  styleUrls: ['./product-rating-form.component.css']
})
export class ProductRatingFormComponent implements OnInit, OnChanges {
  constructor(private unit: UnitService) { }

  @Input() productId: any;
  @Output() UpdateAvgRate: EventEmitter<any> = new EventEmitter<any>();

  ratedBefore: any = null;
  rate: number = 3;
  IsEligable: boolean = false;


  ngOnInit() {
    this.GetRatedBefore();
    this.GetEligibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetRatedBefore();
    this.GetEligibility();
    }

  myForm: FormGroup = new FormGroup({
    rate: new FormControl(this.rate),
    reviewtitle: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    reviewText: new FormControl(''),
  });;

  reviewtitleError = () => this.myForm.get('reviewtitle')?.errors
  isUserAuthunicated = (): boolean => this.unit.auth.isAuthunicated();



  GetEligibility() {
    if (this.unit.auth.isAuthunicated()) {

      this.unit.rate.CheckproductEligabilityToRate(this.productId).subscribe((eligable: any) => {
        this.IsEligable = eligable;
      })
    } else {
      this.IsEligable = false;
    }
  }
  GetRatedBefore() {
    this.unit.rate.GetProductRating().subscribe((rateData: any) => {
      this.ratedBefore = rateData.ratedBefore;
      this.updateFormValues(rateData.ratedBefore)
    })
  }

  AddRating(): void {
    if (!this.myForm.valid) return;
    let ratingObj = { ...this.myForm.value, rate: this.rate }
    this.unit.rate.AddRating(ratingObj, this.productId).subscribe(() => {
      this.unit.rate.FetchProductRating();
      this.UpdateAvgRate.emit();
    }, error => {
      alert(error.error)
    })
  }

  UpdateRating(): void {
    if (!this.myForm.valid) return;
    let ratingObj = { ...this.myForm.value, rate: this.rate }
    this.unit.rate.UpdateRating(ratingObj, this.productId).subscribe(() => {
      this.unit.rate.FetchProductRating();
      this.UpdateAvgRate.emit();
    }, error => {
      alert(error.error)
    })
  }


  checkIfRatedBefore = (): boolean => this.ratedBefore !== null;

  SetRate(rate: number) {
    this.rate = rate;
  }

  updateFormValues(data: any | null) {
    if (data === null) return;
    this.myForm.patchValue({
      rate: data?.rate,
      reviewtitle: data?.reviewTitle,
      reviewText: data?.reviewText
    });
    this.SetRate(data?.rate)
  }

}
