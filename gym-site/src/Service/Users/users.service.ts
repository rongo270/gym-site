import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/myEnvironments'
import { Observable,of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from '../../models/Credetials.model';
import { user } from '../../models/user.model';
import { Router } from '@angular/router';
//import jwt_decode from 'jwt-decode';
import jwt_decode, { JwtPayload } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userPayload: any;
  LogStatus: boolean = false;//diffult
  baseApiUrl: string = environment.baseApiUrl;//get Url Api
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  get token(): any {//accses aauthentiction
    return localStorage.getItem('jwt');
  }
  PostLogin(credentials: Credentials): Observable<Credentials> {//after log in return the credentials
    return this.http.post<Credentials>(this.baseApiUrl + "/api/Users/Login/", credentials, { responseType: 'json' });
  }

  LogOut() {
    localStorage.removeItem('jwt');
    localStorage.clear;// Remove the JWT token from storage
    this.LogStatus = false; // Update the LoggedIn flag
      this.router.navigate(['/log-In']);
  }

  IsUserAuthenticated() {
    const token = localStorage.getItem('jwt');//store the token found

    if (token && !this.jwtHelper.isTokenExpired(token)) {//if token !=null and not expired
      this.LogStatus = true//log is true
      return this.LogStatus;//true
    }
    this.LogStatus = false;//log is false
    return this.LogStatus;//false
  }

  addUser(addUserRequest: user): Observable<user> {//return ok
    return this.http.post<user>(this.baseApiUrl + '/api/Users/Register', addUserRequest);
  }


  getall(): Observable<Credentials> {
    const token = localStorage.getItem('jwt');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const options = {
      headers: new HttpHeaders(headers) // Use HttpHeaders object to set headers
    };

    return this.http.get<Credentials>(this.baseApiUrl + "/api/Users/GetAll", options);
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.token;
    return jwtHelper.decodeToken(token);
  }
  getFullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.unique_name;
  }
  getIdfromToken() {
    if (this.userPayload)
      return this.userPayload.nameid;
  }
  getRole() {
    if (this.userPayload)
      return this.userPayload.admin === 'True';
    return false;
  }

}
