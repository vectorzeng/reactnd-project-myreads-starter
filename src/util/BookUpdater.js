/**
 * Created by vectorzeng on 17/7/25.
 */


import {update} from "../BooksAPI";

/**
 *
 * @param bean
 * @param shelf
 * @param callback(succeed,newShelf,bean)
 */
class BookUpdater{

    /**
     *
     * @param l(succeed,newShelf,bean) return true callback will not call
     *
     */
    setListener(l){
        this.l = l;
    }

    callListener(succeed, shelf, bean){
        return this.l && this.l(succeed, shelf, bean);
    }

    updateShelf(bean, shelf, callback) {
        console.log("------updateShelf1", bean);
        update(bean, shelf).then((e) => {
            console.log("------updateShelf2", bean);
            console.log();
            let array = e[shelf];
            if (array) {
                let i = array.length - 1;
                for (; i >= 0; i--) {
                    if (bean.id === array[i]) {//update succeed
                        console.log("------updateShelf3", bean);
                        if(!this.callListener(true, shelf, bean)){
                            callback(true, shelf, bean);
                        }
                        return;
                    }
                }
            }
            console.log("------updateShelf4", bean);
            if(!this.callListener(true, shelf, bean)) {
                callback(false, shelf, bean);
            }
        });

    }
}
let BOOK_UPDATER = new BookUpdater();

export default BOOK_UPDATER;
