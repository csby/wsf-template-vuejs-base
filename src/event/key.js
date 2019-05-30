const prefix = {
    local: "evt-local-",
    websocket: "evt-websocket-"
}

const local = {
    // 退出登录: (account)
    logout: lkey("logout"),
}

const websocket = {
    // 示例: (id, data)
    demo: wkey("demo"),
}


function lkey(v) {
    return prefix.local + v;
}

function wkey(v) {
    return prefix.websocket + v;
}

export default {
    local,
    websocket
}