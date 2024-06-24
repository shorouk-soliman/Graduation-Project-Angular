import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './components/default/layout/layout.component';
import { NavbarComponent } from './components/default/navbar/navbar.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { ProductRatingFormComponent } from './components/default/product/product-rating-form/product-rating-form.component';
import { ProductRatingSectionComponent } from './components/default/product/product-rating-section/product-rating-section.component';
import { ProductViewComponent } from './components/default/product/product-view/product-view.component';
import { MainCartComponent } from './components/default/cart/main-cart/main-cart.component';
import { MainProductComponent } from './components/default/product/main-product/main-product.component';
import { CartItemComponent } from './components/default/cart/cart-item/cart-item.component';
import { CartOrderFormComponent } from './components/default/cart/cart-order-form/cart-order-form.component';
import { ProductItemComponent } from './components/default/product-item/product-item.component';
import { LandingPageComponent } from './components/default/home/landing-page/landing-page.component';
import { RangePipe } from './pipes/range.pipe';
import { SortProductComponent } from './components/default/home/sort-product/sort-product.component';
import { UnitService } from './services/unit.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/auth/login/login.component';
import { SignComponent } from './components/auth/sign/sign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainOrderComponent } from './components/default/order/main-order/main-order.component';
import { OrderItemComponent } from './components/default/order/order-item/order-item.component';
import { PaginationComponent } from './components/default/pagination/pagination.component';
import { MainProfileComponent } from './components/default/user/main-profile/main-profile.component';
import { ProfileViewComponent } from './components/default/user/profile-view/profile-view.component';
import { BrandSliderComponent } from './components/sliders/brand-slider/brand-slider.component';
import { CategorySliderComponent } from './components/sliders/category-slider/category-slider.component';
import { ImageSliderComponent } from './components/sliders/image-slider/image-slider.component';
import { SubcategoryBannerSliderComponent } from './components/sliders/subcategory-banner-slider/subcategory-banner-slider.component';
import { CategoryBannerSliderComponent } from './components/default/category/category-banner-slider/category-banner-slider.component';
import { SubcategorySliderComponent } from './components/default/category/subcategory-slider/subcategory-slider.component';
import { MainCategoryComponent } from './components/default/category/main-category/main-category.component';
import { ProductVersionsComponent } from './components/default/product/product-versions/product-versions.component';
import { MainAdminComponent } from './components/admin/Dashboard/main-admin/main-admin.component';
import { SideAdminComponent } from './components/admin/Dashboard/side-admin/side-admin.component';
import { MainAdminBrandComponent } from './components/admin/brand/main-admin-brand/main-admin-brand.component';
import { AddAdminBrandComponent } from './components/admin/brand/add-admin-brand/add-admin-brand.component';
import { UpdateAdminBrandComponent } from './components/admin/brand/update-admin-brand/update-admin-brand.component';
import { AddCategoryAdminComponent } from './components/admin/category/add-category-admin/add-category-admin.component';
import { UpdateCategoryAdminComponent } from './components/admin/category/update-category-admin/update-category-admin.component';
import { MainCategoryAdminComponent } from './components/admin/category/main-category-admin/main-category-admin.component';
import { MainAdminSubcategoryComponent } from './components/admin/subcategory/main-admin-subcategory/main-admin-subcategory.component';
import { AddAdminSubcategoryComponent } from './components/admin/subcategory/add-admin-subcategory/add-admin-subcategory.component';
import { UpdateAdminSubcategoryComponent } from './components/admin/subcategory/update-admin-subcategory/update-admin-subcategory.component';
import { MainAdminGroupComponent } from './components/admin/Varian-Group/main-admin-group/main-admin-group.component';
import { AddAdminGroupComponent } from './components/admin/Varian-Group/add-admin-group/add-admin-group.component';
import { AddAdminAttributeComponent } from './components/admin/attributes/add-admin-attribute/add-admin-attribute.component';
import { MainAdminAttributeComponent } from './components/admin/attributes/main-admin-attribute/main-admin-attribute.component';
import { MainAdminValuesComponent } from './components/admin/values/main-admin-values/main-admin-values.component';
import { AddAdminValuesComponent } from './components/admin/values/add-admin-values/add-admin-values.component';
import { AddAdminProductSimpleComponent } from './components/admin/product/add-admin-product-simple/add-admin-product-simple.component';
import { AddAdminProductVarComponent } from './components/admin/product/add-admin-product-var/add-admin-product-var.component';
import { MainAdminProductComponent } from './components/admin/product/main-admin-product/main-admin-product.component';
import { AddCagtegoryBannerAdminComponent } from './components/admin/category/add-cagtegory-banner-admin/add-cagtegory-banner-admin.component';
import { AddSubcagtegoryBannerAdminComponent } from './components/admin/subcategory/add-subcagtegory-banner-admin/add-subcagtegory-banner-admin.component';
import { MainAuthComponent } from './components/auth/main-auth/main-auth.component';
import { StarsComponent } from './components/Helpers/stars/stars.component';
import { ProductPriceComponent } from './components/default/product/product-price/product-price.component';
import { UserSettingsComponent } from './components/default/user/user-settings/user-settings.component';
import { SuccessPaymentComponent } from './components/payment/success-payment/success-payment.component';
import { FailedPaymentComponent } from './components/payment/failed-payment/failed-payment.component';
import { UserPasswordSettingsComponent } from './components/default/user/user-password-settings/user-password-settings.component';
import { MainWishlistComponent } from './components/wishlist/main-wishlist/main-wishlist.component';
import { MainSearchComponent } from './components/search/main-search/main-search.component';
import { MainSubcategoryComponent } from './components/default/subcategory/main-subcategory/main-subcategory.component';
import { SubcategoryProductsBannerSliderComponent } from './components/default/subcategory/subcategory-products-banner-slider/subcategory-products-banner-slider.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor';
import { GenericService } from './services/generic.service';
import { ProductService } from './services/product.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { CategoriesSubsCardsComponent } from './components/default/home/categories-subs-cards/categories-subs-cards.component';
import { ConfirmComponent } from './components/Helpers/confirm/confirm.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
<<<<<<< HEAD
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmMessageComponent } from './components/shared-componentes/confirm-message/confirm-message.component';
>>>>>>> 7a963aaaa807d5a4ce0d3d305860e0338aa29c23
// import { ErrorInterceptorService } from './interceptors/error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainCategoryComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    ProductRatingFormComponent,
    ProductRatingSectionComponent,
    ProductViewComponent,
    MainCartComponent,
    MainProductComponent,
    CartItemComponent,
    CartOrderFormComponent,
    ProductItemComponent,
    LandingPageComponent,
    RangePipe,
    SortProductComponent,
    LoginComponent,
    SignComponent,
    MainOrderComponent,
    OrderItemComponent,
    PaginationComponent,
    MainProfileComponent,
    ProfileViewComponent,
    BrandSliderComponent,
    CategorySliderComponent,
    ImageSliderComponent,
    SubcategorySliderComponent,
    SubcategoryBannerSliderComponent,
    CategoryBannerSliderComponent,
    ProductVersionsComponent,
    MainAdminComponent,
    SideAdminComponent,
    MainAdminBrandComponent,
    AddAdminBrandComponent,
    UpdateAdminBrandComponent,
    MainCategoryAdminComponent,
    AddCategoryAdminComponent,
    UpdateCategoryAdminComponent,
    MainAdminSubcategoryComponent,
    AddAdminSubcategoryComponent,
    UpdateAdminSubcategoryComponent,
    MainAdminGroupComponent,
    AddAdminGroupComponent,
    AddAdminAttributeComponent,
    MainAdminAttributeComponent,
    MainAdminValuesComponent,
    AddAdminValuesComponent,
    AddAdminProductSimpleComponent,
    AddAdminProductVarComponent,
    MainAdminProductComponent,
    AddCagtegoryBannerAdminComponent,
    AddSubcagtegoryBannerAdminComponent,
    MainAuthComponent,
    StarsComponent,
    ProductPriceComponent,
    UserSettingsComponent,
    SuccessPaymentComponent,
    FailedPaymentComponent,
    UserPasswordSettingsComponent,
    MainWishlistComponent,
    MainSearchComponent,
    MainSubcategoryComponent,
    SubcategoryProductsBannerSliderComponent,
    CategoriesSubsCardsComponent,
    ConfirmComponent,
    ErrorCardComponent,
<<<<<<< HEAD
    AboutComponent,
    ContactUsComponent,
=======
    ConfirmMessageComponent,
>>>>>>> 7a963aaaa807d5a4ce0d3d305860e0338aa29c23
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    UnitService,
    ProductService,
    ProductsService,
    CartService,
    AuthService,
    UserService,
    GenericService,
    AuthInterceptorService,
    HttpClient,
    Location,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
