export interface BlobImage {
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
  url: string;
}
