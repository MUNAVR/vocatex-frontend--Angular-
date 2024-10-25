import { Component } from '@angular/core';
import { DevelopersComponent } from '../developers/developers.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [DevelopersComponent,RouterLink],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.css'
})
export class PortfolioHomeComponent {

}
