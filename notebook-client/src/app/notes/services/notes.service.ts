import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../interfaces/notes.interface';
import { Params } from '../interfaces/params.interface';

// Service created in order to connect with the backend server
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  // server url
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private readonly _http: HttpClient) {}

  // Query params is an optional parameter because sometimes we will send parameters in order to search specific notes for example
  getAllNotes(queryParams?: Params): Observable<Note[]> {
    let params = {};
    if (queryParams) params = queryParams;
    return this._http.get<Note[]>(`${this.baseUrl}/notes`, { params });
  }

  // Method used to create notes. We need to send the data in order to create the note successfully
  // We use the catch error observable operator in order to manipulate the error information and show it to the user
  createNote(note: Note) {
    return this._http
      .post<Note>(`${this.baseUrl}/notes`, note)
      .pipe(catchError((err) => of(err.error)));
  }

  // Method used to search for an specific note using it`s id
  findNoteById(id: string) {
    return this._http
      .get<Note>(`${this.baseUrl}/notes/${id}`)
      .pipe(catchError((err) => of(err.error)));
  }

  // Method used to update an specific note. We send it`s id in order to find the entity and we also pass the whole object with it`s changed information because it is a PUT type petition.
  updateNote(id: string, note: Note) {
    return this._http
      .put<Note>(`${this.baseUrl}/notes/${id}`, note)
      .pipe(catchError((err) => of(err.error)));
  }
}
