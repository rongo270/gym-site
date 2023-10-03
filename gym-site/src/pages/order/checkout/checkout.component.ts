import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/CartItem.model';
import { product } from '../../../models/product.model';
import { CartService } from '../../../Service/cart/cart.service';
import { OrderService } from '../../../Service/order/order.service';
import { ProductsService } from '../../../Service/products/products.service';
import { UsersService } from '../../../Service/Users/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: product[] = [];
  UserItems: CartItem[] = [];
  totlePrice: number = 0;
  complete: boolean = false;
  completeAll: boolean = false;


  constructor(private cartService: CartService,
    private http: HttpClient,
    private productService: ProductsService,
    private userService: UsersService,
    private router: Router,
    private OrderService: OrderService
  ) { }


  ngOnInit(): void {
    this.completeAll = false;
    this.complete = false;
    const userId = this.userService.getIdfromToken();
    this.cartService.getCartItemsUser(userId).subscribe(item => {//again get cart ids
      console.log("Response:", item); // Log the  response
      this.UserItems = item;
      console.log(this.UserItems);
      this.productService.GetCartItem(this.UserItems).subscribe(items => {//print products
        this.cartItems = items
      });
    });
    this.OrderService.getPrice(userId).subscribe(price => {//get the total price
      this.totlePrice = price;
      console.log(price);
    })
    }
  resetcart(): void {
    this.complete = true;
  }

  completePayment() {
    this.complete = false;
    this.completeAll = true;
  }
}
