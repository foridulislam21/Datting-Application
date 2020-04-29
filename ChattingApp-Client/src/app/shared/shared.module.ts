import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from 'shared/services/spinner/spinner.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';
import { SpinnerHttpInterceptorProvider } from './Interceptor/spinner.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    NgxGalleryModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    NgxGalleryModule,
    ReactiveFormsModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    SpinnerService,
    SpinnerHttpInterceptorProvider,
  ],
})
export class SharedModule {}
