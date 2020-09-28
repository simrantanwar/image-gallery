import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

const GET_IMAGES_URL = 'assets/upload/files.json';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesUrls: Array<any> = [];
  constructor(private http: HttpClient) { }

  // API will be used for gettting all the uploaded images

  getImages(): Observable<any> {
    return this.http.get(GET_IMAGES_URL);
  }

  // Returning hard coded response as we dont have API right now

  saveImages(requestBody) {
    return from(Promise.resolve(
      {
        "result": [],
        "success": true,
        "statusCode": 200,
        "message": "Images uploaded successfully."
      }
    ));
  }

  uploadImage(urls) {
    urls.forEach(element => {
      this.imagesUrls.push(element);
    });
  }

}
