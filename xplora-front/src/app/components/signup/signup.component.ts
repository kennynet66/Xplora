import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, ReactiveFormsModule, FooterComponent ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup

  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signupUser(details: {full_name:string, email:string}){}
}
