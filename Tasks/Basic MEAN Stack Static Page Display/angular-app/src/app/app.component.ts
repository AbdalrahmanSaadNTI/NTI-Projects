import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN Stack Static Page';
  description = 'Welcome to a simple MEAN stack application displaying static content!';
  
  // Local images from assets folder
  images = [
    {
      url: 'assets/img/image1.jpg',
      alt: 'Image 1',
      title: 'Beautiful Landscape'
    },
    {
      url: 'assets/img/image2.jpg',
      alt: 'Image 2',
      title: 'Modern Design'
    },
    {
      url: 'assets/img/image3.jpg',
      alt: 'Image 3',
      title: 'Creative Artwork'
    }
  ];
}

