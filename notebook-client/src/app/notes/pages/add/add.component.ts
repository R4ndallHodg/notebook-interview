import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotesService } from '../../services/notes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [MessageService],
})
export class AddComponent implements OnInit {
  id!: string;
  minDate: Date = new Date();
  noteForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _notesService: NotesService,
    private readonly _activatedRoutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.noteForm = this.initForm();

    // Checking if the route includes the update text. If that`s the case we set the id value and the note`s form data to the response data
    if (this._router.url.includes('update')) {
      this._activatedRoutes.params
        .pipe(switchMap(({ id }) => this._notesService.findNoteById(id)))
        .subscribe((resp) => {
          if (resp?.id) {
            this.id = resp.id;
            delete resp.id;
            this.noteForm.setValue(resp);
          } else {
            this.showError(resp);
          }
        });
    }
  }

  // In this method we do a certain operation if we are updating or adding a new record. We can know if the user is updating or adding a new record
  // Depending on if id has a value or not.
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
      this.loading = true;
      this._notesService
        .updateNote(this.id, this.noteForm.value)
        .subscribe((resp) => {
          console.log(resp);
          if (!resp) {
            this._router.navigateByUrl('/notes/list');
          } else {
            this.showError(resp);
          }
        });
    } else {
      this._notesService.createNote(this.noteForm.value).subscribe((resp) => {
        if (!resp.errors) {
          this.loading = true;
          this._router.navigateByUrl('/notes/list');
        } else {
          this.showError(resp);
        }
      });
    }
  }

  // Initializing the form`s information
  initForm(): FormGroup {
    return this._formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required]],
    });
  }

  // Method that receives an error response and shows a certain operation error`s. It has an any value type because the error can come on different ways
  // The error structure depends on if the validation comes from a data annotation which would return a whole object as a
  //or if it is an error that is returned as a response from the API wich is an string in that case.
  showError(resp: any) {
    let errors: string[] = resp?.errors?.Body || [];
    if (errors.length !== 0) {
      this.loading = false;
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
}
