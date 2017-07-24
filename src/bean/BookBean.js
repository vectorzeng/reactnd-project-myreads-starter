/**
 * Created by vectorzeng on 17/7/7.
 */

export default class BookBean{
    constructor() {
        this.authors = "";
        this.imageLinks = {smallThumbnail: "", thumbnail: ""};
        this.infoLink = "";
        this.title = "title";
    }

    static getAuthors(b){
        if(b) return b.authors;
    }

    static getSmallThumbnail(b){
        if(b) return b.imageLinks && b.imageLinks.smallThumbnail;
    }

    static getInfoLink(b){
        if(b) return b.infoLink;
    }

    static getTitle(b){
        if(b) return b.title;
    }
}