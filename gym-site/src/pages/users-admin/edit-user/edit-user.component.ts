import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../../../models/user.model';
import { UserStoreService } from '../../../Service/user-store/user-store.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userDetails: user = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    admin: false,
    password:'',
  }
  constructor(private route: ActivatedRoute, private UserStoreService: UserStoreService, private router: Router) {
    this.route.paramMap.subscribe({//get by route the id
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.UserStoreService.getUser(id).subscribe({//going to the sql line with the id
            next: (response) => {
              this.userDetails = response;//put the ditels in the productDetails
              console.log(this.userDetails);
            }
          })
        }
      }
    })
}

  ngOnInIt(): void { }
  updateUser() {
    this.UserStoreService.updateUser(this.userDetails.id, this.userDetails).subscribe({//go to server and update
      next: (user) => {
        this.router.navigate(['users-admin']);//routet back to products page
      },
      error: (respose) => {
        console.log(respose)
      }
    })
  }

  deleteProduct(id: string) {
    this.UserStoreService.deleteUser(id).subscribe({//go to server and delete
      next: (response) => {
        this.router.navigate(['users-admin']);//back to product
      }
    })
  }





}
