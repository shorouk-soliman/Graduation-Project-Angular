import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IGeneralProducts, initGeneralProducts } from '../../../../Models/Product/general-product-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  isloading: boolean = false;
  private subscription: Subscription = new Subscription();
  products: IGeneralProducts = initGeneralProducts;
  query: IProductQuery = new initProductQuery();

  constructor(private unit: UnitService) { }

  ngOnInit() {
    console.log(this.isloading);
    this.FetchGeneralProducts();
    this.GetGeneralProducts();
  }

  FetchGeneralProducts(): void {
    this.isloading = true;
    this.unit?.products?.fetchGeneralProducts(this.query);
    console.log(this.isloading);
  }

  GetGeneralProducts(): void {
    this.isloading = true;
    const productsSubscription = this.unit.products.GetProducts().subscribe((productsData: IGeneralProducts) => {
      console.log(this.isloading);
      this.products = productsData;
      this.isloading = false;
    });
    this.subscription.add(productsSubscription);
    console.log(this.isloading);
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
