import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [MessageService],
})
export class AddComponent implements OnInit {
  minDate: Date = new Date(new Date().getDate());
  noteForm!: FormGroup;
  formIsValid: boolean = true;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.initForm();
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

    this._notesService.createNote(this.noteForm.value).subscribe((resp) => {
      if (resp === true) {
        this._router.navigateByUrl('/notes/list');
      } else {
        let errors: string[] = resp.errors?.Body || [];
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
