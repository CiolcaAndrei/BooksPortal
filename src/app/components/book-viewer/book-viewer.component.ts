import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.scss']
})
export class BookViewerComponent {
  books?: Array<Book>;

  constructor(private bookService: BookService, private dialog: MatDialog) {
    this.loadPage();
  }

  loadPage(){
    this.bookService.getAll().subscribe(
      (data) => this.books = data,
      (error) => {
        this.dialog.open(DialogBoxComponent, {data: { message: 'An errror occured. Please try again !' }});
      }
    );
  }
}
