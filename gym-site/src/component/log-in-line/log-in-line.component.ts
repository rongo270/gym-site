import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/Service/Users/users.service';
import { user } from '../../models/user.model';
import { UserStoreService } from '../../Service/user-store/user-store.service';

@Component({
  selector: 'app-log-in-line',
  templateUrl: './log-in-line.component.html',
  styleUrls: ['./log-in-line.component.scss']
})
export class LogInLineComponent implements OnInit {
  loggedIn: boolean = false;
  name: string = 'guset';


  constructor(private router: Router, private usersService: UsersService, private userStrore: UserStoreService) { }

  logout() {
    this.usersService.LogOut();
    this.name = 'guset'; // Reset the name to guest
    this.loggedIn = false;
  }


  ngOnInit() {
    this.usersService.IsUserAuthenticated();
    this.loggedIn = this.usersService.LogStatus;
    if (this.loggedIn == true) {
      const token = this.usersService.token;
      this.userStrore.getRoleFromStore().subscribe(val => {
        let fullNameFromToken = this.usersService.getFullNameFromToken();
        this.name = val || fullNameFromToken
      })
    }
  }



}
