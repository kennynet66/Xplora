import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booked-tours',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './booked-tours.component.html',
  styleUrl: './booked-tours.component.css'
})
export class BookedToursComponent {

  tours: any[] = []

  errorDiv = false;
  errorMsg!:string;

  constructor(private dataservice: DataService){
    this.getBookedTours()
  }

  errors(msg: string){
    this.errorDiv = true;
    this.errorMsg = msg
  }

  getBookedTours(){
    this.dataservice.checkDetails().subscribe(res =>{
      if(res.decodedToken.details){
        this.dataservice.getBookedTours(res.decodedToken.details.id).subscribe(res =>{
          if(res.error){
            this.errors(res.error)
          } else if (res.success){
            this.tours = res.success
          }
        })
      }
    })
  }
}
