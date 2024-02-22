import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-user-tours',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.css'
})
export class UserToursComponent {
  tours: any[] = []
  constructor(private dataservice: DataService, private bookingservice: BookingService) {
    this.displayTours()
  }
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

  displayTours(){
    this.dataservice.getTours().subscribe(res=>{
      
      if(res.tours) {
        this.tours = res.tours
      }
    })
  }
  bookTour(tour_id: string){
    this.dataservice.checkDetails().subscribe(res => {
      if(res.decodedToken){
        this.bookingservice.bookTour(res.decodedToken.details.id, tour_id).subscribe(res => {
          
          if(res.success){
            this.success(res.success)
          } else if (res.error){
            this.errors(res.error)
          }
        })
      } else if (res.error){
        this.errors(res.error)
      }
    })
  }
}
