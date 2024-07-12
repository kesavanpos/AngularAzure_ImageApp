import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AzureImageUploadService } from '../services/AzureImageUploadService';

declare var Tiff: any; // Declare Tiff variable to avoid TypeScript errors

@Component({
  selector: 'app-tiffimage',
  templateUrl: './tiffimage.component.html',
  styleUrls: ['./tiffimage.component.scss'],
})
export class TiffimageComponent implements AfterViewInit {
  constructor(private imageService: AzureImageUploadService) {}

  @Input() canvas!: HTMLCanvasElement; // Input property to receive the canvas element
  @Input() imageUrl: string = ''; // Input property to receive image URL
  @ViewChild('imgElement', { static: true })
  imgElement!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    this.loadTiffImage();
    //this.renderTiffImage();
    // if (this.isTiffImage()) {

    // }
  }

  isTiffImage(): boolean {
    return (
      this.imageUrl.toLowerCase().endsWith('.tif') ||
      this.imageUrl.toLowerCase().endsWith('.tiff')
    );
  }

  loadTiffImage(): void {
    this.imageService
      .fetchImage(this.imageUrl)
      .subscribe((data: ArrayBuffer) => {
        const tiff = new Tiff({ buffer: data });
        const canvas = this.canvas;
        const context = canvas.getContext('2d');
        const tiffCanvas = tiff.toCanvas();
        canvas.width = tiffCanvas.width;
        canvas.height = tiffCanvas.height;
        if (context != null) {
          context.drawImage(tiffCanvas, 0, 0);
          // Convert the canvas to a PNG image
          const pngUrl = canvas.toDataURL('image/png');
          this.imgElement.nativeElement.src = pngUrl;
        }
      });
  }

  renderTiffImage(): void {
    const xhr = new XMLHttpRequest();
    console.log(this.imageUrl);
    xhr.open('GET', this.imageUrl);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      const buffer = xhr.response;
      const tiff = new Tiff({ buffer });
      const canvasContext = this.canvas.getContext('2d');
      if (canvasContext) {
        this.canvas.width = tiff.width();
        this.canvas.height = tiff.height();
        tiff.toCanvas(this.canvas);
      }
    };
    xhr.send();
  }
}
