import { AddComponent } from './pages/add/add.component';
import { CommonModule } from '@angular/common';
import { DateToTextPipe } from './pipes/date-to-text.pipe';
import { HomeComponent } from './pages/home/home.component';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { NoteComponent } from './pages/note/note.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Note created for managing anything related with notes. In this case we manage all the crud, routing and setup operations
@NgModule({
  declarations: [
    AddComponent,
    DateToTextPipe,
    HomeComponent,
    NoteComponent,
    NotesListComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [MessageService],
})
export class NotesModule {}
