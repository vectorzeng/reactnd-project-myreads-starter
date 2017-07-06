/**
 * Created by vectorzeng on 17/7/6.
 */
import React, {Component} from "react";

export default class SearchBooks extends Component {

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => {
                        console.log("close search");
                    }}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        );
    }
}