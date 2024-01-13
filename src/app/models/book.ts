import { AuthorBook } from "./authorBook";

export class Book{
    id?: number;
    coverPath?: string;
    title?: string;
    description?: string;
    authorBooks?: Array<AuthorBook>
}