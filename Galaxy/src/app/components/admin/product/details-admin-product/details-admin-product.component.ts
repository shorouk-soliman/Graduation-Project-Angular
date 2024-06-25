import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitService } from '../../../../services/unit.service';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model'; // Adjust the path as per your file structure

@Component({
  selector: 'app-details-admin-product',
  templateUrl: './details-admin-product.component.html',
  styleUrls: ['./details-admin-product.component.css']
})
export class DetailsAdminProductComponent implements OnInit, OnChanges {
  @Input() product: IProductDetails = initialProductDetails;
  @Input() InQty: number | undefined = 0;
  @Output() onChangeValues = new EventEmitter<any>();

  mainImage: string = '';

  constructor(
    private unit: UnitService, // Replace with your actual service
    public dialogRef: MatDialogRef<DetailsAdminProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.product) {
      this.product = data.product;
    }
  }

  ngOnInit(): void {
    this.mainImage = this.product.image;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product) {
      this.mainImage = this.product.image;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  SetMainImage(image: string): void {
    this.mainImage = image;
  }

  ChangeValues(event: any): void {
    this.onChangeValues.emit(event);
  }

  OnProductQtyChangeIN(event: any): void {
    const newQuantity = event.target.value;
    this.InQty = newQuantity;
    this.unit.cart.UpdateItemQuantity(this.product.id, +newQuantity);
  }

  OnProductQtyChangeOUT(event: any): void {
    const newQuantity = event.target.value;
    this.unit.cart.UpdateItemQuantity(this.product.id, +newQuantity);
  }

  editProduct(productId: number): void {
    // Navigate to edit product page or open edit dialog
  }
}
