import {useState} from "react";
import {debounce as _debounce} from "lodash";
import {search} from "../../api/BooksAPI";
import {Book} from "../../components/Book/Book.component";
import {IBook} from "../../models/book.model";

export const Search = () => {
    const [books, setBooks] = useState<IBook[]>([]);

    const [prevSearchInput, setPrevSearchInput] = useState("");

    const [emptySearch, setEmptySearch] = useState(true)

    const [searchValue, setSearchValue] = useState('')

    const onChangeInput = _debounce((searchValue: string) => {
        setBooks([])

        setSearchValue(searchValue)

        if (searchValue.length === 0) {
            setEmptySearch(true)

            return
        }

        if (searchValue.length > 0 && searchValue !== prevSearchInput) {
            search(searchValue, 100).catch(err => {
                console.log(err)
            }).then((books: any) => {
                if (books.error) {
                    setEmptySearch(true)
                    return;
                } else {
                    setEmptySearch(false)
                }

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
                    {emptySearch ? searchValue.length > 0 ? <h3>No result found </h3> :
                        <h3>Please input something</h3> : ''}
                    {books &&
                        books.map((item: IBook, index: number) => (
                            <Book book={item} isReloadAfterChanged={false} key={index}/>
                        ))}
                </ol>
            </div>
        </div>
    );
};
