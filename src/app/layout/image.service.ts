import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

const GET_IMAGES_URL = 'assets/upload/files.json';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(GET_IMAGES_URL);
  }

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

}
