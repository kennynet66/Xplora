import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService, access } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = []
  constructor(private dataservice: DataService) {
    this.getUserDetails()
  }

  getUserDetails() {
    this.dataservice.checkDetails().subscribe(res => {
      if (res.decodedToken) {
        this.user = res.decodedToken.details
        console.log(res.decodedToken.details);

      } else {
        console.log("Error");

      }

    })
  }
}

interface user {
    details: {
      id: string,
      full_name: string,
      email: string,
      profile_img: string,
      isAdmin: boolean
    }
}

