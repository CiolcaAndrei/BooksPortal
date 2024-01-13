import { AuthorDTO } from "./authorDTO";

export class BookDTO{
    id?: number;
    coverPath?: string;
    title?: string;
    description?: string;
    authors?: Array<AuthorDTO>
}