import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Image } from "../models/image";
import { BlobImage } from "../models/blobimage";
import { ImageUploadService } from '../services/image-upload.service';
import { AzureImageUploadService } from '../services/AzureImageUploadService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  fromDate: Date | null = null;
  toDate: Date | null = null;
  searchText: string = '';

  private originalData: Image[] = []; // Store original data

  constructor(private azureImageUploadService: AzureImageUploadService, private imageUploadService: ImageUploadService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  @Input() set images(images: Image[]) {
    this.originalData = images; // Set original data when input changes
    this.dataSource.data = images;
  }

  dataSource = new MatTableDataSource<Image>();
  displayedColumns: string[] = ['image', 'name', 'date', 'delete'];

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

  applyFilters() {
    const fromDateTime = this.fromDate ? new Date(this.fromDate).getTime() : null;
    const toDateTime = this.toDate ? new Date(this.toDate).getTime() : null;
    const filterText = this.searchText.trim().toLowerCase();

    this.dataSource.data = this.originalData.filter(image => {
      const imageDateTime = new Date(image.lastModified).getTime();
      const matchesDate = (!fromDateTime || imageDateTime >= fromDateTime) && (!toDateTime || imageDateTime <= toDateTime);
      const matchesSearch = !filterText || image.name.toLowerCase().includes(filterText);

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
          this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
          this.loadImages(); // Refresh the image list after upload
        },
        error: (error) => {
          this.uploadInProgress = false;
          this.snackBar.open('Failed to upload file.', 'Close', { duration: 3000 });
        }
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
          this.snackBar.open('Image uploaded successfully!', 'Close', { duration: 3000 });
          this.loadImages(); // Refresh the image list after upload
        },
        error: (error) => {
          this.uploadInProgress = false;
          this.snackBar.open('Image upload failed. Please try again.', 'Close', { duration: 3000 });
        }
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
        this.uploadInProgress = false;
      },
      error: (error) => {
        this.uploadInProgress = false;
        this.snackBar.open('Failed to load images.', 'Close', { duration: 3000 });
      }
    });
  }

  deleteImage(fileName: string) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.azureImageUploadService.deleteImage(fileName).subscribe({
          next: () => {
            this.snackBar.open('File Deleted Successfully!', 'Close', { duration: 3000 });
            this.loadImages();  // Refresh the list after deletion
          },
          error: (error) => {
            this.snackBar.open('Failed to delete image.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}

