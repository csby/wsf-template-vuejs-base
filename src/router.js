import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: function(to, from, next) {
                let authorized = Vue.prototype.$db.authorized();
                console.log("authorized: " + authorized);
                if(authorized) {
                    next(false);
                }
                else {
                    next(true);
                }
            },
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})