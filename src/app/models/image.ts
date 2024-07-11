// export interface Image {
//   url: string;
//   name: string;
//   description: string;
//   date: string; // Changed from uploadedDate to date
// }


export interface Image {
  name: string;
  creationTime: Date;
  lastModified: Date;
  etag: string;
  contentLength: number;
  contentType: string;
  blobType: string;
  leaseStatus: string;
  accessTier: string;
  serverEncrypted: boolean;
  url?:string;
  date?:string;
  description?:string;
}
