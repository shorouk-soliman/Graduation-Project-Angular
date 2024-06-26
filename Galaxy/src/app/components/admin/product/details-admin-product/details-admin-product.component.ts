import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitService } from '../../../../services/unit.service';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model';

@Component({
  selector: 'app-details-admin-product',
  templateUrl: './details-admin-product.component.html',
  styleUrls: ['./details-admin-product.component.css']
})
export class DetailsAdminProductComponent implements OnInit {

  product: IProductDetails = initialProductDetails;
  mainImage: string = '';

  constructor(
    private unit: UnitService,
    public dialogRef: MatDialogRef<DetailsAdminProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.productId) {
      this.unit.product.GetProductDetails(this.data.productId).subscribe(
        (product: IProductDetails) => {
          this.product = product;
          this.mainImage = this.product.image;
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  SetMainImage(image: string): void {
    this.mainImage = image;
  }

}
