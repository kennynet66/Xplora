import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  bookTour(user_id: string, tour_id: string){
    return this.http.post<{success: string, error: string}>(`http://localhost:3000/bookings/book/${user_id}`, {tour_id})
  }
}
