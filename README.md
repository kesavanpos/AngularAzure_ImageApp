Here is the updated content formatted as a README.md file:

markdown
Copy code
# Angular Azure Image App

## Project Overview

This project is an Angular application that interacts with Azure to display, upload, and manage images. Users can filter images by date and search for specific images by name. The application supports uploading images in various formats, including TIFF. Users can also delete images and download them directly from the table.

## Technologies Used

- Angular
- Azure Blob Storage
- TypeScript
- HTML/CSS
- Angular Material

## Features

1. **Image Display and Filtering**:
   - Displays images from Azure Blob Storage in a table.
   - Supports filtering images by date and name.

2. **Image Upload**:
   - Allows users to upload images in various formats, including TIFF.
   - Provides visual feedback during the upload process.

3. **Image Deletion**:
   - Allows users to delete images directly from the table.

4. **Image Download**:
   - Provides a download button for each image to download the image directly from the table.

## Setup Instructions

### Clone the Repository:

```bash
git clone https://github.com/kesavanpos/AngularAzure_ImageApp.git
cd AngularAzure_ImageApp
Install Dependencies:
bash
Copy code
npm install
Run the Application:
bash
Copy code
ng serve
Open your browser and navigate to http://localhost:4200/.

Code Explanation
Here is a brief explanation of the key components and their functions:

HTML Template (image-list.component.html):
Contains the structure of the image table, input fields for filtering, and buttons for uploading and downloading images.
TypeScript Component (image-list.component.ts):
Manages the logic for displaying, filtering, uploading, deleting, and downloading images.
Uses Angular Material components for a consistent UI experience.