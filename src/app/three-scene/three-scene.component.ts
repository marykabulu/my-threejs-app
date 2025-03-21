// Import required Angular core functionality
import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
// Import Angular Router for navigation between pages
import { Router } from '@angular/router';
// Import Three.js library for 3D rendering
import * as THREE from 'three';
// Import CommonModule for ngIf, ngFor etc. directives
import { CommonModule } from '@angular/common';

@Component({
  // Define the component selector to be used in HTML
  selector: 'app-three-scene',
  // Mark as standalone component (Angular 14+)
  standalone: true,
  // Import needed modules
  imports: [CommonModule],
  // Define the component template with HTML
  template: `
    <!-- Overlay div that sits on top of the 3D canvas -->
    <div class="overlay">
      <!-- Main heading for the CV intro page -->
      <h1 class="heading">Engineering My Future: An Interactive Journey</h1>
      <!-- Container for the button (needed for pointer-events) -->
      <div class="button-container">
        <!-- Button that navigates to CV details when clicked -->
        <button class="cta-button" (click)="navigateToDetails()">Click here to begin</button>
      </div>
    </div>
    <!-- Canvas element that will be used for Three.js rendering -->
    <canvas #threeCanvas></canvas>
  `,
  // CSS styles for the component
  styles: [`
    /* Style for the host element (the component itself) */
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      position: relative;
    }
    /* Style for the canvas element */
    canvas {
      width: 100%;
      height: 100vh;
      display: block;
    }
    /* Style for the overlay div that contains text and button */
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      color: white;
      text-align: center;
      pointer-events: none; /* Allow clicks to pass through to canvas except for elements with pointer-events: auto */
    }
    /* Style for the main heading */
    .heading {
      font-size: 3rem;
      margin-bottom: 2rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow for better visibility on any background */
    }
    /* Style for the button container to enable pointer events */
    .button-container {
      pointer-events: auto; /* Override parent's pointer-events: none to make button clickable */
    }
    /* Style for the call-to-action button */
    .cta-button {
      background-color: #2196F3;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1.2rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for hover effects */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    /* Hover effect for the button */
    .cta-button:hover {
      background-color: #0b7dda;
      transform: translateY(-2px); /* Slight upward movement on hover */
    }
    /* Active state (when being clicked) for the button */
    .cta-button:active {
      transform: translateY(0); /* Return to original position when clicked */
    }
  `]
})
export class ThreeSceneComponent implements AfterViewInit {
  // Reference to the canvas element in the template
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  // Three.js related properties
  private scene!: THREE.Scene;              // Container for all 3D objects
  private camera!: THREE.PerspectiveCamera; // Camera to view the scene
  private renderer!: THREE.WebGLRenderer;   // Renders the scene
  private profileTexture!: THREE.Texture;   // Texture for the profile picture
  private profileMesh!: THREE.Mesh;         // 3D object for the profile picture

  // Constructor with router injection for navigation
  constructor(private router: Router) {}

  // Lifecycle hook that runs after the view is initialized
  ngAfterViewInit(): void {
    this.initThree();    // Initialize Three.js setup
    this.createScene();  // Create the 3D scene and objects
    this.animate();      // Start the animation loop
  }

  // Listen for window resize events to adjust the canvas
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    // Update camera aspect ratio based on new window dimensions
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // Resize the renderer to match new window dimensions
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Method to navigate to the CV details page
  navigateToDetails() {
    this.router.navigate(['/details']);
  }

  // Initialize Three.js setup
  private initThree(): void {
    // Get the canvas element from the template
    const canvas = this.canvasRef.nativeElement;
    
    // Create a new 3D scene
    this.scene = new THREE.Scene();
    // Set a dark background color for the scene
    this.scene.background = new THREE.Color(0x121212);
    
    // Create a perspective camera
    this.camera = new THREE.PerspectiveCamera(
      75,                                     // Field of view (degrees)
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1,                                    // Near clipping plane
      1000                                    // Far clipping plane
    );
    // Position the camera on the z-axis (away from origin)
    this.camera.position.z = 5;
    
    // Create a WebGL renderer with the canvas element
    this.renderer = new THREE.WebGLRenderer({ 
      canvas,         // Use our canvas element
      antialias: true // Enable antialiasing for smoother edges
    });
    // Set renderer size to match window dimensions
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Set pixel ratio for better display on high-DPI screens
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  // Create the 3D scene and objects
  private createScene(): void {
    // Add ambient light to illuminate the scene evenly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Add directional light for more defined shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 5); // Position the light
    this.scene.add(directionalLight);

    // Create a circular geometry for the profile picture
    const profileGeometry = new THREE.CircleGeometry(4,132,1.5, 32); // Radius and segments
    // Create material for the profile - initially a blue placeholder
    const profileMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2196F3,       // Blue color
      side: THREE.DoubleSide // Visible from both sides
    });
    
    // Create the mesh (geometry + material) for the profile
    this.profileMesh = new THREE.Mesh(profileGeometry, profileMaterial);
    // Add the profile mesh to the scene
    this.scene.add(this.profileMesh);
    
    // Load the actual profile image
    const textureLoader = new THREE.TextureLoader();
    // Load the image from the assets folder
    textureLoader.load('assets/profile.jpg', 
      // Success callback
      (texture) => {
        this.profileTexture = texture;
        profileMaterial.map = this.profileTexture; // Assign texture to material
        profileMaterial.color.set(0xffffff);       // Reset color to white to show texture properly
        profileMaterial.needsUpdate = true;        // Update the material
      }, 
      // Progress callback (unused)
      undefined, 
      // Error callback
      (err) => {
        console.error('Error loading profile texture', err);
      }
    );
    
    // Add particles for a more dynamic background
    this.addBackgroundParticles();
  }
  
  // Add background particles for visual effect
  private addBackgroundParticles(): void {
    // Create a buffer geometry for the particles
    const particlesGeometry = new THREE.BufferGeometry();
    // Number of particles to create
    const particlesCount = 1000;
    
    // Create a Float32Array to hold the 3D positions (x,y,z) for each particle
    const posArray = new Float32Array(particlesCount * 3);
    
    // Randomly position each particle in space
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20; // Random position in range [-10, 10]
    }
    
    // Add the position attribute to the geometry
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material for the particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,     // Size of each particle
      color: 0xffffff // White color
    });
    
    // Create the particle system (geometry + material)
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    // Add particles to the scene
    this.scene.add(particlesMesh);
  }

  // Animation loop
  private animate(): void {
    // Request the next animation frame
    requestAnimationFrame(() => this.animate());
    
    // Rotate the profile picture slowly if it exists
    if (this.profileMesh) {
      this.profileMesh.rotation.y += 0.003; // Small increment for gentle rotation
    }
    
    // Render the scene from the camera's perspective
    this.renderer.render(this.scene, this.camera);
  }
}