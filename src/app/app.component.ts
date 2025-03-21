// Import Angular core functionality
import { Component } from '@angular/core';
// Import Router functionality for navigation
import { RouterOutlet } from '@angular/router';

@Component({
  // Define the component selector (used in index.html)
  selector: 'app-root',
  // Mark as standalone component (Angular 14+)
  standalone: true,
  // Import RouterOutlet to enable router navigation
  imports: [RouterOutlet],
  // Use router-outlet to display the active component based on current route
  template: '<router-outlet></router-outlet>',
  // Import CSS styles (empty in this case but kept for consistency)
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Application title
  title = 'my-threejs-app';
  
  // This component is now just a shell that hosts the router outlet
  // All content is displayed through the router based on the current URL
}