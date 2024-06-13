import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';
import { ProductService } from './product.service';
import { GeneralService } from './general.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from './order.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { SubcategoryService } from './subcategory.service';
import { EAVService } from './eav.service';
import { BrandService } from './brand.service';
import { Observable } from 'rxjs';
import { AttributesService } from './attributes.service';
import { ValuesService } from './values.service';
import { GroupService } from './group.service';
import { RatingService } from './rating.service';
import { WishlistService } from './wishlist.service';

@Injectable()
export class UnitService {

    constructor(
        public auth: AuthService,
        public user: UserService,
        public cart: CartService,
        public products: ProductsService,
        public product: ProductService,
        public eav: EAVService,
        public brand: BrandService,
        public order: OrderService,
        public category: CategoryService,
        public subcategory: SubcategoryService,
        public attribute: AttributesService,
        public values: ValuesService,
        public group: GroupService,
        public rate: RatingService,
        public wishlist: WishlistService,
        public general: GeneralService,
        public formbuilder: FormBuilder,
    ) { }

   ConvertImage(form: FormData):Observable<string>{
      let ConvertimageURL = `${this.general.API}Images/ConvertImage`;
      return this.general.http.post<string>(ConvertimageURL,form, { responseType: 'text' as 'json' })
    }

    ConvertListImage(form: FormData): Observable<any> {
        let convertImageURL = `${this.general.API}Images/ConvertListImage`;
        return this.general.http.post(convertImageURL, form);
      }
}
