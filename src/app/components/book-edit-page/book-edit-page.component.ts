import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AuthorDTO } from 'src/app/models/authorDTO';
import { BookDTO } from 'src/app/models/bookDTO';

@Component({
  selector: 'app-book-edit-page',
  templateUrl: './book-edit-page.component.html',
  styleUrls: ['./book-edit-page.component.scss']
})
export class BookEditPageComponent {
  id?: string | null;
  authors!: Array<AuthorDTO>;
  book!: BookDTO;
  selectedAuthors?: Array<string | undefined>;
  coverPreview?: string | ArrayBuffer;
  initialCoverPath?: string;

  constructor(private bookService: BookService, private authorService: AuthorService, private activeRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {

    this.authorService.getAuthors().subscribe(
      (data) => this.authors = data
    )

    this.id = this.activeRoute.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.bookService.getById(+this.id).subscribe(
        (data) => {
          this.book = data;
          this.selectedAuthors = this.book.authors?.map(a => a.name);
          this.initialCoverPath = this.book.coverPath;

          this.bookService.getCover(this.book.coverPath).subscribe((data: ArrayBuffer) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.coverPreview = e.target.result;
              this.book
            };
            reader.readAsDataURL(new Blob([data]));
          });
        }
      )
    }
  }

  onCoverChange(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPreview = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);

      this.book.coverPath = input.files[0];
    }
  }

  updateBook() {
    this.bookService.update(this.book).subscribe(
      (data) => {
        let dialogRef = this.dialog.open(DialogBoxComponent, { data: { message: 'The book was edited succesfully !' } });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['book-viewer']);
        });
      },
      (error) => this.dialog.open(DialogBoxComponent, { data: { message: 'An errror occured. Please try again !' } }))
  }

  onSubmit(bookForm: any) {

    this.book.authors?.splice(0);

    this.authors.filter(a => this.selectedAuthors?.includes(a.name)).map(a => {
      this.book.authors?.push(a);
    });

    if (this.book.coverPath) {

      if (this.book.coverPath != this.initialCoverPath) {
        const formData = new FormData();
        formData.append('cover', this.book.coverPath);

        this.bookService.uploadCover(formData).subscribe(
          (data) => {
            this.book.coverPath = data.coverPath;
            this.updateBook();
          });
      }
      else {
        this.updateBook();
      }
    }
  }
}
