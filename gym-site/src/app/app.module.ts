import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { AddProductComponent } from '../pages/products/add-product/add-product.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductAdminComponent } from '../pages/products/product-admin/product-admin.component';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from '../pages/products/edit-product/edit-product.component';
import { UploadImageComponent } from '../component/upload-image/upload-image.component';
import { environment } from '../Environments/myEnvironments';
import { LoginFormComponent } from '../component/login-form/login-form.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { LogInLineComponent } from '../component/log-in-line/log-in-line.component';
import { SafeResourceUrlPipe } from '../Pipes/safe-resource-url.pipe';
import { StarterProductsComponent } from '../component/starter-products/starter-products.component';
import { ShoppingCartComponent } from '../component/cart/shopping-cart/shopping-cart.component';
import { CartService } from 'src/Service/cart/cart.service';
import { ProductUserComponent } from '../pages/products/product-user/product-user.component';
import { CheckoutComponent } from '../pages/order/checkout/checkout.component';
import { UsersAdminComponent } from '../pages/users-admin/users-admin/users-admin.component';
import { EditUserComponent } from '../pages/users-admin/edit-user/edit-user.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    ContactComponent,
    AboutComponent,
    AddProductComponent,
    ProductAdminComponent,
    ProductUserComponent,
    EditProductComponent,
    UploadImageComponent,
    LoginFormComponent,
    SignInComponent,
    LogInLineComponent,
    SafeResourceUrlPipe,
    StarterProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    UsersAdminComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseApiUrl],
        disallowedRoutes: []
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
