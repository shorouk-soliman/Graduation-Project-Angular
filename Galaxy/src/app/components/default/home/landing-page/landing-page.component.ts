import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IGeneralProducts, initGeneralProducts } from '../../../../Models/Product/general-product-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  products: IGeneralProducts = initGeneralProducts;
  query: IProductQuery = new initProductQuery();

  constructor(private unit: UnitService) { }


  ngOnInit() {
    this.FetchGeneralProducts();
    this.GetGeneralProducts();
  }

  FetchGeneralProducts(): void {
    this.unit?.products?.fetchGeneralProducts(this.query);
  }

  GetGeneralProducts(): void {
    const productsSubscription = this.unit.products.GetProducts().subscribe((productsData: IGeneralProducts) => {
      this.products = productsData;
    });
    this.subscription.add(productsSubscription);
  }

  OnSortChange(sort: string): void {
    this.query.sort = sort;
    this.FetchGeneralProducts();
  }

  OnLimitChange(limit: number): void {
    this.query.limit = limit;
    this.query.page = 1;
    this.FetchGeneralProducts();
  }

  OnPageChange(page: number): void {
    this.query.page = page;
    this.FetchGeneralProducts();
  }

  OnKeyWordChange(keyword: string): void {
    this.query.keyword = keyword;
    this.query.page = 1;
    this.FetchGeneralProducts();
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
