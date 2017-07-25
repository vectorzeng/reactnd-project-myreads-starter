/**
 * Created by vectorzeng on 17/7/6.
 */
import React from "react"
import BookGrid from "./BookGrid";


function Bookshelf() {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookGrid array={[1,2,3,4]}/>
        </div>
    );
}

export default Bookshelf;
