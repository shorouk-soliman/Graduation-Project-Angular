import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.css'
})
export class ProductPriceComponent {
@Input() product:any;
}
