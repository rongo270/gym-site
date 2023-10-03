import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../../models/user.model';
import { UsersService } from '../../Service/Users/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [UsersService]

})
export class SignInComponent implements OnInit {

  //struct
  addUserRequest: user = {
    id: '',
    email: '',
    password: '',
    name: '',
    lastName:'',
    admin: false
  }
  constructor(private userService: UsersService, private router: Router) { }


  ngOnInit(): void { }

  addUser() {//add user
    this.addUserRequest.id = '00000000-0000-0000-0000-000000000000';//diffalt id
    this.userService.addUser(this.addUserRequest).subscribe({//add user by server
      next: (user) => {
        this.router.navigate(['log-In']);//route to log in
      },
      error: (respose) => {
        console.log(respose)
      }
    })
  }
}
