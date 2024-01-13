import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReponseCoverDTO } from '../models/responseCover';
import { BookDTO } from '../models/bookDTO';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = "https://localhost:7066/api/Book";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<BookDTO>> {
    return this.httpClient.get<Array<BookDTO>>(this.url);
  }

  delete(id?: number): Observable<any> {
    return this.httpClient.delete(this.url + '?id=' + id);
  }

  insert(book: BookDTO): Observable<BookDTO> {
    return this.httpClient.post(this.url, book);
  }

  getById(id: number): Observable<BookDTO> {
    return this.httpClient.get<BookDTO>(this.url + '/' + id);
  }

  update(book: BookDTO): Observable<BookDTO> {
    return this.httpClient.put(this.url, book);
  }

  uploadCover(formData: FormData): Observable<ReponseCoverDTO> {
    return this.httpClient.post<any>(this.url + '/upload-cover', formData)
  }

  getCover(coverPath?: string): Observable<ArrayBuffer> {
    return this.httpClient.get(this.url + '/get-cover/' + coverPath, { responseType: 'arraybuffer' })
  }
}
