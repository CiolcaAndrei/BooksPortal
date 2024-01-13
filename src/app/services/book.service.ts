import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ReponseCoverDTO } from '../models/responseCover';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = "https://localhost:7066/api/Book";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<Book>>
  {
    return this.httpClient.get<Array<Book>>(this.url);
  }

  delete(id?: number): Observable<any>{
    return this.httpClient.delete(this.url + '?id=' + id);
  }

  insert(book: Book): Observable<Book>
  {
    return this.httpClient.post(this.url,book);
  }

  getById(id: number): Observable<Book>
  {
    return this.httpClient.get<Book>(this.url + '/' + id);
  }

  update(book: Book): Observable<Book>
  {
    return this.httpClient.put(this.url, book);
  }

  uploadCover(formData: FormData): Observable<ReponseCoverDTO>
  {
    return this.httpClient.post<any>(this.url + '/upload-cover', formData)
  }

  getCover(coverPath: string): Observable<ArrayBuffer>
  {
    console.log(this.url + '/get-cover/' + coverPath);
    return this.httpClient.get(this.url + '/get-cover/' + coverPath, { responseType: 'arraybuffer' })
  }
}
