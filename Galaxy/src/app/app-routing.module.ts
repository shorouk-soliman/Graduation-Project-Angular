import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCartComponent } from './components/default/cart/main-cart/main-cart.component';
import { LayoutComponent } from './components/default/layout/layout.component';
import { LandingPageComponent } from './components/default/home/landing-page/landing-page.component';
import { MainProductComponent } from './components/default/product/main-product/main-product.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignComponent } from './components/auth/sign/sign.component';
import { MainOrderComponent } from './components/default/order/main-order/main-order.component';
import { MainProfileComponent } from './components/default/user/main-profile/main-profile.component';
import { MainCategoryComponent } from './components/default/category/main-category/main-category.component';
import { MainAdminComponent } from './components/admin/Dashboard/main-admin/main-admin.component';
import { MainAdminBrandComponent } from './components/admin/brand/main-admin-brand/main-admin-brand.component';
import { MainCategoryAdminComponent } from './components/admin/category/main-category-admin/main-category-admin.component';
import { AddAdminBrandComponent } from './components/admin/brand/add-admin-brand/add-admin-brand.component';
import { UpdateAdminBrandComponent } from './components/admin/brand/update-admin-brand/update-admin-brand.component';
import { AddCategoryAdminComponent } from './components/admin/category/add-category-admin/add-category-admin.component';
import { MainAdminSubcategoryComponent } from './components/admin/subcategory/main-admin-subcategory/main-admin-subcategory.component';
import { AddAdminSubcategoryComponent } from './components/admin/subcategory/add-admin-subcategory/add-admin-subcategory.component';
import { MainAdminGroupComponent } from './components/admin/Varian-Group/main-admin-group/main-admin-group.component';
import { AddAdminGroupComponent } from './components/admin/Varian-Group/add-admin-group/add-admin-group.component';
import { MainAdminAttributeComponent } from './components/admin/attributes/main-admin-attribute/main-admin-attribute.component';
import { AddAdminAttributeComponent } from './components/admin/attributes/add-admin-attribute/add-admin-attribute.component';
import { MainAdminValuesComponent } from './components/admin/values/main-admin-values/main-admin-values.component';
import { AddAdminValuesComponent } from './components/admin/values/add-admin-values/add-admin-values.component';
import { MainAdminProductComponent } from './components/admin/product/main-admin-product/main-admin-product.component';
import { AddAdminProductSimpleComponent } from './components/admin/product/add-admin-product-simple/add-admin-product-simple.component';
import { AddAdminProductVarComponent } from './components/admin/product/add-admin-product-var/add-admin-product-var.component';
import { AddCagtegoryBannerAdminComponent } from './components/admin/category/add-cagtegory-banner-admin/add-cagtegory-banner-admin.component';
import { AddSubcagtegoryBannerAdminComponent } from './components/admin/subcategory/add-subcagtegory-banner-admin/add-subcagtegory-banner-admin.component';
import { MainAuthComponent } from './components/auth/main-auth/main-auth.component';
import { UserSettingsComponent } from './components/default/user/user-settings/user-settings.component';
import { SuccessPaymentComponent } from './components/payment/success-payment/success-payment.component';
import { FailedPaymentComponent } from './components/payment/failed-payment/failed-payment.component';
import { MainWishlistComponent } from './components/wishlist/main-wishlist/main-wishlist.component';
import { authGuard } from './guards/auth.guard';
import { MainSubcategoryComponent } from './components/default/subcategory/main-subcategory/main-subcategory.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {UpdateAdminProductVarComponent} from './components/admin/product/update-admin-product-var/update-admin-product-var.component'
import { UpdateCategoryAdminComponent } from './components/admin/category/update-category-admin/update-category-admin.component';
import { UpdateSubcategoryAdminComponent } from './components/admin/subcategory/update-admin-subcategory/update-admin-subcategory.component';
import {MainAdminOrderComponent} from './components/admin/order/main-admin-order/main-admin-order.component'
import { MainAdminUserComponent } from './components/admin/users/main-admin-user/main-admin-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'product/:id', component: MainProductComponent },
      { path: 'category/:id', component: MainCategoryComponent },
      { path: 'subcategory/:id', component: MainSubcategoryComponent },
      { path: 'cart', component: MainCartComponent },
      { path: 'order', component: MainOrderComponent  ,canActivate:[authGuard]},
      { path: 'wishlist', component: MainWishlistComponent },
      { path: 'profile', component: MainProfileComponent ,canActivate:[authGuard]},
      { path: 'settings', component: UserSettingsComponent  ,canActivate:[authGuard]},
      { path: 'payment/success', component: SuccessPaymentComponent  ,canActivate:[authGuard]},
      { path: 'payment/failed', component: FailedPaymentComponent  ,canActivate:[authGuard]},
      { path: 'about', component: AboutComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      // { path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: 'auth', component: MainAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign', component: SignComponent },
    ]
  },
  {
    path:'admin',component:MainAdminComponent  ,canActivate:[authGuard],
    children:[
      { path: 'brand', component: MainAdminBrandComponent },
      { path: 'brand/add', component: AddAdminBrandComponent },
      { path: 'brand/update/:id', component: UpdateAdminBrandComponent },
      { path: 'category', component: MainCategoryAdminComponent },
      { path: 'category/add', component: AddCategoryAdminComponent },
      { path: 'category/update/:id', component: UpdateCategoryAdminComponent },
      { path: 'subcategory/update/:id', component: UpdateSubcategoryAdminComponent },
      { path: 'category/addbanner', component: AddCagtegoryBannerAdminComponent },
      { path: 'subcategory', component: MainAdminSubcategoryComponent },
      { path: 'subcategory/add', component: AddAdminSubcategoryComponent },
      { path: 'subcategory/addbanner', component: AddSubcagtegoryBannerAdminComponent },
      { path: 'group', component: MainAdminGroupComponent },
      { path: 'group/add', component: AddAdminGroupComponent },
      { path: 'attribute', component: MainAdminAttributeComponent },
      { path: 'attribute/add', component: AddAdminAttributeComponent },
      { path: 'values', component: MainAdminValuesComponent },
      { path: 'values/add', component: AddAdminValuesComponent },
      { path: 'product', component: MainAdminProductComponent },
      { path: 'product/add/simple', component: AddAdminProductSimpleComponent },
      { path: 'product/add/var', component: AddAdminProductVarComponent },
      {path: 'product/update/:id', component: UpdateAdminProductVarComponent},
      {path: 'order', component: MainAdminOrderComponent},
      {path: 'users', component: MainAdminUserComponent},
      { path: 'settings', component: UserSettingsComponent  ,canActivate:[authGuard]},

    ]
  }
  ,
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
