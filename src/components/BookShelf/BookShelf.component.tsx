import "./BookShelf.component.css"
import {IBook} from "../../models/book.model";
import {SHELF_TYPE} from "../../models/shelf.model";
import {Book} from "../Book/Book.component";

export interface BookShelfProps {
    books: IBook[];
    bookShelfType: string;
}

export const BookShelf = ({...props}: BookShelfProps) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {SHELF_TYPE[props.bookShelfType as keyof typeof SHELF_TYPE]}
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((item: any, index: number) => (
                        <Book book={item} isReloadAfterChanged={true} key={index}/>
                    ))}
                </ol>
            </div>
        </div>
    );
};
