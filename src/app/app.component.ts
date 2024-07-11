// app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageListComponent } from './image-list/image-list.component';
import { Image } from './models/image';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // Reference child component
  imageListComponent!: ImageListComponent;

  constructor() {}

  ngOnInit() {
  }

  openNav(): void {
    const mySidebarElement = document.getElementById('mySidebar');
    const mainElement = document.getElementById('main');

    if (mySidebarElement && mainElement) {
      mySidebarElement.classList.toggle('sideBarExpanded');
      mySidebarElement.classList.toggle('sideBarCollapsed');
      mainElement.classList.toggle('sideBarExpanded');
      mainElement.classList.toggle('sideBarCollapsed');
    }
  }
  title = 'Azure Image(s)';
  //images:Image = [];

  // images:Image = [
  //   { name: 'Image1', url: 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4', date: '2022-01-01' },
  //   { name: 'Image2', url: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', date: '2022-02-01' },
  //   { name: 'Image3', url: 'https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o', date: '2022-03-01' },
  // ]

  // images: Image[] = [
  //   {
  //     url: 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
  //     name: 'Image 1',
  //     description: 'Description for image 1',
  //     date: '2023-11-01T12:00:00Z',
  //   },
  //   {
  //     url: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
  //     name: 'Image 2',
  //     description: 'Description for image 2',
  //     date: '2023-18-02T12:00:00Z',
  //   },
  //   {
  //     url: 'https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o',
  //     name: 'Image 2',
  //     description: 'Description for image 2',
  //     date: '2023-12-02T12:00:00Z',
  //   },
  //   // Add more images as needed
  // ];
}
