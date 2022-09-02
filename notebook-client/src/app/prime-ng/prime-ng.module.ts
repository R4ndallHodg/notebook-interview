import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DividerModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
