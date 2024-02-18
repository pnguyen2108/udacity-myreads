import {groupBy as _groupBy} from "lodash";
import {useEffect, useState} from "react";
import {cloneDeep as _cloneDeep} from "lodash";
import {getAll} from "../../api/BooksAPI";
import {BookShelf} from "../../components/BookShelf/BookShelf.component";
import {IBook} from "../../models/book.model";


export const Home = () => {
    const [bookList, setBookList] = useState<any>(null);

    useEffect(() => {
        getAll().then((books: any[]) =>
            setBookList(_groupBy(books, "shelf")
            ))
    }, []);

    const updateBookShevles = (bookId: string, currentShelf: string, newShelf: string) => {
        const currBookList = bookList;

        const bookIndex = currBookList[currentShelf].findIndex((book: IBook) => book.id === bookId)

        currBookList[newShelf].push(currBookList[currentShelf][bookIndex])

        currBookList[currentShelf].splice(bookIndex, 1)

        setBookList(() => _cloneDeep(currBookList));
    }


    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1> MyReads</h1>
                </div>
                <div className="list-books-content">

                    <div>{
                        bookList &&
                        Object.keys(bookList).map((type: string, index: number) =>
                            <BookShelf
                                key={index}
                                bookShelfType={type}
                                books={bookList[type]}
                                emitValueHome={updateBookShevles}
                            />)}</div>
                </div>
                <div className="open-search">
                    <a href="/search">Add a book</a>
                </div>
            </div>
        </div>
    );
};
