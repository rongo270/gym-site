import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/Service/products/products.service'
import { product } from 'src/models/product.model'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
  providers: [ProductsService]
})
export class ProductAdminComponent {

  products: product[] = [];
  constructor(private productsService: ProductsService, private router: Router) { }


  ngOnInit() {
    this.productsService.getAllProducts().subscribe({//get all product int array in put it in products
      next: (products) => {
        this.products = products;
        this.loadProductImages();
        console.log(products);
      },
      error: (respose) =>
        console.log(respose),
    });
  }


  private loadProductImages(): void {
    console.log("loadproduct")
    this.products.forEach((product) => {
      console.log(product.id);
      this.productsService.GetImage(product.id).subscribe({
        next: (ImageData) => (product.image = URL.createObjectURL(ImageData)),
        error: (error) => console.error(error),
      })
      console.log(product.image);
    })
  }


  deleteProduct(id: string) {//delete product
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: (response) => {
          alert('Product deleted successfully.');
          window.location.reload(); // refresh the page
        },
      });
    }
  }
}

