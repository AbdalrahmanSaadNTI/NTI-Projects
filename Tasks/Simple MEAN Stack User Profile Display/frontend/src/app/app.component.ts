import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>User Profiles</h1>
    <app-user-list></app-user-list>
  `
})
export class AppComponent {
  title = 'User Profiles';
}

