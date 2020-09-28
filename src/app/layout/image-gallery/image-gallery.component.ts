import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoaderService } from 'src/app/shared/shared-services/loader.service';
import { ToasterService } from 'src/app/shared/shared-services/toaster.service';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  images: Array<any> = [];
  showLoader: boolean = false;
  constructor(private _imageService: ImageService, private _loaderService: LoaderService,
    private _toastService: ToasterService) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this._loaderService.loaderValue(true);
    this.showLoader = true;
    this._imageService.getImages().pipe(
      catchError((err) => of(err)),
      tap(resp => {
        if (resp.success) {
          this.images = resp.result;
          this._imageService.imagesUrls.forEach(element => {
            this.images.push(element)
          })
        }
        else {
          console.log(resp.message);
          let message = {
            msg: resp.message,
            type: '',
            summary: ''
          }
          this._toastService.toaster(message);
        }
      }), finalize(() => {

        // SetTimout is only used to mimic async behvaviour during API calls (to show loaders and toaster messages)
        // Aftre integrating Api we can get rid of this.

        setTimeout(() => {
          this._loaderService.loaderValue(false);
          this.showLoader = false;
        }, 3000);

      })
    ).subscribe();
  }
}
