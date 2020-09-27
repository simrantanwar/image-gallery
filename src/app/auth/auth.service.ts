import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable()
export class AuthService {

  constructor() { }

  signIn(requestBody){
    if(requestBody.email=='abc@gmail.com' && requestBody.password=='12345'){
      return from(Promise.resolve(
        {
          "result": [],
          "success": true,
          "status": 200,
          "message": "Fetch succesfully"
      }
      ))
    }
    else{
      return from(Promise.reject({
        "result": [],
        "success": false,
        "status": 400,
        "message": "You have entered the wrong information"
    }
      ))
    }
  }
}
