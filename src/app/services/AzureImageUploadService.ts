import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Image } from '../models/image';
import { BlobImage } from '../models/blobimage';
//import { parseString } from 'xml2js';
import * as convert from 'xml-js';
import { environment } from '../../environments/environment'; // Import environment settings

@Injectable({
  providedIn: 'root',
})
export class AzureImageUploadService {
  private readonly storageAccountName = environment.azure.storageAccountName;
  private readonly containerName = environment.azure.containerName;
  private readonly sasToken = environment.azure.sasToken;
  private readonly baseUrl = `https://${this.storageAccountName}.blob.core.windows.net/${this.containerName}`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const url = `${this.baseUrl}/${file.name}?${this.sasToken}`;
    const headers = new HttpHeaders({ 'x-ms-blob-type': 'BlockBlob' });

    return this.http.put(url, file, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error uploading the image:', error);
        return throwError(
          'Failed to upload the image. Please check the console for more details.'
        );
      })
    );
  }
  private mapBlobToImage(blob: any): BlobImage {
    return {
      name: blob.Name._text,
      creationTime: new Date(blob.Properties['Creation-Time']._text),
      lastModified: new Date(blob.Properties['Last-Modified']._text),
      etag: blob.Properties.Etag._text,
      contentLength: parseInt(blob.Properties['Content-Length']._text, 10),
      contentType: blob.Properties['Content-Type']._text,
      blobType: blob.Properties.BlobType._text,
      leaseStatus: blob.Properties.LeaseStatus._text,
      accessTier: blob.Properties.AccessTier._text,
      serverEncrypted: blob.Properties.ServerEncrypted._text === 'true',
      url: `${this.baseUrl}/${blob.Name._text}?${this.sasToken}`,
    };
  }

  fetchImage(url: string): Observable<ArrayBuffer> {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  checkImageType(url: string): Observable<HttpHeaders> {
    return this.http
      .head(url, { observe: 'response' })
      .pipe(map((response) => response.headers));
  }

  getImages(): Observable<BlobImage[]> {
    const url = `${this.baseUrl}?restype=container&comp=list&${this.sasToken}`;
    debugger;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response: string) => {
        const jsonResponse: any = convert.xml2js(response, { compact: true });
        debugger;
        const blobs = jsonResponse.EnumerationResults.Blobs.Blob;
        const images: BlobImage[] = Array.isArray(blobs)
          ? blobs.map((blob: any) => this.mapBlobToImage(blob))
          : [this.mapBlobToImage(blobs)];
        return images;
      }),
      catchError((error) => {
        console.error('Error fetching or parsing images:', error);
        return throwError(
          'Failed to fetch images. Please check the console for more details.'
        );
      })
    );
  }

  deleteImage(fileName: string): Observable<any> {
    const url = `${this.baseUrl}/${fileName}?${this.sasToken}`;
    return this.http.delete(url);
  }

  getBlobUrl(blobName: string): string {
    return `${this.baseUrl}/${blobName}${this.sasToken}`;
  }
}
