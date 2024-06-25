import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../../../Models/Product/products-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsAdminProductComponent } from '../details-admin-product/details-admin-product.component';

@Component({
  selector: 'app-main-admin-product',
  templateUrl: './main-admin-product.component.html',
  styleUrls: ['./main-admin-product.component.css']
})
export class MainAdminProductComponent implements OnInit, OnDestroy {
  products: IProducts[] = [];
  query: IProductQuery = new initProductQuery();
  isDeleted: boolean = false;
  private productsSubscription: Subscription = new Subscription();

  constructor(private unit: UnitService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.unit.products.fetchGeneralProducts(this.query);
    this.GetProducts();
  }

  openProductDetailsDialog(product: any): void {
    const dialogRef = this.dialog.open(DetailsAdminProductComponent, {
      width: '90%',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  DeleteProduct(productId: number): void {
    this.unit.product.DeleteProduct(productId).subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        this.isDeleted = true;
      }
    }, (error: any) => {
      console.error('Error deleting product', error);
    });
  }

  RetrieveProduct(productId: number): void {
    this.unit.product.RetrieveProduct(productId).subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        this.isDeleted = false;
      }
    }, (error: any) => {
      console.error('Error retrieving product', error);
    });
  }

  GetProducts(): void {
    this.productsSubscription = this.unit.products.GetProducts().subscribe((products: any) => {
      this.products = products.products.sort((a: any, b: any) => b.id - a.id); 
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
