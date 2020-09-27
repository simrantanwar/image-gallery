import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared-component/header/header.component';
import { FooterComponent } from './shared-component/footer/footer.component';
import { SideMenuComponent } from './shared-component/side-menu/side-menu.component';
import { LoaderComponent } from './shared-component/loader/loader.component';
import { ToasterComponent } from './shared-component/toaster/toaster.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import {ToastModule} from 'primeng/toast';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    LoaderComponent,
    ToasterComponent  
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    ToastModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BreadcrumbModule,
    LoaderComponent,
    ToasterComponent,
    ToastModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
