import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Net from '@/network/net'
import Evt from '@/event/bus'
import {
    Message,
    Loading,
    Input,
    Checkbox,
    Tooltip,
    Popover,
    Button,
    Link

} from 'element-ui'

Vue.prototype.$net = Net
Vue.prototype.$uris = Net.uris
Vue.prototype.$db = Net.db
Vue.prototype.$evt = Evt

Vue.prototype.$msg = Message
Vue.use(Loading)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Popover.name, Popover)
Vue.component(Button.name, Button)
Vue.component(Link.name, Link)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')