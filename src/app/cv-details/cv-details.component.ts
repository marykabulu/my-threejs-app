import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrls: ['./cv-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class CvDetailsComponent {
  // Object to track visibility of dropdown sections
  sections = {
    technologies: false,
    tools: false,
    education: false,
    references: false
  };

  constructor(private router: Router) {}

  // List of technologies
  technologies = [
    'C++', 'Java', 'Angular', 'Jupyter Notebook', 'CSS', 'SQL', 'HTML', 'Python',
    'JDBC', 'Three.js', 'JavaScript', 'TypeScript'
  ];

  // List of tools
  tools = [
    'CodeBlocks', 'IntelliJ', 'VS Code', 'Qt Creator', 'Qt Designer', 'SQLite',
    'SQL Plus', 'Vite', 'Eclipse', 'PostgreSQL', 'MySQL'
  ];

  // List of education details
  education = [
    'Kensington Secondary School [2011]',
    'BSc in Computing - UNISA [2020-2024]'
  ];

  // References section
  references = ['Available upon request'];

  /**
   * Toggles the visibility of the specified section
   * @param section - The section to toggle (technologies, tools, education, references)
   */
  toggleSection(section: keyof typeof this.sections): void {
    this.sections[section] = !this.sections[section];
  }

  returnToStartPage(): void {
    this.router.navigate(['/']); // Navigate to the root route
  }

}
