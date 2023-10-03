import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../../../models/product.model';
import { ProductsService } from '../../../Service/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [ProductsService]

})
export class EditProductComponent {
  //struct when page load
  errorMessage: string = "";
  productDetails: product = {
    id: '',
    image: '',
    name: '',
    price: 0,
    available: 0,
    read: ''
  }
  constructor(private route: ActivatedRoute, private productService: ProductsService, private router: Router) {
    this.route.paramMap.subscribe({//get by route the id
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.productService.getProduct(id).subscribe({//going to the sql line with the id
            next: (response) => {
              this.productDetails = response;//put the ditels in the productDetails
            }
          })
        }
      }
    })
}

  ngOnInIt(): void { }

  updateProduct() {
    this.productService.updateProduct(this.productDetails.id, this.productDetails).subscribe({//go to server and update
      next: (product) => {
        this.router.navigate(['products-admin']);//routet back to products page
      },
      error: (respose) => {
        console.log(respose);
        this.errorMessage = "";
        this.errorMessage = respose.error.message;
        if (respose.error && this.errorMessage == "") this.errorMessage = "Error in the input";
      }
    })
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?'))
    this.productService.deleteProduct(id).subscribe({//go to server and delete
      next: (response) => {
        this.router.navigate(['products-admin']);//back to product
      }
    })
  }
}
