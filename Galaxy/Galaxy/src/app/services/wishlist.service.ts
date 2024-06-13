import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private general: GeneralService) { }

  private WishListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);



GetwishListCount(){
  let wishlist = this.WishListSubject.getValue()
  return wishlist?.length;
}



  GetWishList(): Observable<any> {
    if (this.general.IsLogged()) {

      const cartURL = `${this.general.API}WishList/GetWishListProducts`;
      this.general.http.get<any>(cartURL).subscribe((WLproducts: any) => {
        this.WishListSubject.next(WLproducts);
      },
        error => {
        });
    } else {
      let localwishlist = sessionStorage.getItem('local-wishList') ?? '[]';
      this.WishListSubject.next(JSON.parse(localwishlist));
    }

    return this.WishListSubject.asObservable();
  }




  AddToWishList(item: any): void {

    let currentWishList = this.WishListSubject.getValue();
    let updatedcart = JSON.parse(JSON.stringify(currentWishList));
    updatedcart?.push(item);

    this.WishListSubject.next(updatedcart)

    if (this.general.IsLogged()) {
      let AddWishList = `${this.general.API}WishList/AddToWishList?productId=${item.id}`;

      this.general.http.post(AddWishList, null)
        .subscribe(() => {
        }, error => {
          this.WishListSubject.next(currentWishList);
        });
    } else {
      sessionStorage.setItem('local-wishList', JSON.stringify(this.WishListSubject.getValue()))
    }
  }



  RemoveFromWishList(Product: any): void {

    let oldValue = this.WishListSubject.getValue();
    let updated = JSON.parse(JSON.stringify(oldValue));

    updated = updated.filter((item: any) => item.id !== +Product.id);
    this.WishListSubject.next(updated);

    if (this.general.IsLogged()) {
      let RemoveFromWLURL = `${this.general.API}WishList/RemoveFromWishList?productId=${Product.id}`;
      this.general.http.delete(RemoveFromWLURL).subscribe(() => {
      },
        (error) => {
          this.WishListSubject.next(oldValue);
        });
    } else {
      sessionStorage.setItem('local-wishList', JSON.stringify(this.WishListSubject.getValue()))
    }
  }


}
