import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-book-edit-page',
  templateUrl: './book-edit-page.component.html',
  styleUrls: ['./book-edit-page.component.scss']
})
export class BookEditPageComponent {
  id?: string | null;
  authors!: Array<Author>;
  book!: Book;
  selectedAuthors?: Array<string | undefined>;

  constructor(private bookService: BookService, private authorService: AuthorService,private activeRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {

    this.authorService.getAuthors().subscribe(
      (data) => this.authors = data
    )

    this.id = this.activeRoute.snapshot.paramMap.get('id');

    if (this.id != null)
    {
        this.bookService.getById(+this.id).subscribe(
          (data) => {
            this.book = data;
            console.log(this.book.authorBooks);
            this.selectedAuthors = this.book.authorBooks?.map(a => a.author).map(a => a?.name);
          }
        )
    }

  }

  onSubmit(bookForm: any) {
   
   this.book.authorBooks?.splice(0);

   this.authors.filter(a => this.selectedAuthors?.includes(a.name)).map(a => {
        this.book.authorBooks?.push({author: a});
   });

   console.log(this.book.authorBooks);

   this.bookService.update(this.book).subscribe(
    (data) => {
         let dialogRef = this.dialog.open(DialogBoxComponent, {data: { message: 'The book was edited succesfully !' }});
        
         dialogRef.afterClosed().subscribe(result => {
                  this.router.navigate(['book-viewer']);
          });},
    (error) =>   this.dialog.open(DialogBoxComponent, {data: { message: 'An errror occured. Please try again !' }})
   )
  }
}
