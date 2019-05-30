import Vue from 'vue'
import Key from './key'

const eventBus = new Vue();
const keys = Key

function on(event, callback) {
    eventBus.$on(event, callback);
}

function off(event, callback) {
    eventBus.$off(event, callback);
}

function fire(eventName, ...args) {
    eventBus.$emit(eventName, ...args);
}

export default {
    on,
    off,
    fire,
    local: keys.local,
    websocket: keys.websocket
}