import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/Environments/myEnvironments'
import { Injectable } from '@angular/core';
import { product } from "../../models/product.model";
import { CartItem } from "../../models/CartItem.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApiUrl: string = environment.baseApiUrl;

  //baseApiUrl: string = 'https://localhost:7122';
  constructor(private http: HttpClient) { }

  // Gets header and adds the token
  private getHeadersNoType(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });
    return headers;
  }

  private DefaultHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return headers;
  }

  public GetImage(id: string) {
    const headers = this.DefaultHeader();
    return this.http.get(environment.baseApiUrl + '/api/Products/image/' + id, {
      headers,
      responseType: 'blob',
    });
  }


  getAllProducts(): Observable<product[]> {//return array with all product
    return this.http.get<product[]>(this.baseApiUrl + '/api/products');
  }
  addProduct(addProductRequest: product): Observable<product> {//return ok respons
    return this.http.post<product>(this.baseApiUrl + '/api/products', addProductRequest);
  }

  getProduct(id: string): Observable<product> {
    return this.http.get < product>(this.baseApiUrl + '/api/products/' + id);
  }

  updateProduct(id: string, updateProductRequest: product): Observable<product> {//return ok respons
    return this.http.put<product>(this.baseApiUrl + '/api/products/' + id, updateProductRequest);
  }

  deleteProduct(id: string): Observable<product> {//return ok respons
    return this.http.delete<product>(this.baseApiUrl + '/api/products/' + id)
  }


  updateAvailable(id: string, plus: number): Observable<product> {
    return this.http.put<product>(this.baseApiUrl + `/api/products/available/` + id, plus);
  }

  GetCartItem(cartItems: CartItem[]): Observable<product[]> {//post caz it cant get a array if not
    return this.http.post<product[]>(this.baseApiUrl + "/api/Products/GetCartItem/", cartItems);
  }



  public PostImage(formData: FormData): Observable<any> {
    const headers = this.getHeadersNoType();

    return this.http.post(environment.baseApiUrl + '/api/products/Image', formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    });
  }

}
