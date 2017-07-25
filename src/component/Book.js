/**
 * Created by vectorzeng on 17/7/6.
 */

import React, {Component} from "react"
import PropTypes from "prop-types";
import BookBean from "../bean/BookBean";
import {update} from "../BooksAPI";
import {SHELVES_VALUES} from "../util/Util";
import BOOK_UPDATER from "../util/BookUpdater";

export default class Book extends Component {

    static propTypes = {
        /**
         * @see BookBean
         */
        bookBean: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        let shelf = BookBean.getShelf(props.bookBean);
        if(!shelf){
            shelf = "none";
        }
        this.state = {
            shelf:shelf,
            isUpdating:false,
        }
    }

    getStyle(bean) {
        const thumbnail = BookBean.getSmallThumbnail(bean);
        return {
            cover: {
                width: 128,
                height: 193,
                backgroundImage: `url("${thumbnail}")`,
            }
        }
    };

    handleChange = (e) =>{
        let shelf = e.target.value;
        const bean = this.props.bookBean;
        this.setState({
            isUpdating:true
        });
        BOOK_UPDATER.updateShelf(bean, shelf, (succeed, newShelf)=>{
            if(succeed){
                this.setState({
                    shelf:newShelf,
                });
            }else{
                alert("change shelf failed");
            }
            this.setState({
                isUpdating:false
            });
        });
    };

    render() {
        const {bookBean} = this.props;
        const style = this.getStyle(bookBean);
        // let {shelf} = this.state;
        let opts = SHELVES_VALUES.map((e) => {
            return (<option
                key={"shelf_option_" + e.value}
                value={e.value}
                disabled={e.disabled}
            >
                {e.title}
            </option>);
        });

        return (<div className="book">
            <div className="book-top">
                <a className="book-cover" style={style.cover}
                   href={BookBean.getInfoLink(bookBean)} target="_blank"/>
                <div className="book-shelf-changer">
                    <select name="shelf" value={this.state.shelf}
                            onChange={this.handleChange}
                            disabled={this.state.isUpdating}>
                        {opts}
                    </select>
                </div>
            </div>
            <div className="book-title">{BookBean.getTitle(bookBean)}</div>
            <div className="book-authors">{BookBean.getAuthors(bookBean)}</div>
        </div>);
    }
}


