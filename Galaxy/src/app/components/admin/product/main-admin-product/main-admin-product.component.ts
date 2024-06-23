import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../../../Models/Product/products-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';

@Component({
  selector: 'app-main-admin-product',
  templateUrl: './main-admin-product.component.html',
  styleUrls: ['./main-admin-product.component.css']
})
export class MainAdminProductComponent implements OnInit, OnDestroy {
  products: IProducts[] = [];
  query: IProductQuery = new initProductQuery();
  isDeleted :boolean = false;
  private productsSubscription: Subscription = new Subscription();

  constructor(private unit: UnitService ) { }

  ngOnInit(): void {
    this.unit.products.fetchGeneralProducts(this.query);
  this.GetProducts()
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

   GetProducts():void{
    this.productsSubscription = this.unit.products.GetProducts().subscribe((products: any) => {
      this.products = products.products;
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
