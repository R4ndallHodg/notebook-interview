import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
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
    FieldsetModule,
  ],
})
export class PrimeNgModule {}
