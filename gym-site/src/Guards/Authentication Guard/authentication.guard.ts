import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../../Service/Users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate{
  constructor(private router: Router, private jwtHelper: JwtHelperService, private userService: UsersService) { }
  canActivate() {
    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['log-in']);
    return false;
  }
}
