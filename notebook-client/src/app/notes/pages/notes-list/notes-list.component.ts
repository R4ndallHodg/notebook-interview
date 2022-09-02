import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/notes.interface';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styles: [],
})
export class NotesListComponent implements OnInit {
  notes!: Note[];
  constructor(private readonly notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe((resp) => {
      this.notes = resp;
      console.log(this.notes);
    });
  }
}
