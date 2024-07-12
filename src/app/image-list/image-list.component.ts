import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Image } from '../models/image';
import { BlobImage } from '../models/blobimage';
import { ImageUploadService } from '../services/image-upload.service';
import { AzureImageUploadService } from '../services/AzureImageUploadService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
//import { saveAs } from 'file-saver'; // Import file-saver for saving files

//import * as Tiff from 'tiff.js';
// Declare the Tiff variable to avoid TypeScript errors
declare var Tiff: any;

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit, AfterViewInit {
  fromDate: Date | null = null;
  toDate: Date | null = null;
  searchText: string = '';
  @ViewChild('tiffCanvas', { static: false })
  tiffCanvasRef!: ElementRef<HTMLCanvasElement>;

  private originalData: Image[] = []; // Store original data

  constructor(
    private azureImageUploadService: AzureImageUploadService,
    private imageUploadService: ImageUploadService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  @Input() set images(images: Image[]) {
    this.originalData = images; // Set original data when input changes
    this.dataSource.data = images;
  }

  dataSource = new MatTableDataSource<Image>();
  displayedColumns: string[] = ['image', 'name', 'date', 'download', 'delete'];

  uploadInProgress: boolean = false;
  selectedFileName: string | null = null;
  fileToUpload: File | null = null;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.loadImages();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.renderTiffImages();
  }

  // Inside your component class
  // downloadImage(image: BlobImage): void {
  //   this.http.get(image.url, { responseType: 'blob' }).subscribe(
  //     (blob: Blob) => {
  //       saveAs(blob, image.name); // Use file-saver to save the blob as a file
  //     },
  //     (error) => {
  //       console.error('Error downloading image', error);
  //       // Handle error (e.g., show a message to the user)
  //     }
  //   );
  // }

  isImageType(url: string, types: string[], contentType: string): boolean {
    return contentType === 'image/tiff';
  }

  getCanvasElement(element: BlobImage): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'thumbnail-tiff';
    canvas.setAttribute('data-url', element.url);
    return canvas;
  }

  renderTiffImages() {
    // setTimeout(() => {
    //   this.cdr.detectChanges(); // Ensure the DOM is updated
    //   const canvases: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
    //     'canvas.thumbnail-tiff'
    //   );
    //   canvases.forEach((canvas) => {
    //     const url = canvas.getAttribute('data-url');
    //     if (url) {
    //       const xhr = new XMLHttpRequest();
    //       xhr.open('GET', url);
    //       xhr.responseType = 'arraybuffer';
    //       xhr.onload = () => {
    //         const buffer = xhr.response;
    //         const tiff = new Tiff({ buffer });
    //         const canvasContext = canvas.getContext('2d');
    //         if (canvasContext) {
    //           canvas.width = tiff.width();
    //           canvas.height = tiff.height();
    //           tiff.toCanvas(canvas);
    //         }
    //       };
    //       xhr.send();
    //     }
    //   });
    // }, 1000);
  }

  applyFilters() {
    const fromDateTime = this.fromDate
      ? new Date(this.fromDate).getTime()
      : null;
    const toDateTime = this.toDate ? new Date(this.toDate).getTime() : null;
    const filterText = this.searchText.trim().toLowerCase();

    this.dataSource.data = this.originalData.filter((image) => {
      const imageDateTime = new Date(image.lastModified).getTime();
      const matchesDate =
        (!fromDateTime || imageDateTime >= fromDateTime) &&
        (!toDateTime || imageDateTime <= toDateTime);
      const matchesSearch =
        !filterText || image.name.toLowerCase().includes(filterText);

      return matchesDate && matchesSearch;
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setFromDate(event: any): void {
    this.fromDate = event.target.value ? new Date(event.target.value) : null;
    this.applyFilters();
  }

  setToDate(event: any): void {
    this.toDate = event.target.value ? new Date(event.target.value) : null;
    this.applyFilters();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.selectedFileName = file.name;
    }
  }

  uploadFileToAzure(): void {
    if (this.fileToUpload) {
      this.uploadInProgress = true;
      this.azureImageUploadService.uploadImage(this.fileToUpload).subscribe({
        next: () => {
          this.uploadInProgress = false;
          this.selectedFileName = null;
          this.snackBar.open('File uploaded successfully!', 'Close', {
            duration: 3000,
          });
          this.loadImages(); // Refresh the image list after upload
        },
        error: (error: any) => {
          this.uploadInProgress = false;
          this.snackBar.open('Failed to upload file.', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      this.uploadInProgress = true;
      this.imageUploadService.uploadImage(this.fileToUpload).subscribe({
        next: () => {
          this.uploadInProgress = false;
          this.fileToUpload = null;
          this.selectedFileName = null;
          this.snackBar.open('Image uploaded successfully!', 'Close', {
            duration: 3000,
          });
          this.loadImages(); // Refresh the image list after upload
        },
        error: (error: any) => {
          this.uploadInProgress = false;
          this.snackBar.open(
            'Image upload failed. Please try again.',
            'Close',
            { duration: 3000 }
          );
        },
      });
    }
  }

  loadImages(): void {
    this.uploadInProgress = true;
    this.azureImageUploadService.getImages().subscribe({
      next: (images: Image[]) => {
        // store the original data
        this.originalData = images;
        this.dataSource.data = images;
        this.renderTiffImages();
        this.uploadInProgress = false;
      },
      error: (error: any) => {
        this.uploadInProgress = false;
        this.snackBar.open('Failed to load images.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  deleteImage(fileName: string) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.azureImageUploadService.deleteImage(fileName).subscribe({
          next: () => {
            this.snackBar.open('File Deleted Successfully!', 'Close', {
              duration: 3000,
            });
            this.loadImages(); // Refresh the list after deletion
          },
          error: (error: any) => {
            this.snackBar.open('Failed to delete image.', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
