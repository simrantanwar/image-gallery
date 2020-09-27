import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/shared/shared-services/toaster.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  isShow: boolean = false;
  showLoader: boolean = false;

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _authService : AuthService,
    private _toastService : ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signInForm = this._fb.group({
      email: this._fb.control('abc@gmail.com', [Validators.required, Validators.maxLength(50),Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: this._fb.control('12345', Validators.required)
    })
  }

  showPassword() {
    this.isShow = !this.isShow
  }

  signIn() {
    if (this.signInForm.invalid) {
      return
    }
    this.showLoader=true;
    let requestBody={
      email:this.signInForm.value.email,
      password:this.signInForm.value.password
    }
    this._authService.signIn(requestBody).pipe(
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
          this._router.navigate(['/layout']);
        }
        else {
          message.type = 'error';
          message.summary = 'Error';

          message.msg = resp.error && resp.error.message ? resp.error.message : resp.message;
        }
        this._toastService.toaster(message);

      }), finalize(() => {
        this.showLoader=false;
      })
    ).subscribe();

    
  }

  validateControl(controlName: string, validationType: string) {

    const control = this.signInForm.controls[controlName]
    if (!control) {
      return false
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched)
    return result;

  }
}

