import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-tour.component.html',
  styleUrl: './new-tour.component.css'
})
export class NewTourComponent {
  tourForm!: FormGroup

  constructor(private fb: FormBuilder){
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
      console.log(this.tourForm.value);
      
    } else {
      alert("Please fill all the fields")
    }
  }
}
