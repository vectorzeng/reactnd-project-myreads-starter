/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react"
import Bookshelf from "./Bookshelf";
export default class MyReads extends Component{

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    /*put Bookshelf at here*/
                    <div>
                        <Bookshelf />
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => ("")}>Add a book</a>
                </div>
            </div>
        );
    }
}