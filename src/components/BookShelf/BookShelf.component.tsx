import "./BookShelf.component.css"
import {IBook} from "../../models/book.model";
import {SHELF_TYPE} from "../../models/shelf.model";
import {Book} from "../Book/Book.component";

export interface BookShelfProps {
    books: IBook[];
    bookShelfType?: string;
    emitValueHome:(bookId: string,newShelf:string,currentShelf : string) => void
}

export const BookShelf = ({...props}: BookShelfProps) => {
    const getReturnValue = (bookId: string,currentShelf: string,newShelf : string) => props.emitValueHome(bookId,currentShelf,newShelf)

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {SHELF_TYPE[props.bookShelfType as keyof typeof SHELF_TYPE]}
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((item: any, index: number) => (
                        <Book book={item} isEmitAfterChanged={true} emitValue={getReturnValue} key={index}/>
                    ))}
                </ol>
            </div>
        </div>
    );
};
