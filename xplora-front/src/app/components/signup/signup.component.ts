import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { newUser } from '../../../interfaces/signup.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, ReactiveFormsModule, FooterComponent ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup

  errorDiv = false
  errorMsg!: string

  successDiv = false
  successMsg!: string

  // Error handling
  error(msg:string){
    this.errorDiv = true;
    this.errorMsg = msg;

    setTimeout(() => {
      this.errorDiv = false
    }, 3000);
  }

  // Success handling
  success(msg: string) {
    this.successDiv = true
    this.successMsg = msg

    setTimeout(() => {
      this.successDiv = false
      this.router.navigate(['login'])
    }, 2000);
  }

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService){
    this.signupForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  signupUser(details: newUser){
    console.log(details);

    this.authservice.signupUser(details).subscribe(res=>{
      console.log(res);
      if(res.success) {
        this.success(res.success)
      } else if (res.exists){
        console.log("Is existing",res.exists);

        this.error(res.exists)
      }
    })

  }
}
