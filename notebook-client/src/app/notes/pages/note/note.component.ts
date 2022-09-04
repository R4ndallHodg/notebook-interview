import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/notes.interface';
import { NotesService } from '../../services/notes.service';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

// Component used to show a singular note`s information
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styles: [],
})
export class NoteComponent implements OnInit {
  note!: Note;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _messageService: MessageService,
    private readonly _router: Router,
    private readonly _notesService: NotesService
  ) {}

  // Here we get the query`s id and search for a note and show that note`s information to the user. If there is not note that matches the id we show a toast that
  // Lets the user know that there wasn`t any note that matches the id and we redirection the user to the list page
  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._notesService.findNoteById(id);
        })
      )
      .subscribe((resp) => {
        console.log(resp);
        if (resp?.id) {
          this.note = resp;
          console.log(this.note);
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp,
          });
          setTimeout(() => {
            this._router.navigateByUrl('/notes/list');
          }, 3000);
        }
      });
  }
}
