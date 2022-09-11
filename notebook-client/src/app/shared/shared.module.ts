import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuComponent } from './menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

// Shared module that contains components that are going to be used on different parts of the application. Such as the navbar and the error page.
@NgModule({
  declarations: [MenuComponent],
  imports: [MenubarModule],
  exports: [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    InputTextareaModule,
    InputTextModule,
    MenuComponent,
    MenubarModule,
    PanelModule,
    ToastModule,
    ToolbarModule,
  ],
})
export class SharedModule {}
