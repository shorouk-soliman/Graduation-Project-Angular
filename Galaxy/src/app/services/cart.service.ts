import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { ICart } from '../Models/Cart/cart-model';
import { ICartItem, initialCartItem } from '../Models/Cart-Items/Cart-item-model';
import { IAddToCart } from '../Models/Cart-Items/Add-To-Cart-model';
import { IMapperService } from '../Mapper/IMapper/IMapper.service';
import { IUpdateCartItem } from '../Models/Cart-Items/Update-Cart-Item-model';
import { IProducts } from '../Models/Product/products-model';

@Injectable()
export class CartService {

    private cartItemsSubject: BehaviorSubject<ICartItem[]> = new BehaviorSubject<ICartItem[]>([]);

    constructor(
        private generic: GenericService,
        private mapper: IMapperService
    ) { }

    loading: boolean = false;

    FetchCart(): void {
        this.loading = true;
        if (this.generic.IsLogged()) {
            let Url: string = `Cart/GetCart`;

            this.generic.getRequest<ICart>(Url).subscribe((cart: ICart) => {
                this.cartItemsSubject.next(cart.cartitems);
                this.loading = false;
            });
        } else {
            let localCart: ICartItem[] = JSON.parse(localStorage.getItem('local-cart') || '[]');
            this.cartItemsSubject.next(localCart);
            this.loading = false;
        }
    };

    GetCart(): Observable<ICartItem[]> {
        return this.cartItemsSubject.asObservable();
    };

    CreateLocalCart(): void {
        if (localStorage.getItem('local-cart') === null)
            localStorage.setItem('local-cart', '[]')
    };


    /* update quantity in the array and return a deep copy of it */
    private UpdateQtyInArray(cartItems: ICartItem[], productId: number, newQty: number): ICartItem[] {
        let newArray: ICartItem[] = JSON.parse(JSON.stringify(cartItems));

        return newArray.map((cartItem: ICartItem) => {
            if (+cartItem.product.id === +productId)
                return { ...cartItem, cartProductQuantity: +newQty };

            return cartItem;
        });
    }



    UpdateItemQuantity(productId: number, newQty: number): void {

        let oldValue: ICartItem[] = this.cartItemsSubject.getValue();

        /* get the array after updating quantity */
        let newValue: ICartItem[] = this.UpdateQtyInArray(oldValue, productId, newQty);

        /* convert to insert cart item object then update subject with it's value */
        let addToCart: IUpdateCartItem = this.mapper.cart.ToAddToCart(productId, newQty);

        this.cartItemsSubject.next(newValue);

        if (this.generic.IsLogged()) {
            let UpdateQuantityUrl: string = `Cart/UpdateInCart`;
            this.generic.putRequest<IUpdateCartItem>(UpdateQuantityUrl, addToCart).subscribe(() => {
                /* in case of faliture return the old value again to the subject */
                error: () => this.cartItemsSubject.next(oldValue);
            });
        } else {
            /* in case of user is in guest mode local cart will be updated with the new value */
            localStorage.setItem('local-cart', JSON.stringify(newValue))
        }
    }

    AddLocalCart() {
        let localcart = JSON.parse(localStorage.getItem('local-cart') ?? '[]')
        if (localcart?.lenght <= 0) return;

        let AddlocalcartUrl = `Cart/AddToCartLocally`;
        const transformedArray = localcart.map((item: any) => ({
            productId: item.productId,
            cartProductQuantity: item.cartProductQuantity
        }));
        return this.generic.postRequest(AddlocalcartUrl, transformedArray).subscribe(() => {
            this.FetchCart();
        });
    }

    AddToCart(product: IProducts, qty: number): void {
        /* add item to the cart whether if user logged in or not */
        let oldValue: ICartItem[] = this.cartItemsSubject.getValue();

        /* convert to add object */
        let addCartItem: ICartItem = this.mapper.cartItem.ToCartItem(product.id, qty, product);
        
        
        /* make a deep copy array and add the item to it */
        let updatedValue: ICartItem[] = this.AddToArray(oldValue, addCartItem);
        this.cartItemsSubject.next(updatedValue)

        /* if logged add it by api */
        if (this.generic.IsLogged()) {

            let addToCartUrl = `Cart/AddToCart`;
            this.generic.postRequest(addToCartUrl, addCartItem).subscribe(() => {
                error: () => this.cartItemsSubject.next(oldValue);
            });
        } else {
            /* in case of user is in guest mode local cart will be updated with the new value */
            localStorage.setItem('local-cart', JSON.stringify(updatedValue))
        }
    }

    /* return a deep copy of product items array after adding cart item */
    private AddToArray(cartItems: ICartItem[], cartItem: ICartItem): ICartItem[] {
        let updated: ICartItem[] = JSON.parse(JSON.stringify(cartItems));
        updated.push(cartItem);
        return updated;
    }


    RemoveFromCart(ProductId: number): void {

        /* remove the product from the cart whether if user logged in or not */
        let oldValue = this.cartItemsSubject.getValue();
        let updatedcart = JSON.parse(JSON.stringify(oldValue));

        updatedcart = updatedcart.filter((item: any) => item.productId !== +ProductId);
        this.cartItemsSubject.next(updatedcart);

        if (this.generic.IsLogged()) {
            /* if logged remove it by api */
            let RemoveFromcartURL = `Cart/RemoveFromCart?productId=${ProductId}`;
            this.generic.deleteRequest(RemoveFromcartURL).subscribe(() => {
            },
                (error) => {
                    this.cartItemsSubject.next(oldValue);
                });
        } else {
            /* if not logged just update the temp cart in the local storage */
            localStorage.setItem('local-cart', JSON.stringify(this.cartItemsSubject.getValue()))
        }
    }


    clearCart(): void {
        this.loading = true;

        if (this.generic.IsLogged()) {
            let oldValue = this.cartItemsSubject.getValue();
            const clearCartURL = `Cart/ClearCart`;

            this.generic.deleteRequest(clearCartURL).subscribe(() => {
                this.cartItemsSubject.next([]);
                this.loading = false;
            },
                error => {
                    this.cartItemsSubject.next(oldValue);
                    this.loading = false;
                });
        } else {
            localStorage.setItem('local-cart', '[]')
            this.cartItemsSubject.next([]);
            this.loading = false;
        }
    }

}
