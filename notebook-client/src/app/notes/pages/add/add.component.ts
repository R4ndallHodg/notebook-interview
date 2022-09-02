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
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.initForm();
  }

  add(): void {
    if (!this.noteForm.valid) {
      this.formIsValid = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The note wasn`t saved',
      });
      return;
    }

    this.notesService.createNote(this.noteForm.value).subscribe((note) => {
      console.log(note);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'The note has been successfully added!!',
      });
      this.router.navigate(['/notes/list']);
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      title: ['Example note', [Validators.required]],
      body: [
        'This is some example text',
        [Validators.required, Validators.minLength(10)],
      ],
      date: ['2020-01-06T17:16:40', [Validators.required]],
    });
  }
}
