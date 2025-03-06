import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Import NavbarComponent
import { FooterComponent } from '../footer/footer.component'; // Import FooterComponent

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // Include NavbarComponent and FooterComponent here
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'] // Use 'styleUrls' (plural)
})
export class BlankLayoutComponent { }
