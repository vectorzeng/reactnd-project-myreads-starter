/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react"
import Bookshelf from "./Bookshelf";
import {Link} from "react-router-dom";
import {PATH_SEARCH} from "../path/RoutePath";
import {getAll} from "../BooksAPI";
import {getShelfTitle} from "../util/Util";
import BOOK_UPDATER from "../util/BookUpdater";
import BookBean from "../bean/BookBean";
import MY_BOOKS_UPDATER from "../util/MyBooksUpdater";

export default class MyReads extends Component{

    constructor(props){
        super(props);
        this.state = {
            /**
             * {
             *  currentlyReading:[b1,b2……]
             *  wantToRead:[b3,b4……]
             *  ……
             * }
             *
             * */
            shelves:{}
        };
    }

    onBookUpdate = (succeed,newShelf,bean) => {
        console.log("-------onBookUpdate1", succeed, newShelf, bean);
        if(succeed){//change shelf succeed
            let oldShelf = BookBean.getShelf(bean);
            let newStateShelves = this.state.shelves;
            //remove bean from oldShelf
            newStateShelves[oldShelf] = newStateShelves[oldShelf].filter((e)=>{
                return e !== bean;
            });
            //change bean
            BookBean.setShelf(bean, newShelf);
            //add bean from oldShelf
            if(!newStateShelves[newShelf]){
                newStateShelves[newShelf] = [];
            }
            newStateShelves[newShelf].push(bean);
            //update state
            this.setState({shelves:newStateShelves});
            return true;
        }
    };

    componentDidMount(){
        BOOK_UPDATER.setListener(this.onBookUpdate);
        MY_BOOKS_UPDATER.fetchAll((succeed, books)=>{
            let shelves = {};
            if(succeed){
                books.map((e)=>{
                    if(e.shelf){
                        if(!shelves[e.shelf]){
                            shelves[e.shelf] = [];
                        }
                        shelves[e.shelf].push(e);
                    }
                });
                this.setState({shelves});
            }else{
                alert("get all shelf failed");
            }
        });
    }

    componentWillUnmount(){
        BOOK_UPDATER.setListener(null);
    }

    render(){
        const {shelves} = this.state;
        let bookShelfArray=[];
        for(let s in shelves){
            //must not be function
            if(typeof shelves[s] === "function"){
                continue;
            }
            let title = getShelfTitle(s);
            if(!title){
                title = "Other";
            }
            let books = shelves[s];
            bookShelfArray.push(<Bookshelf
                key={"bookshelf_" + s}
                title={title}
                books={books}
            />);
        }
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {/*put Bookshelf at here*/}
                    <div>
                        {/*<Bookshelf title="Currently reading"/>*/}
                        {bookShelfArray}
                    </div>
                </div>
                <div className="open-search">
                    <Link to={PATH_SEARCH}>Add a book</Link>
                </div>
            </div>
        );
    }
}