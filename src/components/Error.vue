<template>
    <div class="row">
        <span class="msg">
            <span class="msg">{{summary}}</span>
            <span v-if="holder">&nbsp;</span>
        </span>
        <el-popover trigger="click" placement="top-end" title="错误详细信息" :content="detail" v-show="detailVisible">
            <el-button slot="reference" type="text" icon="el-icon-question" style="padding: 0px 1px 0px 5px;" />
        </el-popover>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
        props: {
            summary: {
                type: String,
                default: ""
            },
            detail: {
                type: String,
                default: ""
            },
            holder: {
                type: Boolean,
                default: true
            }
        }
    })
    export default class Error extends Vue {
        get detailVisible() {
            if(this.detail === undefined ||
                this.detail === null ||
                this.detail === "" ||
                this.detail === "\u003cnil\u003e") {
                return false
            }

            return true;
        }
    }
</script>

<style scoped lang="scss">
    row {
        display: flex;
        align-items: center;
        padding: 0px;
        margin: 0px;
    }

    .msg {
        flex: 1;
        color: red;
    }
</style>