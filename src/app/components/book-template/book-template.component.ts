import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookDTO } from 'src/app/models/bookDTO';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-template',
  templateUrl: './book-template.component.html',
  styleUrls: ['./book-template.component.scss']
})
export class BookTemplateComponent implements OnInit {
  @Input() book!: BookDTO;
  @Output() deleteBookEvent = new EventEmitter<boolean>();
  coverPreview?: string | ArrayBuffer;

  selectedAuthors?: string;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.selectedAuthors = this.book?.authors?.map(a => a.name).join(' / ');

    this.loadCoverImage();
  }

  deleteBook() {
    this.bookService.delete(this.book.id).subscribe(
      (data) => this.deleteBookEvent.emit(true)
    )
  }

  loadCoverImage() {
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
