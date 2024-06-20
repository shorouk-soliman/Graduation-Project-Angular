import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../Models/Product/products-model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private generic: GenericService) { }

  private WishListSubject: BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([]);

  GetwishListCount(): number {
    let wishlist = this.WishListSubject.getValue();
    return wishlist?.length;
  };


fetchWishList():void{
  if (this.generic.IsLogged()) {

    let Url: string = `WishList/GetWishListProducts`;
    this.generic.getRequest<IProducts[]>(Url).subscribe((WishListProducts: IProducts[]) => {
      this.WishListSubject.next(WishListProducts);
    });
  } else {
    let localwishlist :string = sessionStorage.getItem('local-wishList') ?? '[]';
    this.WishListSubject.next(JSON.parse(localwishlist));
  }

}

  GetWishList(): Observable<IProducts[]> {
    return this.WishListSubject.asObservable();
  };

  AddToWishList(product: IProducts): void {
    let currentWishList = this.WishListSubject.getValue();
    let updatedcart = JSON.parse(JSON.stringify(currentWishList));
    updatedcart?.push(product);

    this.WishListSubject.next(updatedcart);

    if (this.generic.IsLogged()) {
      let AddWishList = `WishList/AddToWishList?productId=${product.id}`;

      this.generic.postRequest(AddWishList, null).subscribe(() => {
        error: () => this.WishListSubject.next(currentWishList);
      });
    } else {
      sessionStorage.setItem('local-wishList', JSON.stringify(this.WishListSubject.getValue()));
    }
  };

  RemoveFromWishList(Product: IProducts): void {
    let oldValue = this.WishListSubject.getValue();
    let updated = JSON.parse(JSON.stringify(oldValue));

    updated = updated.filter((item: IProducts) => +item.id !== +Product.id);
    this.WishListSubject.next(updated);

    if (this.generic.IsLogged()) {
      let RemoveFromWLURL = `WishList/RemoveFromWishList?productId=${Product.id}`;
      this.generic.deleteRequest(RemoveFromWLURL).subscribe(() => {
       error:()=> this.WishListSubject.next(oldValue);
      });
    } else {
      sessionStorage.setItem('local-wishList', JSON.stringify(this.WishListSubject.getValue()))
    }
  };

};