// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../../models/product.model';
import { environment } from 'src/Environments/myEnvironments'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ProductsService } from '../products/products.service';
import { Router } from '@angular/router';
import { UsersService } from '../Users/users.service';
import { CartItem } from '../../models/CartItem.model';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: product[] = [];
  private cartItemsSubject = new BehaviorSubject<product[]>([]);
  baseApiUrl: string = environment.baseApiUrl
  constructor(private productsService: ProductsService,
    private router: Router,
    private userService: UsersService,
    private http: HttpClient
  ) {
    // Initialize the cart from local storage if available
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  getCartItems(): BehaviorSubject<product[]> {
    return this.cartItemsSubject;
  }

  getCartItemsUser(id: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseApiUrl + "/api/Cart/" + id);
  }

  addToCartUser(cartItem: CartItem): Observable<string> {
    return this.http.post<string>(this.baseApiUrl + '/api/Cart/add-to-cart', cartItem);
  }


  addToCart(product: product): void {
      this.cartItems.push(product);
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
  }

  removeFromCart(productId: string): void {
    let itemRemoved = false;

    this.cartItems = this.cartItems.filter((item) => {
      if (!itemRemoved && item.id === productId) {
        itemRemoved = true; // Set the flag to true
        return false; // Remove the first item with the matching id
      }
      return true; // Keep all other items
    });
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  removeFromCartUser(cartitem: CartItem): Observable<string> {
    return this.http.post<string>(this.baseApiUrl + "/api/Cart/Remove-to-cart/", cartitem);
  }


  ClearCartUser(userId: string): Observable<string>{
    return this.http.delete<string>(this.baseApiUrl + "/api/Cart/" + userId);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.clearCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
  }

  private clearCartFromLocalStorage(): void {
    localStorage.removeItem('shoppingCart');
  }

  updateCartInToken(newCartData: product[]): void {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      decodedToken.cart = newCartData;
      localStorage.setItem('jwt_token', JSON.stringify(decodedToken));
    } else {
    }
  }
}
