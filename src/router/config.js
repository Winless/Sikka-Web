import TabsView from '@/layouts/tabs/TabsView'
import PageView from "../layouts/PageView";
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
    routes: [


        {
            path: '/',
            name: 'home',
            component: TabsView,
            redirect: 'home',
            meta: {
                icon: '',
                page: {
                    closable: true
                }
            },
            children: [
                {
                    path: 'home',
                    name: 'home',
                    meta: {
                        icon: '',
                        page: {
                            closable: true
                        }
                    },
                    component: () => import('@/pages/home/index'),
                },
            ]
        },
    ]
}

export default options


