import { Component, Input } from '@angular/core';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.css'
})
export class ProductPriceComponent {
@Input() product:IProductDetails = initialProductDetails;
}
