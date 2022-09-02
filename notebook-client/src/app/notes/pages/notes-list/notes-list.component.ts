import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../interfaces/notes.interface';
import { NotesService } from '../../services/notes.service';
import { Params } from '../../interfaces/params.interface';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styles: [],
})
export class NotesListComponent implements OnInit {
  notes!: Note[];
  criteria: string[];
  selectedCriteria!: string;
  sortForm!: FormGroup;
  searchForm!: FormGroup;
  formData!: Params;

  constructor(
    private readonly notesService: NotesService,
    private readonly formBuilder: FormBuilder
  ) {
    this.criteria = ['Title', 'Date'];
  }

  ngOnInit(): void {
    [this.sortForm, this.searchForm] = this.initForm();
    this.notesService.getAllNotes().subscribe((resp) => {
      this.notes = resp;
    });
  }

  initForm(): FormGroup[] {
    return [
      this.formBuilder.group({
        orderField: ['', Validators.required],
        orderAsc: [true],
      }),
      this.formBuilder.group({
        query: ['', Validators.required],
      }),
    ];
  }

  sortValues(): void {
    this.formData = this.sortForm.value;
    if (this.sortForm.valid) {
      this.notesService.getAllNotes(this.formData).subscribe((resp) => {
        this.notes = resp;
      });
    }
  }
}
