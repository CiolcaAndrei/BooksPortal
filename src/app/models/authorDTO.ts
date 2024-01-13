import { BookDTO } from "./bookDTO";

export class AuthorDTO{
    id?: number;
    name?: string;
    books?: Array<BookDTO>
}