import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/Service/cart/cart.service';
import { product } from 'src/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/myEnvironments';
import { ProductsService } from '../../../Service/products/products.service';
import { UsersService } from '../../../Service/Users/users.service';
import { CartItem } from '../../../models/CartItem.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [ProductsService]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: product[] = [];
  UserItems: CartItem[] = [];
  baseApiUrl: string = environment.baseApiUrl;
  loggedIn: boolean = false;
  addCartRequest: CartItem = {
    CartId: '',
    userId: '',
    ProductId: '',
    Quantity: 1
  }

  constructor(private cartService: CartService,
    private http: HttpClient,
    private productService: ProductsService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.userService.LogStatus) {
      this.loggedIn = true;
      const userId = this.userService.getIdfromToken();
      this.cartService.getCartItemsUser(userId).subscribe(item => {//get all cart id of user id
        this.UserItems = item;
        this.productService.GetCartItem(this.UserItems).subscribe(items => {//get all the products form the cart id
          this.cartItems = items
        });
      });

    } else {
      this.cartService.getCartItems().subscribe(items => {//if not log in get the storage
        this.cartItems = items;
      });
    }
  }

  clear() {
    if (this.userService.LogStatus) {//clear
      this.cartService.ClearCartUser(this.userService.getIdfromToken()).subscribe();
      window.location.reload();
      window.location.reload();
    }
    else {
      this.cartItems.forEach(item => {//available problem if clear from storage. so no use
        this.removeFromCart(item.id);
      })
    }
  }

  removeFromCart(productId: string): void {
    this.productService.updateAvailable(productId, 1).subscribe({
      next: (product) => {
        console.log(product);
      },
      error: (respose) => {
        console.log(respose)
      }
    })
    if (this.userService.LogStatus) {//make the cart to remove from data base
      this.addCartRequest.CartId = '00000000-0000-0000-0000-000000000000'
      this.addCartRequest.ProductId = productId;
      this.addCartRequest.userId = this.userService.getIdfromToken();
      this.addCartRequest.Quantity = 1;
      this.cartService.removeFromCartUser(this.addCartRequest).subscribe()
    }
    this.cartService.removeFromCart(productId);
    window.location.reload();
  }

  checkout() {
    if (this.userService.LogStatus)
      this.router.navigate(['checkout']);
    else {
      this.router.navigate(['log-In']);
    }
  }


}
