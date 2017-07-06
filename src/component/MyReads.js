/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react"
import Bookshelf from "./Bookshelf";
import {Link} from "react-router-dom";
import {PATH_SEARCH} from "../path/RoutePath";
export default class MyReads extends Component{

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {/*put Bookshelf at here*/}
                    <div>
                        <Bookshelf />
                    </div>
                </div>
                <div className="open-search">
                    <Link to={PATH_SEARCH}>Add a book</Link>
                </div>
            </div>
        );
    }
}