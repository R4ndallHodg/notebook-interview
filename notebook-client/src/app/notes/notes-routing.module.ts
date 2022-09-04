import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { NoteComponent } from './pages/note/note.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { RouterModule, Routes } from '@angular/router';

// In this module we configure the routes for the notes module.
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'list',
        component: NotesListComponent,
      },
      {
        path: 'update/:id',
        component: AddComponent,
      },
      {
        path: ':id',
        component: NoteComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
