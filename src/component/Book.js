/**
 * Created by vectorzeng on 17/7/6.
 */

import React, {Component} from "react"
import PropTypes from "prop-types";
import BookBean from "../bean/BookBean";
import {update} from "../BooksAPI";
import {SHELVES_VALUES} from "../util/Util"

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
        console.log(shelf);
        update(bean, shelf).then((e)=>{
            let array = e[shelf];
            if(array){
                let i = array.length-1;
                for(; i >=0; i--){
                    if(bean.id === array[i]){//update succeed
                        console.log("handleChange3 update shelf succeed");
                        // BookBean.setShelf(bean, shelf);
                        this.setState({
                            shelf,
                        });
                        break;
                    }
                }
                if(i < 0){
                    alert("change shelf failed");
                }

            }
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
                    <select name="shelf" value={this.state.shelf} onChange={this.handleChange}>
                        {opts}
                    </select>
                </div>
            </div>
            <div className="book-title">{BookBean.getTitle(bookBean)}</div>
            <div className="book-authors">{BookBean.getAuthors(bookBean)}</div>
        </div>);
    }
}


