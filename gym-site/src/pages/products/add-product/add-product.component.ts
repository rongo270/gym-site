import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductsService } from 'src/Service/products/products.service'
import { product } from '../../../models/product.model';
import { UploadImageComponent } from 'src/component/upload-image/upload-image.component'

@Component({
  selector: 'app-add-product',
  templateUrl:'./add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductsService]
})
export class AddProductComponent implements OnInit {
  errorMessage: string = "";
  uploaded: boolean = false;
  addProductRequest: product = {
    id: '',
    image: '',
    name: '',
    price: 0,
    available: 0,
    read: ''
  }
  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.uploaded = false;
  }

  ShowImageButton: boolean = true;



  addProduct() {//add product
    this.addProductRequest.id = '00000000-0000-0000-0000-000000000000';//needs a diffult id
    this.productService.addProduct(this.addProductRequest).subscribe({
      next: (product) => {//after go to product page
        this.uploaded = true;
      },
      error: (response) => {
        console.log(response);
        this.errorMessage = "";
        this.errorMessage = response.error.message;
        if (response.error && this.errorMessage == "") this.errorMessage = "Error in the input";
      }
    })
  }
  
}
