/**
 * Created by vectorzeng on 17/7/27.
 */
import {getAll} from "../BooksAPI";
class MyBooksUpdater{

    constructor(){
        this.tempBoooks = null;
    }

    fetchAll(callback) {
        getAll().then( (books)=>{
            let succeed = (books && !books.error);
            if(succeed) this.tempBoooks = books;
            if(callback) {
                callback(succeed, books);
            }
        });
    }

    getAll(callback){
        if(!this.tempBoooks){
            this.fetchAll(callback);
            return;
        }
        callback(true, this.tempBoooks);
        return this.tempBoooks;
    }
}
const MY_BOOKS_UPDATER = new MyBooksUpdater();
export default MY_BOOKS_UPDATER;