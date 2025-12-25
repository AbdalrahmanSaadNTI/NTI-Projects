import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <h2>User List</h2>
      <ul>
        <li *ngFor="let user of users">
          <strong>Name:</strong> {{ user.name }}<br>
          <strong>Email:</strong> {{ user.email }}<br>
          <strong>Bio:</strong> {{ user.bio }}<br>
          <br>
        </li>
      </ul>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: UserProfile[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<UserProfile[]>('http://localhost:3000/api/users')
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}

