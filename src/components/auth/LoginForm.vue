<template>
    <table class="table" v-loading="logining" element-loading-text="登录中...">
        <tr>
            <td colspan="2" style="">
                <el-input placeholder="请输账号"
                          v-model="accountVal"
                          ref="account"
                          :clearable="true"
                          :autofocus="true"
                          @input="onInputChanged"
                          @keyup.enter.native="login">
                    <i slot="prepend" class="el-icon-user-solid prefix" />
                </el-input>
            </td>
        </tr>
        <tr valign="middle">
            <td colspan="2" class="password">
                <el-input placeholder="请输秘密"
                          v-model="passwordVal"
                          ref="password"
                          :clearable="true"
                          type="password"
                          :show-password="true"
                          @input="onInputChanged"
                          @keyup.enter.native="login">
                    <i slot="prepend" class="el-icon-lock prefix" />
                </el-input>
            </td>
        </tr>
        <tr v-show="captchaRequired">
            <td>
                <el-input placeholder="请输验证码" style="flex: 1 1 0%;"
                          v-model="captchaVal"
                          ref="captcha"
                          :clearable="true"
                          @input="onInputChanged"
                          @keyup.enter.native="login">
                    <i slot="prepend" class="el-icon-s-grid prefix" />
                </el-input>
            </td>
            <td>
                <el-tooltip content="点击刷新验证码" effect="dark" placement="right" >
                    <img :src="captchaImg" class="image" alt="获取验证码失败" @click="getCaptcha"/>
                </el-tooltip>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                <el-checkbox v-model="rememberAccount">记住账号</el-checkbox>
                <el-link v-if="isNotNullOrEmpty(forgetPassword)" :href="forgetPassword" :underline="false">忘记密码</el-link>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <Error :summary="errSummary" :detail="errDetail"/>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <el-button type="primary" class="btn" @click="login">登 录</el-button>
            </td>
        </tr>
    </table>
</template>

<script>
    import Component from 'vue-class-component'
    import LoginBase from '@/components/LoginBase'
    import Error from '@/components/Error'

    @Component({
        components: {
            Error
        },
        props: {
            forgetPassword: {
                type: String,
                default: ""
            }
        }
    })
    export default class LoginForm extends LoginBase {
        captchaImg = ""

        onGetCaptchaImage(image) {
            this.captchaImg = image;
        }

        onPrelogin(account, password, captcha) {
            if(this.isNullOrEmpty(account)) {
                this.errSummary = "账号不能为空";
                this.$refs["account"].focus();
                return false;
            }

            if(this.isNullOrEmpty(password)) {
                this.errSummary = "密码不能为空";
                this.$refs["password"].focus();
                return false;
            }

            if(this.captchaRequired) {
                if(this.isNullOrEmpty(captcha)) {
                    this.errSummary = "验证码不能为空";
                    this.$refs["captcha"].focus();
                    return false;
                }
            }

            return true;
        }

        onPostLogin(code, err, data) {
            if(code === 201) {
                this.$refs["captcha"].focus();
            }
            else if(code === 202) {
                this.$refs["account"].focus();
            }
            else if(code === 203) {
                this.$refs["password"].focus();
            }
        }


        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .table {
        padding-top: 15px;
        width: 100%;
    }

    .account .password {
        padding: 30px;
        width: 500px;
    }

    .prefix {
        color: lightskyblue;
    }

    .image {
        width: 120px;
        height: 40px;
        border: 0;
        margin-left: 5px;
        border-radius: 5px;
        font-size: x-small;
        cursor: pointer;
        background-color: lightgray;
        color: red;
    }

    .btn {
        margin-top: 10px;
        width: 100%;
    }
</style>