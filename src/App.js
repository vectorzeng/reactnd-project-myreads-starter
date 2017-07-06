/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react";
import './App.css';
import MyReads from "./component/MyReads";
import SearchBooks from "./component/SearchBooks";

export default class BooksApp extends React.Component {

    render(){
        return (<div>
            {/*<MyReads />*/}
            <SearchBooks />
        </div>);
    }
}