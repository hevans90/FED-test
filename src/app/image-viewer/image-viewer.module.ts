import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialManifestModule } from '../material-manifest/material-manifest.module';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageViewerService } from './image-viewer.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialManifestModule
  ],
  providers: [ImageViewerService],
  exports: [ImageGalleryComponent]
})
export class ImageViewerModule { }
