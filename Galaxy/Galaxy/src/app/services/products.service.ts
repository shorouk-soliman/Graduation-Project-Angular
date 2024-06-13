import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';

@Injectable()
export class ProductsService {

constructor(private general:GeneralService,private cartService:CartService,private wishlistService:WishlistService) { }
private productsDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


FetchGeneralProducts(page:number,limit:number,sort:string,categoryId:any,brandId:any): void{
    const getProductGeneralURL:string =
     `${this.general.API}Product/GetGeneralPagination?page=${page}&limit=${limit}&sort=${sort}&categoryId=${categoryId}&brandId=${brandId}`;

     this.general.http.get(getProductGeneralURL).subscribe((products:any)=>{
      this.cartService.GetCart().subscribe((cart:any)=>{
        this.wishlistService.GetWishList().subscribe((wishlistproducts:any)=>{
               
          products.products = this.ChangeProductsInCart(products,cart)
          products.products = this.ChangeProductsInWishList(products,wishlistproducts)

        this.productsDataSubject.next(products);
        })
      })
    });
  }
  
  GetProducts():Observable<any>{
    return this.productsDataSubject.asObservable();
  }

  isProductExiestInCart(cartProducts:any[],item:any):boolean{
    return cartProducts.some(cp => cp.productId === item.id);
  }
  
  isProductExiestInWL(WLProducts:any[],item:any):boolean{
    return WLProducts.some(wl => wl.id === item.id);
  }

  ChangeProductsInCart(productsArray: any, cartArray: any[]): any[] {
    return productsArray?.products.map((product:any) => {
      const isInCart = this.isProductExiestInCart(cartArray, product);
      return { ...product, incart: isInCart };
    });
  }
  

  ChangeProductsInWishList(productsArray: any, WishListArray: any[]): any[] {
    return productsArray?.products.map((product:any) => {
      const isInWL = this.isProductExiestInWL(WishListArray, product);
      return { ...product, inwl: isInWL };
    });
  }

}
