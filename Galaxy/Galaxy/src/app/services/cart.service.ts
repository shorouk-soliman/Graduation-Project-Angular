import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable()
export class CartService {

    private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(private general: GeneralService) { }
    loding: boolean = false;

    FetchCart(): void {
        this.loding = true;
        if (this.general.IsLogged()) {
            const getCartURL: string = `${this.general.API}Cart/GetCart`;

            this.general.http.get(getCartURL).subscribe((cart: any) => {
                this.cartSubject.next(cart.products);
                this.loding = false;
            });
        } else {
            const localCart = JSON.parse(localStorage.getItem('local-cart') || '[]');
            this.cartSubject.next(localCart);
            this.loding = false;
        }
    }

    GetCart(): Observable<any> {
        return this.cartSubject.asObservable();
    }

    CreateLocalCart(): void {
        if (localStorage.getItem('local-cart') != null)
            return;
        localStorage.setItem('local-cart', '[]')
    }

    UpdateItemQuantity(productId: number, cartProductQuantity: number): void {

        let oldValue = this.cartSubject.getValue();
        
        let updatedcart = JSON.parse(JSON.stringify(oldValue));
        
        updatedcart = updatedcart.map((item: any) => {
            if (+item.product.id === +productId) {
                return { ...item, cartProductQuantity: +cartProductQuantity };
            }
            return item;
        });

        this.cartSubject.next(updatedcart)

        if (this.general.IsLogged()) {
            const UpdateQuantityURL = `${this.general.API}Cart/UpdateInCart`;
            this.general.http.put(UpdateQuantityURL, { productId, cartProductQuantity })
                .subscribe(() => {

                }, error => {
                    this.cartSubject.next(oldValue);
                });
        }else{
            localStorage.setItem('local-cart',JSON.stringify(updatedcart))
        }
    }

    AddLocalCart(){
        let localcart = JSON.parse(localStorage.getItem('local-cart') ?? '[]')
        if(localcart?.lenght <= 0 ) return;

        let AddlocalcartUrl = `${this.general.API}Cart/AddToCartLocally`;
        const transformedArray = localcart.map((item: any) => ({
            productId: item.productId,
            cartProductQuantity: item.cartProductQuantity
          }));
          console.log('transformedArray',transformedArray)
        return this.general.http.post(AddlocalcartUrl,transformedArray).subscribe(()=>{
            this.FetchCart();
        });
    }

    AddToCart(item: any,newQuantity:number): void {
        /* add item to the cart whether if user logged in or not */
        let currentCartData = this.cartSubject.getValue();
        let updatedcart = JSON.parse(JSON.stringify(currentCartData));
        updatedcart?.push({
            productId: item?.id,
            product: item,
            cartProductQuantity: newQuantity
        });

        this.cartSubject.next(updatedcart)

        if (this.general.IsLogged()) {
            let AddToCartObject = {productId:item.id,cartProductQuantity:newQuantity};

            /* if logged add it by api */
            this.general.http.post(`${this.general.API}Cart/AddToCart`, AddToCartObject)
            .subscribe(() => {
                // this.cartSubject.next(updatedcart)
            },error => {
                this.cartSubject.next(currentCartData);
            });
        } else {
            /* if not logged just update the temp cart in the local storage */
            localStorage.setItem('local-cart', JSON.stringify(this.cartSubject.getValue()))
        }
    }



    RemoveFromCart(ProductId: number): void {

        /* remove the product from the cart whether if user logged in or not */
        let oldValue = this.cartSubject.getValue();
        let updatedcart = JSON.parse(JSON.stringify(oldValue));

        updatedcart = updatedcart.filter((item: any) => item.productId !== +ProductId);
        this.cartSubject.next(updatedcart);

        if (this.general.IsLogged()) {
            /* if logged remove it by api */
            let RemoveFromcartURL = `${this.general.API}Cart/RemoveFromCart?productId=${ProductId}`;
            this.general.http.delete(RemoveFromcartURL).subscribe(() => {
            },
                (error) => {
                    this.cartSubject.next(oldValue);
                });
        } else {
            /* if not logged just update the temp cart in the local storage */
            localStorage.setItem('local-cart', JSON.stringify(this.cartSubject.getValue()))
        }
    }


    clearCart(): void {
        this.loding = true;

        if (this.general.IsLogged()) {
            let oldValue = this.cartSubject.getValue();
            const clearCartURL = `${this.general.API}Cart/ClearCart`;

            this.general.http.delete(clearCartURL).subscribe(() => {
                this.cartSubject.next([]);
                this.loding = false;
            },
                error => {
                    this.cartSubject.next(oldValue);
                    this.loding = false;
                });
        } else {
            localStorage.setItem('local-cart', '[]')
            this.cartSubject.next([]);
            this.loding = false;
        }
    }

}
