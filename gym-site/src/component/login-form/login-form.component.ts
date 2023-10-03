import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/Service/Users/users.service';
import { user } from 'src/models/user.model';
import { CartService } from '../../Service/cart/cart.service';
import { product } from '../../models/product.model';
import { of } from 'rxjs';
import { CartItem } from '../../models/CartItem.model';





@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  invalidLogin: boolean = false;
  LoggedIn: boolean = false;
  cartItems: product[] = [];
  myUser: user = {
    id: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    admin: false
  };
  addCartRequest: CartItem = {
    CartId: '00000000-0000-0000-0000-000000000000',
    userId: '',
    ProductId: '',
    Quantity: 1
  }

  // For Local Creds Saving
  constructor(private router: Router, private usersService: UsersService, private cartService: CartService) { }

  ngOnInit(): void {
    this.usersService.IsUserAuthenticated();
    this.LoggedIn = this.usersService.LogStatus;
    if (this.LoggedIn) { this.storagechange() }
  }
  public UserAuthenticated() {
    this.usersService.IsUserAuthenticated();
  }

  async login(form: NgForm) {
    const credentials = {
      email: form.value.email,
      password: form.value.password,
    };

    this.myUser.email = credentials.email;
    this.myUser.password = credentials.password;


    await this.usersService.PostLogin(credentials).subscribe(
      (response) => {
        const token = (<any>response).token;
        localStorage.setItem('jwt', token);//post the token that he got
        this.invalidLogin = false;
        if (this.usersService.IsUserAuthenticated()) {
          this.usersService.LogStatus = true;
          window.location.reload();
        }
      },
      (err) => {
        this.invalidLogin = true;
      }
    );

  }

  storagechange() {   //very important, it take the cart from the storage and put them in the user that log in

    this.addCartRequest.userId = this.usersService.getIdfromToken();
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      items.forEach((item) => {
       this.addCartRequest.ProductId = item.id;
        this.cartService.addToCartUser(this.addCartRequest).subscribe({
          next: (response) => {//after go to product page
            console.log("Item added to cart successfully");
          },
          error: (error) => {
            console.log("Problem adding to cart: ", error);
          }
        });
      });
    });
    this.cartService.clearCart();
  }

}
