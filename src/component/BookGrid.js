/**
 * Created by vectorzeng on 17/7/6.
 */

import React, {Component} from "react";
import Book from "./Book";

export default class BookGrid extends Component {

    render() {
        const {books} = this.props;
        let items = null;
        if (books) {
            items = books.map((book, i) => {
                return <li key={i}>
                    <Book bookBean={book}/>
                </li>;
            });
        }
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {items}
                </ol>
            </div>);
    }
}
