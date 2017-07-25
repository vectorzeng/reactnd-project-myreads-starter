/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react"
import Bookshelf from "./Bookshelf";
import {Link} from "react-router-dom";
import {PATH_SEARCH} from "../path/RoutePath";
import {getAll} from "../BooksAPI";
import {getShelfTitle} from "../util/Util";
export default class MyReads extends Component{

    constructor(props){
        super(props);
        this.state = {
            shelves:{}//map of data
        };
    }

    componentDidMount(){
        getAll().then((books)=>{
            console.log("------- MyReads", books);
            let shelves = {};
            if(books && !books.error){
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
        console.log("MyReads-------componentWillUnmount");
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