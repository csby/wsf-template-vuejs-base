import Key from './key'

const keys = Key.keys
const clearKeys = Key.clearKeys

function set(k, v, encrypted = false) {
    let item = {
        e: encrypted,
        v: v
    }
    if(encrypted === true) {
        item.v = window.btoa(v);
    }
    localStorage.setItem(k, JSON.stringify(item));
}

function get(k) {
    let v = localStorage.getItem(k);
    if(v) {
        try {
            let item = JSON.parse(v);
            if(item.e === true) {
                return window.atob(item.v);
            } else {
                return item.v;
            }
        } catch (err) {
            console.log(err);
        }
    }

    return null;
}


function remove(k) {
    localStorage.removeItem(k);
}

function clear() {
    for (let i = 0; i < clearKeys.length; i++) {
        localStorage.removeItem(clearKeys[i]);
    }
}

function authorized() {
    let v = get(keys.authorized)
    if(v === true) {
        return true;
    }
    return false
}

export default {
    keys,
    authorized,
    set,
    get,
    remove,
    clear
}