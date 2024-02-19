import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { user } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  errorMsg!: string;
  successMsg!: string;

  errorDiv = false;
  successDiv = false;
  
  // Error handling
  errors(msg: string) {
    this.errorDiv = true
    this.errorMsg = msg

    setTimeout(() => {
      this.errorDiv = false
    }, 3000);
  }
  // success handling
  success(msg: string) {
    this.successDiv = true
    this.successMsg = msg

    setTimeout(() => {
      this.successDiv = false
    }, 2000);
  }

  users:user[] = [];
  constructor(private dataService: DataService){
  }
  ngOnInit(){
    this.getUsers()
  }
  
  getUsers() {
    this.dataService.getUsers().subscribe(res=>{
      if (res.users){
        this.users = res.users
      }else {
        this.errors("Could not get users please refresh")
      }
      
    })
  }

  deleteUser(id:string){
    this.dataService.deleteUser(id).subscribe(res=>{
      
      if (res.deleted){
        this.getUsers();
        this.success(res.deleted)
      } else {
        this.errors("Error deleting user")
      }
    })
    
  }

  deactivateUser(id:string){
    this.dataService.deactivateUser(id).subscribe(res=>{
      if(res.success){
        this.success(res.success)
      } else {
        this.errors("Could not deactivate the account")
      }
    })
  }
}
