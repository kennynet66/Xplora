import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { loginDetails } from '../../../interfaces/login.interface';
import { HttpClientModule } from '@angular/common/http';
import { loginResponse } from '../../../interfaces/detail.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, ReactiveFormsModule, FooterComponent, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMsg!: string;
  successMsg!: string;

  errorDiv = false;
  successDiv = false;
  isAdmin!:Boolean
  isLoggedIn!:Boolean

  constructor (private fb:FormBuilder, private router: Router, private authservice: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
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
  success(msg: string, route: string) {
    this.successDiv = true
    this.successMsg = msg

    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([route])
    }, 2000);
  }

   login(userDetails: loginDetails) {
    console.log(userDetails);
    this.authservice.loginUser(userDetails).subscribe(res =>{
      console.log(res);

      if (res.emailerror) {
        return this.errors(res.emailerror)
      } else if (res.pwderr) {
        return this.errors(res.pwderr)
      } else if(res.deactivated) {
        return this.errors(res.deactivated)
      } else if (res.admin) {
        this.isAdmin = true
        localStorage.setItem('token', JSON.stringify(res.token))
        return this.success(res.admin, 'admin-dashboard')
      } else if (res.user){
        localStorage.setItem('token', JSON.stringify(res.token))
        return this.success(res.user, 'user-dashboard');
      } else {
        return
      }
    })
  }
}
