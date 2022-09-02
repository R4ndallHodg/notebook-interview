import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../interfaces/notes.interface';
import { Params } from '../interfaces/params.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}

  getAllNotes(queryParams?: Params): Observable<Note[]> {
    let params = {};
    if (queryParams) params = queryParams;
    return this.http.get<Note[]>(`${this.baseUrl}/notes`, { params });
  }
  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/notes`, note);
  }
}
