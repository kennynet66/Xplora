import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse, signupResponse } from '../../interfaces/detail.interface';
import { loginDetails } from '../../interfaces/login.interface';
import { newUser } from '../../interfaces/signup.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(userDetails: loginDetails){
    return this.http.post<loginResponse>('http://localhost:3000/user/login', userDetails)
  }

  signupUser(userDetails: newUser) {
    return this.http.post<signupResponse>('http://localhost:3000/user/signup', userDetails)
  }
}
