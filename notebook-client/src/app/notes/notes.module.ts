import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { NoteComponent } from './pages/note/note.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { SearchComponent } from './pages/search/search.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DateToTextPipe } from './pipes/date-to-text.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    NoteComponent,
    NotesListComponent,
    SearchComponent,
    DateToTextPipe,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    NotesRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
})
export class NotesModule {}
