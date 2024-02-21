import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersResponse } from '../../interfaces/detail.interface';

export interface access {
  decodedToken: {
    details: {
      id: string,
      full_name: string,
      email: string,
      profile_img: string,
      isAdmin: boolean
    }
  },
  error: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getToken() {
    const token:string = JSON.parse(localStorage.getItem('token') as string)
    if(token){
      return token
    } else {
      const dummy: string =  "dffdiudhg"
      return dummy
    }
  }

  constructor(private http: HttpClient) { }

  getUsers(){

    return this.http.get<usersResponse>('http://localhost:3000/user/users', {
      headers: {
        token: this.getToken()
      }
    })
  }

  deleteUser(id:string){
    return this.http.delete<{deleted: string, error: string}>(`http://localhost:3000/user/delete/${id}`, {
      headers: {
        token: this.getToken()
      }
    })
  }

  deactivateUser(id:string){
    return this.http.put<{success: string, error: string}>(`http://localhost:3000/user/deactivate/${id}`,{
      headers:{
        token: this.getToken()
      }
    })
  }
  checkDetails(){
    return this.http.get<access>('http://localhost:3000/user/details/user',{
      headers: {
        token: this.getToken()
      }
    })
  }
}

