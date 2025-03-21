// Import Angular Router functionality
import { Routes } from '@angular/router';
// Import the components used in the routes
import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { CvDetailsComponent } from './cv-details/cv-details.component';

// Define the application routes
export const routes: Routes = [
  // Default route - displays the Three.js intro scene
  { path: '', component: ThreeSceneComponent },
  
  // CV details page route
  { path: 'details', component: CvDetailsComponent },
  
  // Wildcard route - redirects any undefined routes to the home page
  { path: '**', redirectTo: '' }
];