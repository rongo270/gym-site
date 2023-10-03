import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/myEnvironments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseApiUrl: string = environment.baseApiUrl;//get Url Api

  constructor(private http: HttpClient) { }

  getPrice(id: string): Observable<number> {
    return this.http.get<number>(this.baseApiUrl + "/api/Order/getPrice/"+id);
  }


}
