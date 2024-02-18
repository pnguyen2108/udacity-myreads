import {useState} from "react";
import {debounce as _debounce} from "lodash";
import {search} from "../../api/BooksAPI";
import {Book} from "../../components/Book/Book.component";
import {IBook} from "../../models/book.model";

export const Search = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [prevSearchInput, setPrevSearchInput] = useState("");

    const onChangeInput = _debounce((searchValue: string) => {
        if (searchValue.length > 0 && searchValue !== prevSearchInput) {
            search(searchValue, 100).then((books: IBook[]) => {
                setBooks(() => books);
            });

            setPrevSearchInput(searchValue);
        }
    }, 500);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a href="/" className="close-search">
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        onChange={(searchValue) => onChangeInput(searchValue.target.value)}
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books &&
                        books.map((item: IBook, index: number) => (
                            <Book book={item} isReloadAfterChanged={false} key={index}/>
                        ))}
                </ol>
            </div>
        </div>
    );
};
