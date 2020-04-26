import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerService } from 'shared/services/spinner/spinner.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';
import { SpinnerHttpInterceptorProvider } from './Interceptor/spinner.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule, FormsModule, NgxGalleryModule],
  exports: [CommonModule, AngularMaterialModule, FormsModule, NgxGalleryModule],
  providers: [
    ErrorInterceptorProvider,
    SpinnerService,
    SpinnerHttpInterceptorProvider,
  ],
})
export class SharedModule {}
