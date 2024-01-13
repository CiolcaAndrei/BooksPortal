import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url: string = "https://localhost:7066/api/Author";

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Array<Author>>
  {
    return this.httpClient.get<Array<Author>>(this.url);
  }
}
