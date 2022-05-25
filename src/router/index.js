import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout/index.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: "/Dashboard",
                name: "Dashboard",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Dashboard/index.vue"),

            },
            {
                path: "/Earn",
                name: "Earn",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Earn/index.vue"),

            },
            {
                path: "/Borrow",
                name: "Borrow",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Borrow/index.vue"),

            },
            {
                path: "/Govern",
                name: "Govern",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Govern/index.vue"),

            },
            {
                path: "/Mypage",
                name: "Mypage",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Mypage/index.vue"),
            },
        ]
    },

]

const router = new Router({
    // mode: "history",
    base: "/Dashboard",
    scrollBehavior: () => ({ y: 0 }),
    routes,
});


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    // const hasToken = getToken()
    if (to.path == "/") {
        next({ path: '/Dashboard' })
    } else {
        next();
    }

})
export default router
