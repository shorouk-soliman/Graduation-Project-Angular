import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { GenericService } from './generic.service';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';
import { IProducts } from '../Models/Product/products-model';
import { IGeneralProducts, initGeneralProducts } from '../Models/Product/general-product-model';
import { ICartItem } from '../Models/Cart-Items/Cart-item-model';
import { IProductQuery } from '../Models/Product/product-query-model';

@Injectable()
export class ProductsService {

  constructor(private generic: GenericService, private cartService: CartService, private wishlistService: WishlistService) { }
  private productsDataSubject: BehaviorSubject<IGeneralProducts> = new BehaviorSubject<IGeneralProducts>(initGeneralProducts);


  fetchGeneralProducts(productQuery:IProductQuery): void {
    let Url: string = `Product/GetGeneralPagination`;

    this.generic.postRequest<IProductQuery>(Url,productQuery).subscribe((products: IGeneralProducts) => {

        this.cartService.GetCart().subscribe((cartItem: ICartItem[]) => {
          this.wishlistService.GetWishList().subscribe((wishlistproducts: any) => {

            products.products = this.ChangeProductsInCart(products.products, cartItem)
            products.products = this.ChangeProductsInWishList(products.products, wishlistproducts)

            this.productsDataSubject.next(products);
          })
        })

      });

  }

  UpdateProductsWlCart(products: IProducts[], cartItems: ICartItem[], wishListProducts: IProducts[]): IProducts[] {
    products = this.ChangeProductsInCart(products, cartItems);
    products = this.ChangeProductsInWishList(products, wishListProducts);
    return products;
  }

  GetProducts(): Observable<IGeneralProducts> {
    return this.productsDataSubject.asObservable();
  }

  ChangeProductsInCart(productsArray: IProducts[], cartArray: ICartItem[]): IProducts[] {
    return productsArray?.map((product: IProducts) => {
      let isInCart = this.isProductExiestInCart(cartArray, product);
      return { ...product, inCart: isInCart };
    });
  }

  isProductExiestInCart(cartProducts: ICartItem[], product: IProducts): boolean {
    return cartProducts?.some(cp => +cp.productId === +product.id);
  }


  ChangeProductsInWishList(productsArray: IProducts[], WishListArray: IProducts[]): IProducts[] {
    return productsArray?.map((product: IProducts) => {
      const isInWL = this.isProductExiestInWL(WishListArray, product);
      return { ...product, inWishList: isInWL };
    });
  }

  isProductExiestInWL(WLProducts: IProducts[], product: IProducts): boolean {
    return WLProducts?.some(wl => wl.id === product.id);
  }

}
