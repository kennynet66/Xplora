import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cancelled',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.css'
})
export class CancelledComponent {
  cancelledTours: any[] = []
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

  constructor(private dataservice: DataService){
    this.getCancelledTours()
  }

  getCancelledTours(){
    this.dataservice.getCancelledTours().subscribe(res =>{
      if(res.tours){
        this.cancelledTours = res.tours
      } else if(res.notours){}
    })

  }
  deleteTour(id: string){
    this.dataservice.deleteTour(id).subscribe(res =>{
      if(res.success){
      this.success(res.success)
      this.getCancelledTours()
      } else if(res.error) {
      this.errors(res.error)
      }
    })
  }

  restoreTour(id:string){
    this.dataservice.restoreTour(id).subscribe(res =>{
      if(res.success){
        this.success(res.success)
        this.getCancelledTours()
      } else if(res.error){
        this.getCancelledTours()
        this.errors(res.error)
      }
    })
  }
}
