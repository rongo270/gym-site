import { Component, OnInit } from '@angular/core';
import { user } from '../../../models/user.model';
import { UserStoreService } from '../../../Service/user-store/user-store.service';
import { UsersService } from '../../../Service/Users/users.service';



@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
  users: user[] = [];
  currentUser: user | null = null;
  constructor(private userService: UsersService, private userStoreService: UserStoreService) { }
  userid: string = this.userService.getIdfromToken();


  ngOnInit(): void {
    this.userStoreService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.userid);
        this.currentUser = this.users.find((u) => u.id === this.userid) || null;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.userStoreService.deleteUser(userId).subscribe({
        next: (response) => {
          alert('Product deleted successfully.');
          window.location.reload(); // refresh the page
        },
      });
    }
  }



}
