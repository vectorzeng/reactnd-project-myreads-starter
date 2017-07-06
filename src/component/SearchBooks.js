/**
 * Created by vectorzeng on 17/7/6.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {PATH_ROOT} from "../path/RoutePath";

export default class SearchBooks extends Component {

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={PATH_ROOT}>Close</Link>
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