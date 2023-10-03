import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { ProductsService } from '../Service/products/products.service';
import { ProductAdminComponent } from '../pages/products/product-admin/product-admin.component';
import { AddProductComponent } from '../pages/products/add-product/add-product.component';
import { EditProductComponent } from '../pages/products/edit-product/edit-product.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { ProductUserComponent } from '../pages/products/product-user/product-user.component';
import { AuthenticationGuard } from '../Guards/Authentication Guard/authentication.guard';
import { CheckoutComponent } from '../pages/order/checkout/checkout.component';
import { UsersAdminComponent } from '../pages/users-admin/users-admin/users-admin.component';
import { EditUserComponent } from '../pages/users-admin/edit-user/edit-user.component';
import { LoginFormComponent } from '../component/login-form/login-form.component';
import { ShoppingCartComponent } from '../component/cart/shopping-cart/shopping-cart.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'products-admin',
    component: ProductAdminComponent, canActivate: [AuthenticationGuard],
  },
  {
    path: 'products-user',
    component: ProductUserComponent
  },
  {
    path: 'home-page',
    component: HomePageComponent
  }
  ,
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'AddProduct',
    component: AddProductComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'products-admin/edit/:id',
    component: EditProductComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'users-admin/edit/:id',
    component: EditUserComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'log-In',
    component: LoginFormComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'users-admin',
    component: UsersAdminComponent, canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
