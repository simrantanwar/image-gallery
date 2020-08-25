import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ToasterService } from 'src/app/shared/shared-services/toaster.service';
import { LoaderService } from 'src/app/shared/shared-services/loader.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  images: Array<any> = [];
  requestBody: any;
  message: any;

  constructor(private _imageService: ImageService,
    private _loaderService: LoaderService,
    private _toastService: ToasterService) { }

  ngOnInit(): void {
  }

  // Selecting Images to be uploaded & preparing preview thumbnails

  selectImage(files) {

    this.images = [];
    let formData = new FormData();
    for (let index = 0; index < files.length; index++) {

      // preparing preview

      let reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = ((event: any) => {
        this.images.push(event.target.result);
      });

      //preparing form data
      formData.append('files', files[index]);

    }
    this.requestBody = formData;
  }

  // Uploading images to the server 

  uploadImages() {
    this._loaderService.loaderValue(true);
    this._imageService.saveImages(this.requestBody).pipe(
      catchError((err) => of(err)),
      tap(resp => {
        let message = {
          msg: resp.message,
          type: '',
          summary: ''
        }
        if (resp.success) {
          message.type = 'success';
          message.summary = 'Success';

        }
        else {
          message.type = 'error';
          message.summary = 'Error';

          message.msg = resp.error && resp.error.message ? resp.error.message : resp.message;
        }
        this.message = message;

      }), finalize(() => {

        // SetTimout is only used to mimic async behvaviour during API calls (to show loaders and toaster messages)
        // Aftre integrating Api we can get rid of this.

        setTimeout(() => {
          this._toastService.toaster(this.message);
          this._loaderService.loaderValue(false);
          this.images = [];
        }, 3000);

      })
    ).subscribe();

  }
}
