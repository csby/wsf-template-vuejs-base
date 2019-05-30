function HttpHandler(fun) {
    let handler = fun;
    this.onResponse = function(response) {
        if(handler) {
            if(response.data.code === 0) {
                handler(0, "", response.data.data);
            }
            else {
                handler(response.data.code, response.data.error, null);
            }
        }
    };

    this.onError = function(error) {
        if(handler) {
            let err = {
                summary: "未知错误",
                detail: error.message
            };
            handler(-1, err, null);
        }
    };
}

function create(handler) {
    return new HttpHandler(handler);
}

export default {
    create
}