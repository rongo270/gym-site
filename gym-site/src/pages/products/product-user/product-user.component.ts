import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/Service/products/products.service'
import { product } from 'src/models/product.model'
import { Router, ActivatedRoute } from '@angular/router'
import { CartService } from '../../../Service/cart/cart.service';
import { UsersService } from '../../../Service/Users/users.service';
import { CartItem } from '../../../models/CartItem.model';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.scss'],
  providers: [ProductsService]
})
export class ProductUserComponent {
  products: product[] = [];
  cartItems: product[] = [];

  constructor(private productsService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private userService: UsersService
  ) { }

  //struct in the start
  addCartRequest: CartItem = {
    CartId: '',
    userId: '',
    ProductId: '',
    Quantity: 1
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe({//get all product int array in put it in products
      next: (products) => {
        console.log(products);
        this.products = products;
        this.loadProductImages();
      },
      error: (respose) =>
        console.log(respose),
    });
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }


  private loadProductImages(): void {
    console.log("loadproduct")
    this.products.forEach((product) => {
      //console.log(product.id);
      this.productsService.GetImage(product.id).subscribe({
        next: (ImageData) => (product.image = URL.createObjectURL(ImageData)),
        error: (error) => console.error(error),
      })
    })
  }
  addToCart(item: product): void {
    if (!this.userService.LogStatus)
    { this.cartService.addToCart(item); }
    else { this.addCartItem(item); }


    item.available = item.available - 1;//available -1
    this.productsService.updateProduct(item.id, item).subscribe({
      next: (product) => {
        this.router.navigate(['products-user']);//routet back to products page
      },
      error: (respose) => {
        console.log(respose);
      }
    })
  }




  addCartItem(item: product) {//add product
    this.addCartRequest.CartId = '00000000-0000-0000-0000-000000000000';//needs a diffult id
    this.addCartRequest.ProductId = item.id;
    this.addCartRequest.userId = <any>this.userService.getIdfromToken();
    this.cartService.addToCartUser(this.addCartRequest).subscribe({
      next: (response) => {//after go to product page
        console.log("Item added to cart successfully");
      },
      error: (error) => {
        console.log("Problem adding to cart: ", error);
      }
    });
  }


}
