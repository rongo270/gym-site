import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../Environments/myEnvironments';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private Name$ = new BehaviorSubject<string>("");
  private admin$ = new BehaviorSubject<boolean>(false);
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  public getRoleFromStore() {//dont really need this
    return this.admin$.asObservable();
  }
  public getFullNameFromString() {//and this
    return this.Name$.asObservable();
  }

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.baseApiUrl + "/api/Users");
  }

  getUser(id: string): Observable<user> {
    return this.http.get<user>(this.baseApiUrl + '/api/Users/' + id);
  }

  updateUser(id: string, userDetails: user): Observable<user> {//return ok respons
    return this.http.put<user>(this.baseApiUrl + '/api/Users/' + id, userDetails);
  }

  deleteUser(id: string): Observable<user> {//return ok respons
    return this.http.delete<user>(this.baseApiUrl + '/api/Users/' + id)
  }

}

