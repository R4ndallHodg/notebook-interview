import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenuComponent } from './menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [MenuComponent, ErrorPageComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [MenuComponent],
})
export class SharedModule {}
