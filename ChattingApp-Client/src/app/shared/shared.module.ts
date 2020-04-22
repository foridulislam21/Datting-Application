import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';
import { SpinnerService } from './Services/Spinner/spinner.service';
import { SpinnerHttpInterceptorProvider } from './Interceptor/spinner.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  exports: [CommonModule, AngularMaterialModule, FormsModule],
  providers: [ErrorInterceptorProvider, SpinnerService, SpinnerHttpInterceptorProvider],
})
export class SharedModule {}
