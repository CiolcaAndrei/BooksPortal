import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-template',
  templateUrl: './book-template.component.html',
  styleUrls: ['./book-template.component.scss']
})
export class BookTemplateComponent implements OnInit {
   @Input() book!: Book;
   @Output() deleteBookEvent = new EventEmitter<boolean>();
   coverPreview?: string | ArrayBuffer;
   
   selectedAuthors?: string;

   constructor(private bookService: BookService) {
   }

  ngOnInit(): void {
    this.selectedAuthors = this.book?.authorBooks?.map(ab => ab.author).map(a => a?.name).join(' / ');

    this.loadCoverImage();
  }

   deleteBook()
   {
      this.bookService.delete(this.book.id).subscribe(
        (data) => this.deleteBookEvent.emit(true)
      )
   }

  loadCoverImage() {
    console.log(this.book.coverPath);

    if (this.book.coverPath) {
      this.bookService.getCover(this.extractFileName(this.book.coverPath))
        .subscribe((data: ArrayBuffer) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.coverPreview = e.target.result;
          };
          reader.readAsDataURL(new Blob([data]));
        });
    }
  }

  private extractFileName(path: string): string {
    const startIndex = path.lastIndexOf('/') + 1;
    return path.substring(startIndex);
  }
}
