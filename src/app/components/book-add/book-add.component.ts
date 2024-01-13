import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  book: Book;
  authors!: Array<Author>;
  coverPreview?: string | ArrayBuffer;

  selectedAuthors!: Array<Author>

  constructor(private bookService: BookService, private authorService: AuthorService,private dialog: MatDialog,private router: Router) {
    this.authorService.getAuthors().subscribe(
      (data) => this.authors = data
    )

    this.book = new Book();
    this.book.id = 0;
    this.book.coverPath = '';
    this.book.title = '';
    this.book.description = '';
    this.book.authorBooks = [];
  }

  onCoverChange(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPreview = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);

      // Store the selected file in the Book entity
      this.book.coverPath = input.files[0];
    }
  }

  onSubmit() {
    this.selectedAuthors.map(a => {
      this.book.authorBooks?.push({author: a});
    })

    if (this.book.coverPath)
    {
          const formData = new FormData();
          formData.append('cover', this.book.coverPath);

          this.bookService.uploadCover(formData).subscribe(
            (data) => {
              this.book.coverPath = data.coverPath;
              this.bookService.insert(this.book).subscribe(
                (data) => 
                { let dialogRef = this.dialog.open(DialogBoxComponent, {data: { message: 'The book was added succesfully !' }});
                  
                  dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['book-viewer']);
                  });},
                (error) => 
                {
                  this.dialog.open(DialogBoxComponent, {data: { message: 'An errror occured. Please try again !' }});
                }
               );
            }
          );
    }
  }
}
