import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ NavbarComponent, FormsModule, CommonModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  title = "Kenedy Maina"
  imgSrc = "https://images.pexels.com/photos/20135107/pexels-photo-20135107/free-photo-of-mueller-hut-adventure.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"

  name:string="user"

}
