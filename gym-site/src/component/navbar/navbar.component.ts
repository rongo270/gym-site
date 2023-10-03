import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserStoreService } from '../../Service/user-store/user-store.service';
import { UsersService } from '../../Service/Users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  admin: boolean = false;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private userStore: UserStoreService
  ) { }
  ngOnInit(): void {
    this.usersService.IsUserAuthenticated();
    this.loggedIn = this.usersService.LogStatus;
    if (this.loggedIn == true) {
      const token = this.usersService.token;
      this.userStore.getRoleFromStore().subscribe(val => {
        let Role = this.usersService.getRole();
        this.admin = val || Role;
        console.log(val || Role);
        console.log(this.loggedIn);
      })
    }
  }

  private setActiveLink() {
    const path = window.location.pathname;
    const link = document.querySelector(`[routerLink="${path}"]`);
    if (link) {
      link.classList.add('active');
    }
  }

}
