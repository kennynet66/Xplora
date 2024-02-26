import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

// NgPrime components
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ CommonModule, AdminSidebarComponent, ButtonModule, MessagesModule ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  tours: any[] = []
  errorMsg!: string;
  errorMs!: string;
  successMsg!: string;

  checked= false

  errorDiv = false;
  successDiv = false;

  noTours = false

  // Handle no tours
  no_tours(msg:string){
    this.noTours = true

    this.errorMs = msg
  }

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

  constructor(private dataservice: DataService, private router: Router, private message:MessageService){
    this.displayTours()
  }

  displayTours(){
    this.dataservice.getTours().subscribe(res=>{
      if(res.tours) {
        this.tours = res.tours
      } else if (res.error){
        this.no_tours(res.error)
      }
    })
  }

  deleteTour(id: string){
    this.dataservice.deleteTour(id).subscribe(res =>{
      if(res.success){
      this.success(res.success)
      this.displayTours()
      } else if(res.error) {
      this.errors(res.error)
      }
    })
  }
  cancelTour(id: string){
    this.dataservice.cancelTour(id).subscribe(res =>{
      if(res.success){
        this.success(res.success)
        this.displayTours()
      } else if(res.error){
        this.errors(res.error)
      }
    })
  }
}
