const prefix = "opt"
const clearKeys = new Array()

const keys = {
    // 接口主机: string
    host: key("host"),
    // 凭证: string
    token: key("token"),
    // 账号: string
    account: key("account"),
    // 密码: string
    password: key("password"),
    // 姓名: string
    name: key("name"),
    // 已授权: bool
    authorized: key("authorized"),
    // 自动登录: bool
    autoLogin: key("autoLogin", true),
    // 记住账号: bool
    rememberAccount: key("rememberAccount", true),
}

function key(v, reserved = false) {
    let key = prefix + v;
    if(reserved === false) {
        clearKeys.push(key);
    }
    return key;
}

export default {
    keys,
    clearKeys
}