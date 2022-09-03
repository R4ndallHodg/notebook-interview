import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotesService } from '../../services/notes.service';
import { switchMap } from 'rxjs';
import { Note } from '../../interfaces/notes.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [MessageService],
})
export class AddComponent implements OnInit {
  id!: string;
  minDate: Date = new Date();
  noteForm!: FormGroup;
  formIsValid: boolean = true;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _notesService: NotesService,
    private readonly _activatedRoutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.noteForm = this.initForm();
    if (this._router.url.includes('update')) {
      this._activatedRoutes.params
        .pipe(switchMap(({ id }) => this._notesService.findNoteById(id)))
        .subscribe((resp) => {
          this.id = resp.id;
          delete resp.id;
          this.noteForm.setValue(resp);
        });
    }
  }

  add(): void {
    if (!this.noteForm.valid) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The note wasn`t saved',
      });
      return;
    }

    if (this.id) {
      this._notesService
        .updateNote(this.id, this.noteForm.value)
        .subscribe((resp) => {
          console.log(resp);
          if (!resp) {
            this._router.navigateByUrl('/notes/list');
          } else {
            let errors: string[] = resp?.errors?.Body || [];
            if (errors.length !== 0) {
              errors.forEach((error: string) => {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error,
                });
              });
            } else {
              this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: resp,
              });
            }
          }
        });
    } else {
      this._notesService.createNote(this.noteForm.value).subscribe((resp) => {
        if (resp === true) {
          this._router.navigateByUrl('/notes/list');
        } else {
          let errors: string[] = resp?.errors?.Body || [];
          if (errors.length !== 0) {
            errors.forEach((error: string) => {
              this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
              });
            });
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: resp,
            });
          }
        }
      });
    }
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      title: ['Example note', [Validators.required]],
      body: [
        'This is some example text',
        [Validators.required, Validators.minLength(10)],
      ],
      date: ['2020-01-06T17:16:40', [Validators.required]],
    });
  }
}
