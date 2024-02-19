import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersResponse } from '../../interfaces/detail.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token:string = JSON.parse(localStorage.getItem('token') as string)

  constructor(private http: HttpClient) { }

  getUsers(){
    
    return this.http.get<usersResponse>('http://localhost:3000/user/users', {
      headers: {
        token: this.token
      }
    })
  }

  deleteUser(id:string){
    return this.http.delete<{deleted: string, error: string}>(`http://localhost:3000/user/delete/${id}`, {
      headers: {
        token: this.token
      }
    })
  }

  deactivateUser(id:string){
    return this.http.put<{success: string, error: string}>(`http://localhost:3000/user/deactivate/${id}`,{
      headers:{
        token: this.token
      }
    })
  }
}
