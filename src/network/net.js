import Axs from 'axios'
import Url from './url'
import Uri from './uri'
import Db from '../database/db'
import HttpHandler from './httpHandler'

const baseUrl = Url.getUrl()
const uris = Uri.uris
const db = Db

function getHost(url) {
    return Url.getHost(url);
}

// example
//  uri: "/api/info"
//  argument: {id: "111212323"}
//  handler: function(code, error, data){ }
//  interceptor: function(response){ return response; }
function post(uri, argument, handler, interceptor) {
    let config = {
        timeout: 30000,
        baseURL: baseUrl,
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        }
    };
    let token = db.get(db.keys.token);
    if(token) {
        config.headers = {
            "Content-Type": "text/plain;charset=utf-8",
            "token": token
        }
    }
    let httpHandler = HttpHandler.create(handler);
    let http = Axs.create(config);
    if(interceptor) {
        http.interceptors.response.use(interceptor, function (error) {
                return Promise.reject(error);
            });
    }

    http.post(uri, argument).then(httpHandler.onResponse).catch(httpHandler.onError);
}

// example
//  uri: "/api/upload"
//  argument: {id: "111212323"}
//  handler: function(code, error, data){ }
//  interceptor: function(response){ return response; }
//  uploadProgress: function(progressEvent) {
//      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
//  }
function upload(uri, argument, handler, interceptor, uploadProgress) {
    let config = {
        timeout: 300000,
        baseURL: baseUrl,
        onUploadProgress: uploadProgress,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    let token = db.get(db.keys.token);
    if(token) {
        config.headers = {
            "Content-Type": "text/plain;charset=utf-8",
            "token": token
        }
    }
    let httpHandler = HttpHandler.create(handler);
    let http = Axs.create(config);
    if(interceptor) {
        http.interceptors.response.use(interceptor,
            function (error) {
                return Promise.reject(error);
            });
    }

    http.post(uri, argument).then(httpHandler.onResponse).catch(httpHandler.onError);
}

// example
//  uri: "/user/info"
//  message: function(evt) {
//      console.log("data:", evt.data);
//      console.log("origin:", evt.origin);
//      console.log("origin:", evt.ports);
//      console.log("origin:", evt.source);
//  }
//  open: function(){ }
//  close: function(){ }
//  error: function(evt) { console.log(evt.type); }
function createSocket(uri, message, open, close, error) {
    let protocol = "ws";
    if(document.location.protocol === "https:") {
        protocol = "wss";
    }
    let host = db.get(db.keys.host);
    let token = db.get(db.keys.token);
    let url = protocol + "://" + host + uri + "?token=" + token;
    try {
        let ws = new WebSocket(url);

        if(message) {
            ws.onmessage = message;
        }

        if(open) {
            ws.onopen = open;
        }

        if(close) {
            ws.onclose = close;
        }

        if(error) {
            ws.onerror = error;
        }

        return ws;

    } catch (err) {
        console.log(err);
    }

    return null;
}

export default {
    baseUrl,
    uris,
    db,
    getHost,
    post,
    upload,
    createSocket
}