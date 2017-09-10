import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialManifestModule } from '../material-manifest/material-manifest.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialManifestModule
  ],
  declarations: []
})
export class ImageViewerModule { }
