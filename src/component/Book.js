/**
 * Created by vectorzeng on 17/7/6.
 */

import React, {Component} from "react"
import PropTypes from "prop-types";
import BookBean from "../bean/BookBean";

export default class Book extends Component {

    static propTypes = {
        /**
         * @see BookBean
         */
        bookBean:PropTypes.object.isRequired,
    };

    static getStyle(bean){
        const thumbnail = BookBean.getSmallThumbnail(bean);
        return {
            cover:{
                width: 128,
                height: 193,
                backgroundImage: `url("${thumbnail}")`,
            }
        }
    };

    render() {
        const {bookBean} = this.props;
        const style = Book.getStyle(bookBean);

        return (<div className="book"  >
            <div className="book-top">
                <a className="book-cover" style={style.cover}
                   href={BookBean.getInfoLink(bookBean)} target="_blank"/>
                <div className="book-shelf-changer" >
                    <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{BookBean.getTitle(bookBean)}</div>
            <div className="book-authors">{BookBean.getAuthors(bookBean)}</div>
        </div>);
    }
}