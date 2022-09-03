import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../interfaces/notes.interface';
import { Params } from '../interfaces/params.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly baseUrl: string = environment.baseUrl;
  constructor(private readonly _http: HttpClient) {}

  getAllNotes(queryParams?: Params): Observable<Note[]> {
    let params = {};
    if (queryParams) params = queryParams;
    return this._http.get<Note[]>(`${this.baseUrl}/notes`, { params });
  }
  createNote(note: Note) {
    return this._http
      .post<Note>(`${this.baseUrl}/notes`, note)
      .pipe(catchError((err) => of(err.error)));
  }

  findNoteById(id: string) {
    return this._http
      .get<Note>(`${this.baseUrl}/notes/${id}`)
      .pipe(catchError((err) => of(err.error)));
  }
}
