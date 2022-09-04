import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routing for the application. Implementing Lazy loading for modules on Notes
const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () =>
      import('./notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
