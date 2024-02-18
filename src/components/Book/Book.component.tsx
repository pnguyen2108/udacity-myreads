import './Book.component.css'
import {IBook} from "../../models/book.model";
import {cloneDeep as _cloneDeep} from "lodash";
import {useState} from "react";
import {update} from "../../api/BooksAPI";

export interface BookProps {
    book: IBook;
    isReloadAfterChanged?: boolean
}

export const Book = ({...props}: BookProps) => {

    const [book, setBook] = useState<IBook>(props.book)
    const onSelectShelf = (shelf: string) => {
        update(book, shelf).then(res => {
            if (res) {


                if (props.isReloadAfterChanged){
                    window.location.reload()
                } else {
                    setBook(_cloneDeep({
                        ...book, shelf: shelf
                    }))
                }
            }
        })
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf || 'none'} onChange={(event) => onSelectShelf(event.target.value)}>
                            <option value="none" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?.join(",")}</div>
            </div>
        </li>
    );
};
