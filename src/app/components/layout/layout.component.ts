import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent, 
    SideNavBarComponent, 
    FooterComponent, 
    RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
