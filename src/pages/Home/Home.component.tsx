import { groupBy as _groupBy } from "lodash";
import { useEffect, useState } from "react";

import { getAll } from "../../api/BooksAPI";
import { BookShelf } from "../../components/BookShelf/BookShelf.component";

export const Home = () => {
  const [bookList, setBookList] = useState<any>(null);

  useEffect(() => {
    getAll().then((books: any[]) => {
      const bookList = _groupBy(books, "shelf");

      const returnArr: any[] = [];

      for (let property in bookList) {
        returnArr.push(
          <BookShelf
            key={property}
            bookShelfType={property}
            books={bookList[property]}
          />
        );
      }

      setBookList(() => returnArr);
    });
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1> MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{bookList}</div>
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    </div>
  );
};
