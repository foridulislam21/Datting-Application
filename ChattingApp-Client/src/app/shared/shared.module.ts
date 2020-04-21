import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  exports: [CommonModule, AngularMaterialModule, FormsModule],
  providers: [ErrorInterceptorProvider],
})
export class SharedModule {}
