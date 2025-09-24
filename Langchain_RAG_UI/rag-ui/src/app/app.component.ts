import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  template: `
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  // Root app renders per-route layouts/pages
}
