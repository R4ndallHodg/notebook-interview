import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../interfaces/notes.interface';
import { NotesService } from '../../services/notes.service';
import { Params } from '../../interfaces/params.interface';

// Component used to show the users all of their notes, sort them by title or body ascendatly or descendantly, search for notes by title or body
// it also allows the users to go to an specific note and see it`s information and it also allows the users to browse to a form that allows them to make update operations
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styles: [
    `
      .w-40rem {
        width: 40rem !important;
      }
    `,
  ],
})
export class NotesListComponent implements OnInit {
  notes!: Note[];
  loadingNotes: boolean = false;
  sortCriteria: string[];
  searchCriteria: string[];
  sortForm!: FormGroup;
  searchForm!: FormGroup;
  formData!: Params;
  loadingSort: boolean = false;
  loadingSearch: boolean = false;

  constructor(
    private readonly _notesService: NotesService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.sortCriteria = ['Title', 'Date'];
    this.searchCriteria = ['Title', 'Body'];
  }

  // Loading the reactive forms and the note`s information
  ngOnInit(): void {
    this.loadingNotes = true;
    [this.sortForm, this.searchForm] = this.initForm();
    this._notesService.getAllNotes().subscribe((resp) => {
      this.notes = resp;
      this.loadingNotes = false;
    });
  }

  // Initializing the form`s values
  initForm(): FormGroup[] {
    return [
      this._formBuilder.group({
        orderField: ['', Validators.required],
        orderAsc: [true],
      }),
      this._formBuilder.group({
        query: [''],
        criteria: ['', Validators.required],
      }),
    ];
  }

  // Method that communicates with the service and changes the current notes to sorted notes that were sorted with a given criteria.
  // If there is already a query to search for it will sort results that match the given query results.
  sortValues(): void {
    if (this.sortForm.valid) {
      this.loadingSort = true;
      this.loadingNotes = true;
      this.notes = [];
      let params: Params = {};

      // If there is a query to search for it will get search the results for that query and sort the results with a given criteria. Else it will sort the notes with a given criteria
      if (
        this.searchForm.valid &&
        this.searchForm.value.query.trim().length > 0
      ) {
        params = {
          ...this.sortForm.value,
          [this.searchForm.value.criteria]: [this.searchForm.value.query],
        };
      } else {
        params = this.sortForm.value;
      }
      this._notesService.getAllNotes(params).subscribe((resp) => {
        this.notes = resp;
        this.loadingSort = false;
        this.loadingNotes = false;
      });
    }
  }

  // Method that searches and update the notes information to notes that match some query.
  search(): void {
    if (this.searchForm.valid) {
      let params: Params = {};
      this.loadingSearch = true;
      this.loadingNotes = true;
      this.notes = [];

      params = {
        [this.searchForm.value.criteria]: this.searchForm.value.query,
      };

      this.formData = this.searchForm.value;
      this._notesService
        .getAllNotes(this.searchForm.value.query ? params : {})
        .subscribe((resp) => {
          this.notes = resp;
          this.loadingSearch = false;
          this.loadingNotes = false;
        });
      return;
    }
  }
}
