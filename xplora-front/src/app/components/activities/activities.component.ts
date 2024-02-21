import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ CommonModule, AdminSidebarComponent, RouterOutlet],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  tours: any[] = []
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
      this.displayTours()
      this.successDiv = false
    }, 2000);
  }

  constructor(private dataservice: DataService, private router: Router){
    this.displayTours()
  }

  displayTours(){
    this.dataservice.getTours().subscribe(res=>{
      console.log(res);
      if(res.tours) {
        this.tours = res.tours
      }
    })
  }

  deleteTour(id: string){
    this.dataservice.deleteTour(id).subscribe(res =>{
      if(res.success){
      this.success(res.success)
      } else if(res.error) {
      this.errors(res.error)
      }
    })
  }
}
