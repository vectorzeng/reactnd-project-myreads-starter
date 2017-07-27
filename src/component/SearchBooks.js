/**
 * Created by vectorzeng on 17/7/6.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {PATH_ROOT} from "../path/RoutePath";
import {getAll, search} from "../BooksAPI";
import BookGrid from "./BookGrid";
import ReactLoading from "react-loading";
import MY_BOOKS_UPDATER from "../util/MyBooksUpdater";
import BookBean from "../bean/BookBean";


export default class SearchBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            books:[],/*BookBean 's array*/
            kw:"",
            isLoading:false,
        };
        this.isMyBooksReady = false,
        this.myBooks = null;
    }

    componentDidMount(){
        this.isMyBooksReady = false;
        MY_BOOKS_UPDATER.getAll((succeed, myBooks)=>{
            this.isMyBooksReady = true;
            if(succeed) this.myBooks = myBooks;
            this.updateBooks(this.state.books);
        });
    }


    /**
     * @param forceUpdate
     *   if false then must be both myBooks and books data is ready
     */
    updateBooks(books){
        console.log("---------SearchBooks", books);

        //wait for myBooks's data to ready,
        if(!this.isMyBooksReady){
            return;
        }
        if(!books || books.error || books.length <= 0){
            books = null;
        }else{
            //update shelf
            let myBooks = this.myBooks;
            books = books.map((b) => {
                if(myBooks){
                    for(let i = 0; i < myBooks.length; i++){
                        if(BookBean.equals(b, myBooks[i])){
                            BookBean.setShelf(b, BookBean.getShelf(myBooks[i]));
                            return b;
                        }
                    }
                }
                BookBean.setShelf(b, "none");
                return b;
            });
        }

        this.setState({
            books:books,
            isLoading:false,
        });

    }

    onChangeKw=(event)=>{

        let kw = event.target.value;
        let isLoading = Boolean(kw);//if kw is empty , need not to load
        let books = isLoading?this.state.books:null;//if kw is empty then show no books

        if(this.timeoutRet !== null && this.timeoutRet !== undefined){
            clearTimeout(this.timeoutRet);
            this.timeoutRet = null;
        }

        if(isLoading) {
            this.timeoutRet = setTimeout(() => {
                if (this.state.kw) {
                    console.warn("search kw:", this.state.kw);
                    search(this.state.kw, 30).then((books) => {
                        if(this.state.kw === kw){//if kw is changed ,drop it
                            this.updateBooks(books);
                        }else{
                            console.warn("search fetched kw is empty, then do nothing");
                        }
                    });
                } else {
                    // do nothing
                    console.warn("search kw is null do nothing", this.state.kw);
                }
            }, 300);

            console.log("onChangeKw-------setTimeout", this.state.kw, this.timeoutRet);
        }


        this.setState({
            isLoading:isLoading,
            kw,
            books,
        });

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