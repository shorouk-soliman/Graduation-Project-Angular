import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAddRate } from '../../../../Models/Rating/rating-add';
import { IMapperService } from '../../../../Mapper/IMapper/IMapper.service';
import { IRateRead } from '../../../../Models/Rating/rating-read';
import { IUpdateRate } from '../../../../Models/Rating/rating-update';

@Component({
  selector: 'app-product-rating-form',
  templateUrl: './product-rating-form.component.html',
  styleUrls: ['./product-rating-form.component.css']
})
export class ProductRatingFormComponent implements OnInit, OnChanges {
  constructor(private unit: UnitService, private activatedRoute: ActivatedRoute, private mapper: IMapperService) { }

  @Input() productId: number = 0;
  @Output() UpdateAvgRate: EventEmitter<any> = new EventEmitter<any>();

  ratedBefore: IRateRead | null = null;
  rate: number = 3;
  IsEligable: boolean = false;


  ngOnInit() {
    this.listienToRateAdded()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetEligibility();
  }


  myForm: FormGroup = new FormGroup({
    rate: new FormControl(this.rate),
    reviewtitle: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    reviewText: new FormControl(''),
  });;

  reviewtitleError = () => this.myForm.get('reviewtitle')?.errors;
  isUserAuthunicated = (): boolean => this.unit.auth.isAuthunicated();

  listienToRateAdded(): void {
    /* Event in order Not to make API call to get the rating Client Side */
    this.unit.rate.listenToRate().subscribe((rate: IRateRead | null) => {
          this.ratedBefore = rate;
    });
  };

  GetEligibility() {
    if (this.unit.auth.isAuthunicated()) {
        this.unit.rate.CheckproductEligabilityToRate(this.productId).subscribe((eligable: boolean) => {
          this.IsEligable = eligable;
        });
    } else {
      this.IsEligable = false;
    }
  };


  AddRating(): void {
    if (!this.myForm.valid) return;

    let formValue = { ...this.myForm.value, rate: this.rate };
    let addRate: IAddRate = this.mapper.rate.ToAddRate(formValue.rate, formValue.reviewtitle, formValue.reviewText);
    let readRate: IRateRead | undefined = this.mapper.rate.AddToRead(addRate, this.productId);

    this.unit.rate.AddRating(addRate, this.productId).subscribe(() => {
      this.UpdatingUIAfterAddRate(readRate);
    })
  };

  private UpdatingUIAfterAddRate(readRate: IRateRead): void {
    /* send the rate created to the rating section client side addition */
    this.unit.rate.sendRate(readRate);
    
    /* send the rate created to the rating section client side addition */
    this.ratedBefore = readRate;

    /* updating the avg rating after rating */
    this.UpdateAvgRate.emit();
  };

  UpdateRating(): void {
    if (!this.myForm.valid) return;

    let formValue = { ...this.myForm.value, rate: this.rate };
    let updateRate: IUpdateRate = this.mapper.rate.ToUpdateRate(formValue.rate, formValue.reviewtitle, formValue.reviewText);
    let readRate: IRateRead | undefined = this.mapper.rate.UpdateToRead(updateRate, this.productId);

    this.unit.rate.UpdateRating(updateRate, this.productId).subscribe(() => {
      this.UpdatingUIAfterUpdateRate(readRate);
    });
  };

  private UpdatingUIAfterUpdateRate(readRate: IRateRead): void {
    /* send the rate created to the rating section client side addition */
    this.unit.rate.sendRate(readRate);
    
    /* send the rate created to the rating section client side addition */
    this.ratedBefore = readRate;

    /* updating the avg rating after rating */
    this.UpdateAvgRate.emit();
  };

  checkIfRatedBefore = (): boolean => this.ratedBefore !== null && this.ratedBefore !== undefined;

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
