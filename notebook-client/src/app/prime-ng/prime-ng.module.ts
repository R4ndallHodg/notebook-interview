import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

// Module created specific for managing primng components
@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    InputTextareaModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    ToastModule,
    ToolbarModule,
  ],
})
export class PrimeNgModule {}
