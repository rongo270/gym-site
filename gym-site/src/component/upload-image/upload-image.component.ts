import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../Service/products/products.service';
import {  HttpClient, HttpEventType, HttpErrorResponse}from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  @Input() productName: string = '';
  constructor(private http: HttpClient, private productService: ProductsService, private router: Router) { }
  ngOnInit() { }


  uploadFile = (files: any, name: string) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name + '.jpg');

    this.productService.PostImage(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.router.navigate(['products-admin']);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  };
}
