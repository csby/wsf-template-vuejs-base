<template>
    <div class="home">
        <div>
            <div>主页</div>
            <div style="font-size: small">({{frontVersion}})</div>
        </div>
        <div>
            <img alt="logo" src="../assets/logo.png">
        </div>
        <LoginUser v-if="this.$db.authorized()" />
        <router-link v-else to="/login">登陆</router-link>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'
    import Version from '@/version'
    import LoginUser from '@/components/auth/LoginUser'

    @Component({
        components: {
            LoginUser
        }
    })
    export default class Home extends VueBase {
        frontVersion = Version.version
    }
</script>

<style scoped lang="scss">
    .home {
        text-align: center;
    }
</style>