/**
 * Created by vectorzeng on 17/7/6.
 */

import React, {Component} from "react";
import Book from "./Book";

export default class BookGrid extends Component {

    render() {
        const {array} = this.props;
        const items = array.map(() => {
            return <li>
                <Book/>
            </li>;
        });
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {items}
                </ol>
            </div>);
    }
}
