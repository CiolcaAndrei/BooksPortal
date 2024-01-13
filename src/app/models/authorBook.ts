import { Author } from "./author";
import { Book } from "./book";

export class AuthorBook{
    authorId?: number;
    bookId?: number;
    author?: Author;
    book?: Book;
}