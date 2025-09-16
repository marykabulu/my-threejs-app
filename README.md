# My Three.js Portfolio App

An interactive Angular portfolio application featuring 3D animations with Three.js, showcasing professional experience and skills through an immersive web experience.

## Features

- **3D Interactive Landing Page**: Animated profile picture with Three.js floating effects
- **Professional CV Details**: Comprehensive display of skills, experience, and education
- **Interactive Work Experience**: Clickable work experience links with detailed role descriptions
- **Reference Request System**: Integrated form with AWS backend for reference requests
- **Dynamic Content Switching**: Seamless navigation between about me and work experience details
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Built with Angular Material components

## Tech Stack

- **Frontend**: Angular 17.3, TypeScript, Three.js
- **UI Framework**: Angular Material
- **3D Graphics**: Three.js for WebGL rendering
- **Backend**: AWS API Gateway (for reference requests)
- **Styling**: CSS3 with custom animations

## Project Structure

```
src/
├── app/
│   ├── three-scene/          # 3D landing page component
│   ├── cv-details/           # CV details and reference form
│   ├── app.component.ts      # Root component with routing
│   └── app.routes.ts         # Application routing
├── assets/
│   ├── icons/               # Technology and tool icons
│   └── profile.jpg          # Profile picture for 3D scene
└── environments/            # Environment configurations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-threejs-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng build --watch` - Build with file watching

## Key Components

### Three Scene Component
- Interactive 3D profile picture with floating animation
- WebGL rendering with optimized performance
- Responsive canvas that adapts to window resizing

### CV Details Component
- Expandable sections for technologies, tools, education, and work experience
- Interactive work experience links with detailed job descriptions
- Dynamic content switching between about me and work experience details
- Interactive reference request form with validation
- Integration with AWS backend services for reference requests
- Comprehensive display of professional background and achievements

## Dependencies

### Core Dependencies
- Angular 17.3 with Material Design
- Three.js for 3D graphics
- RxJS for reactive programming

### Development Dependencies
- TypeScript 5.4
- Jasmine & Karma for testing
- Angular CLI for development tools

## Deployment

The application is configured for deployment on Vercel with optimized build settings for production.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

WebGL support required for 3D features.

## License

This project is private and not licensed for public use.
