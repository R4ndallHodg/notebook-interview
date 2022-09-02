import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../interfaces/notes.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/notes`, note);
  }
}
