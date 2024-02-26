import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-tour.component.html',
  styleUrl: './new-tour.component.css'
})
export class NewTourComponent {
  tourForm!: FormGroup

  successMsg!: string
  errorMsg!: string

  errorDiv = false
  successDiv = false

  // Handle errors
  errors(msg: string){
    this.errorDiv = true
    this.errorMsg = msg

    setTimeout(() => {
      this.errorDiv = false
    }, 3000);
  }

  // Handle success messages
  success(msg: string){
    this.successDiv = true
    this.successMsg = msg

    setTimeout(() => {
      this.successDiv = false
    }, 2000);
  }

  constructor(private fb: FormBuilder, private dataservice: DataService){
    this.tourForm = this.fb.group({
      tour_title: ['', [Validators.required]],
      tour_dest: ['', [Validators.required]],
      tour_desc: ['', [Validators.required]],
      tour_img: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
    })
  }

  createTour(){
    if(this.tourForm.valid){
      this.dataservice.createTour(this.tourForm.value).subscribe(res =>{
        if(res.toursuccess){
          this.success(res.toursuccess)
          this.tourForm.reset()
        } else{
          this.errors("There was a problem while creating the tour")
        }
      })
    } else {
      this.errors("Please fill in all the fields")
    }
  }
}
