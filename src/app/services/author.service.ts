import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorDTO } from '../models/authorDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url: string = "https://localhost:7066/api/Author";

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Array<AuthorDTO>>
  {
    return this.httpClient.get<Array<AuthorDTO>>(this.url);
  }
}
