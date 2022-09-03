import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { Note } from '../../interfaces/notes.interface';
import { NotesService } from '../../services/notes.service';

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

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._notesService.findNoteById(id);
        })
      )
      .subscribe((resp) => {
        if (resp.id) {
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
