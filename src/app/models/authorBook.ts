import { Author } from "./authorDTO";
import { Book } from "./bookDTO";

export class AuthorBook{
    authorId?: number;
    bookId?: number;
    author?: Author;
    book?: Book;
}