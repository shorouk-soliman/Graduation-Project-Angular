import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../../../Models/Product/products-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsAdminProductComponent } from '../details-admin-product/details-admin-product.component';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-main-admin-product',
  templateUrl: './main-admin-product.component.html',
  styleUrls: ['./main-admin-product.component.css']
})
export class MainAdminProductComponent implements OnInit, OnDestroy {
  products: IProducts[] = [];
  query: IProductQuery = new initProductQuery();
  private productsSubscription: Subscription = new Subscription();

  constructor(private unit: UnitService, private dialog: MatDialog) {}

  ngOnInit(): void {
   this.unit.products.fetchGeneralProducts(this.query);
    this.GetProducts();
  }

  openProductDetailsDialog(productId: number): void {
    const dialogRef = this.dialog.open(DetailsAdminProductComponent, {
      width: '80%',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
DeleteProduct(product: any): void {
  const dialogRef = this.dialog.open(ConfirmMessageComponent, {
    data: { message: `Are you sure you want to delete ${product.name}?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.unit.product.DeleteProduct(product.id).subscribe(() => {
        product.isDeleted = true;
      }, error => {
        console.error('Error deleting product', error);
      });
    }
  });
}
  RetrieveProduct(product: any): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to retrieve ${product.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.unit.product.RetrieveProduct(product.id).subscribe(() => {
        product.isDeleted = false;
      }, (error: any) => {
      console.error('Error retrieving product', error);
    });
  }
});
}
  GetProducts(): void {
    this.productsSubscription = this.unit.products.GetProducts().subscribe((response: any) => {
      this.products = response.products.sort((a: IProducts, b: IProducts) => b.id - a.id);
    }, (error: any) => {
      console.error('Error fetching products', error);
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
