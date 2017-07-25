/**
 * Created by vectorzeng on 17/7/6.
 */
import React from "react"
import BookGrid from "./BookGrid";
import PropTypes from "prop-types"


function Bookshelf({title,books}) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <BookGrid books={books}/>
        </div>
    );
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Bookshelf;
