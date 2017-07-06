/**
 * Created by vectorzeng on 17/7/6.
 */
import React,{Component} from "react";
import './App.css';
import MyReads from "./component/MyReads";
import SearchBooks from "./component/SearchBooks";
import {Route} from "react-router-dom";
import {PATH_ROOT, PATH_SEARCH} from "./path/RoutePath";

export default class BooksApp extends Component {

    render(){
        return (<div>
            <Route exact path={PATH_ROOT} component={MyReads} />
            <Route path={PATH_SEARCH} component={SearchBooks}/>
        </div>);
    }
}