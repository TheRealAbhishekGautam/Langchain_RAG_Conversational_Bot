import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      /* Prevent horizontal scroll bleed while allowing inner content to manage vertical scrolling */
      overflow-x: hidden;
    }
    
    .main-content {
      flex: 1;
      min-height: 0;
      /* Make the main area scrollable (restores scrollbar on Home and other long pages) */
      overflow-y: auto;
    }
  `],
  template: `
    <app-top-bar></app-top-bar>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  // Root app renders per-route layouts/pages
}
