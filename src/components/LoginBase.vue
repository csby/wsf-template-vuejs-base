<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'
    import JsEncrypt from 'jsencrypt/bin/jsencrypt'

    @Component({
        watch: {
            "autoLogin": {
                handler: "autoLoginChanged"
            },
            "rememberAccount": {
                handler: "rememberAccountChanged"
            }
        }
    })
    export default class LoginBase extends VueBase {
        errSummary = ""
        errDetail = ""
        captchaLength = 5
        captchaWidth = 120
        captchaHeight = 40
        loadingCaptcha = false
        captchaRequired = false
        captchaId = ""
        captchaVal = ""
        rsaPublicKey = ""
        logining = false
        accountVal = ""
        passwordVal = ""
        backPath = "/"
        autoLogin = false
        rememberAccount = false
        initialized = false
        firstGetedCaptcha = false;

        onInputChanged() {
            this.errSummary = "";
            this.errDetail = "";
        }

        autoLoginChanged(newVal, oldVal) {
            if(newVal === oldVal) {
                return;
            }

            if(!this.initialized) {
                return;
            }

            if(newVal) {
                this.rememberAccount = true
            }

            this.$db.set(this.$db.keys.autoLogin, newVal);
        }

        rememberAccountChanged(newVal, oldVal) {
            if(newVal === oldVal) {
                return;
            }

            if(!this.initialized) {
                return;
            }

            if(!newVal) {
                this.autoLogin = false;
            }

            this.$db.set(this.$db.keys.rememberAccount, newVal);
        }

        onGetCaptchaImage(image) {
        }

        onGetCaptcha(code, err, data) {
            this.loadingCaptcha = false;
            if (code === 0) {
                this.captchaId = data.id;
                this.rsaPublicKey = data.rsaPublicKey;
                this.captchaRequired = data.required;
                this.onGetCaptchaImage(data.value);

                if(this.firstGetedCaptcha === false) {
                    this.firstGetedCaptcha = true;
                    this.doAutoLogin();
                }
            }
            else {
                this.onGetCaptchaImage("")
            }
        }
        getCaptcha() {
            let argument = {
                length: this.captchaLength,
                width: this.captchaWidth,
                height: this.captchaHeight
            };

            this.loadingCaptcha = true;
            this.post(this.$uris.getCaptcha, argument, this.onGetCaptcha);
        }

        onPrelogin(account, password, captcha) {
            return true;
        }
        onPostLogin(code, err, data) {

        }

        onLoginInterceptor(response) {
            if(response.data) {
                if(response.data.code === 0) {
                    let host = this.$net.getHost(response.request.responseURL);
                    this.$db.set(this.$db.keys.host, host);
                }
            }

            return response;
        }

        onLogin(code, err, data) {
            this.logining = false;
            this.errSummary = "";
            this.errDetail = "";
            if (code === 0) {
                this.$db.set(this.$db.keys.token, data.token);
                this.$db.set(this.$db.keys.account, data.account);
                this.$db.set(this.$db.keys.name, data.name);
                this.$db.set(this.$db.keys.authorized, true);
                if(this.autoLogin) {
                    this.$db.set(this.$db.keys.password, this.passwordVal, true);
                }
                else {
                    this.$db.remove(this.$db.keys.password);
                }

                this.to(this.backPath);
            }
            else {
                this.errSummary = err.summary;
                this.errDetail = err.detail;
                this.$db.set(this.$db.keys.authorized, false);
                this.getCaptcha();
            }

            this.onPostLogin(code, err, data);
        }
        login() {
            let accountVal = this.accountVal.trim();
            let passwordVal = this.passwordVal;
            let captchaVal = this.captchaVal.trim();
            if(!this.onPrelogin(accountVal, passwordVal, captchaVal)) {
                return;
            }

            let pwdType = "";
            let pwdVal = passwordVal;
            if(this.isNotNullOrEmpty(this.rsaPublicKey)) {
                let jsEncrypt = new JsEncrypt();
                jsEncrypt.setPublicKey(this.rsaPublicKey);
                pwdVal = jsEncrypt.encrypt(passwordVal);
                pwdType = "rsa";
            }

            let argument = {
                account: accountVal,
                password: pwdVal,
                captchaId: this.captchaId,
                captchaValue: captchaVal,
                encryption: pwdType
            };

            this.errSummary = "";
            this.errDetail = "";
            this.logining = true;
            this.$net.post(this.$uris.login, argument, this.onLogin, this.onLoginInterceptor);
        }

        doAutoLogin() {
            if(this.autoLogin !== true) {
                return;
            }
            if(this.captchaRequired) {
                return;
            }

            this.login();
        }

        mounted() {
            if(this.$route.params.backPath) {
                this.backPath = this.$route.params.backPath;
            }

            let rememberAccount = this.$db.get(this.$db.keys.rememberAccount);
            if(rememberAccount === true) {
                this.rememberAccount = rememberAccount;
                let account = this.$db.get(this.$db.keys.account);
                if(this.isNotNullOrEmpty(account)) {
                    this.accountVal = account;
                }

                let password = this.$db.get(this.$db.keys.password, true);
                if(this.isNotNullOrEmpty(password)) {
                    this.passwordVal = password;
                }
            }
            let autoLogin = this.$db.get(this.$db.keys.autoLogin);
            if(autoLogin === true) {
                this.autoLogin = autoLogin;
            }

            this.getCaptcha();

            this.initialized = true;
        }
    }
</script>
