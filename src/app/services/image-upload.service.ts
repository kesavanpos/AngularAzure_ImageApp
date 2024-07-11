import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '../models/image';  // Ensure you have the correct Model import.

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private images: Image[] = [];

  uploadImage(file: File): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;
        // this.images.push({
        //   name: file.name,
        //   url: imageUrl,
        //   description: 'Sample description',
        //   date: new Date().toDateString()
        // });
        console.log('Images after upload:', this.images);  // Ensure images array is updated.
        observer.next({ success: true });
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file);
    });
  }

  getImages(): Observable<Image[]> {
    console.log('Returning images:', this.images);
    return of(this.images);
  }
}
