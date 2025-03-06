import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Import Navbar
import { FooterComponent } from '../footer/footer.component'; // Import Footer

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // Add Navbar and Footer here
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'] // Use 'styleUrls' instead of 'styleUrl'
})
export class AuthLayoutComponent { }
