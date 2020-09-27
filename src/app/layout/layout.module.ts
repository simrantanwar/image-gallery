import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { SharedModule } from '../shared/shared.module';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      { path: '', redirectTo: 'image-gallery', pathMatch: 'full' },
      { path: 'upload-images', component: UploadImagesComponent, data: { breadcrumb: 'Upload Images' } },
      { path: 'image-gallery', component: ImageGalleryComponent, data: { breadcrumb: 'Image Gallery' } }
    ]
  },
]

@NgModule({
  declarations: [
    BaseComponent,
    UploadImagesComponent,
    ImageGalleryComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  providers: []
})
export class LayoutModule { }
