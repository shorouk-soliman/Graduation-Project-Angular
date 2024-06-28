import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';
import { ProductService } from './product.service';
import { FormBuilder, } from '@angular/forms';
import { OrderService } from './order.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { SubcategoryService } from './subcategory.service';
import { EAVService } from './eav.service';
import { BrandService } from './brand.service';
import { AttributesService } from './attributes.service';
import { ValuesService } from './values.service';
import { GroupService } from './group.service';
import { RatingService } from './rating.service';
import { WishlistService } from './wishlist.service';
import { GenericService } from './generic.service';
import { ImageService } from './image.service';

@Injectable()
export class UnitService {

    constructor(
        public auth: AuthService,
        public user: UserService,
        public cart: CartService,
        public products: ProductsService,
        public product: ProductService,
        public eav: EAVService,
        public image: ImageService,
        public brand: BrandService,
        public order: OrderService,
        public category: CategoryService,
        public subcategory: SubcategoryService,
        public attribute: AttributesService,
        public values: ValuesService,
        public group: GroupService,
        public rate: RatingService,
        public wishlist: WishlistService,
        public generic: GenericService,
        public formbuilder: FormBuilder,
    ) { }

    public isAuthunicated = (): boolean => localStorage.getItem('jwt') !== null;
    public isloading = false;

}
