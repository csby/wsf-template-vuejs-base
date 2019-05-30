<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'

    @Component
    export default class LogoutBase extends VueBase {
        onLogout(code, err, data) {
            if (code === 0) {
                if(data) {
                    let account = this.$db.get(this.$db.keys.account);
                    let password = this.$db.get(this.$db.keys.password, true);
                    let autoLogin = this.$db.get(this.$db.keys.autoLogin);
                    let rememberAccount = this.$db.get(this.$db.keys.rememberAccount);

                    this.$db.clear();

                    if(rememberAccount === true) {
                        this.$db.set(this.$db.keys.account, account);
                    }
                    if(autoLogin === true) {
                        this.$db.set(this.$db.keys.password, password, true);
                    }
                    this.$db.set(this.$db.keys.autoLogin, false);

                    this.$evt.fire(this.$evt.local.logout, account)
                    this.to("/login");
                }
            }
            else {
                this.error(err);
            }
        }

        logout() {
            this.post(this.$uris.logout, null, this.onLogout);
        }
    }
</script>