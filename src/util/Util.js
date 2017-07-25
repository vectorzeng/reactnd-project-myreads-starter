/**
 * Created by vectorzeng on 17/7/25.
 */


export const SHELVES_VALUES = [
    {value: "moveTo", title: "Move to...", disabled: true},
    {value: "currentlyReading", title: "currently reading"},
    {value: "wantToRead", title: "Want to Read",},
    {value: "read", title: "read"},
    {value: "none", title: "none"},
];

export function getShelfValue(shelf){
    if(!shelf) return;
    for(let i = 0; i < SHELVES_VALUES.length; i++){
        if( shelf === SHELVES_VALUES[i].value){
            return SHELVES_VALUES[i];
        }
    }
}

export function getShelfTitle(shelf) {
    if(!shelf) return;
    let value = getShelfValue(shelf);
    if(value){
        return value.title;
    }
}
