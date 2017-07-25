/**
 * Created by vectorzeng on 17/7/6.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {PATH_ROOT} from "../path/RoutePath";
import {getAll, search} from "../BooksAPI";
import BookGrid from "./BookGrid";
import ReactLoading from "react-loading";

export default class SearchBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            books:[],/*BookBean 's array*/
            kw:"",
            isLoading:false,
        };
    }


    updateBooks(books){
        console.log("---------SearchBooks", books);
        if(!books || books.error){
            books = null;//get nothing
        }
        this.setState({
            books:books,
            isLoading:false,
        });
    }

    onChangeKw=(event)=>{
        this.setState({
            kw:event.target.value,
        });
        if(this.timeoutRet){
            clearTimeout(this.timeoutRet);
        }

        this.setState({
            isLoading:true,
        });
        this.timeoutRet = setTimeout(()=>{

            if(this.state.kw) {
                console.warn("search kw:", this.state.kw);
                search(this.state.kw, 30).then((books) => {
                    this.updateBooks(books);
                });
            }else{
                // do nothing
            }
        }, 300);

    };


    render() {
        const {kw, books, isLoading} = this.state;
        let planeClass;
        if(books && books.length > 0){
            planeClass = "loading-plane";
        }
        return (
            <div className="search-books" ref={(e)=>{this.contains = e}}>
                <div className="search-books-bar">
                    <Link className="close-search" to={PATH_ROOT}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input value={kw}
                               type="text"
                               onChange={this.onChangeKw}
                               placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookGrid books={books}/>
                </div>
                {isLoading &&
                    <div className={planeClass}>
                        <ReactLoading className="loading" type="spin" color="#400"/>
                    </div>
                }
            </div>
        );
    }
}