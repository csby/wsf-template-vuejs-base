<template>
    <div class="background">
        <div class="container">
            <div class="body">
                <loginForm/>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'
    import LoginForm from '@/components/auth/LoginForm'

    @Component({
        components: {
            LoginForm
        }
    })
    export default class Login extends VueBase {
        
    }
</script>

<style scoped lang="scss">
    .background {
        display: flex;
        align-items: center;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(15deg, darkblue, skyblue);
    }

    .container {
        display: flex;
        align-items: center;
        position: absolute;
        margin: auto;
        padding: 0px;
        width: 390px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .body {
        flex: 1;
        padding: 10px 30px 25px 30px;
        border-radius: 10px;
        background-color: white;
        box-shadow: -5px 5px 10px black;
    }
</style>