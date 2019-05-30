<template>
    <div>
        <span>{{displayName}}</span>
        <span>，</span>
        <el-button @click="logout">注 销</el-button>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import LogoutBase from '@/components/LogoutBase'

    @Component
    export default class LoginUser extends LogoutBase {
        get displayName() {
            let name = this.$db.get(this.$db.keys.name);
            if(this.isNotNullOrEmpty(name)) {
                return name;
            }

            let account = this.$db.get(this.$db.keys.account);
            if(this.isNotNullOrEmpty(account)) {
                return account;
            }

            return "";
        }
    }
</script>

<style scoped lang="scss">
    
</style>