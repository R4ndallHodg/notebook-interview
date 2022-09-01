import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { SearchComponent } from './pages/search/search.component';
import { NoteComponent } from './pages/note/note.component';

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
        path: 'search',
        component: SearchComponent,
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
