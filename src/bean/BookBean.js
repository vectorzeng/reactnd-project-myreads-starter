/**
 * Created by vectorzeng on 17/7/7.
 */

export default class BookBean{
    constructor() {
        this.authors = "";
        this.imageLinks = {smallThumbnail: "", thumbnail: ""};
        this.infoLink = "";
        this.title = "title";
        this.shelf = "";
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

    static getShelf(b){
        if(b) return b.shelf;
    }

    static setShelf(b, shelf){
        if(b) b.shelf = shelf;
    }

    static getId(b){
        if(b) return b.id;
    }

    static equals(b1, b2){
        if(b1 && b2) return b1.id === b2.id;
    }
}