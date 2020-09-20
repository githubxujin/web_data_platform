import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'
/* Router Modules*/
//资源
import resource from './modules/resource'
//公共服务
import service from './modules/service'
//医药
import drug from './modules/drug'
import config from './modules/config'
//基建
import infrastructure from './modules/infrastructure';
import industryData from './modules/industryData';
//中登
import zhongdeng from './modules/zhongdeng';

// -------------------- 迁移内容 ----------------------

// 黑白名单库
import blackWhite from './modules/blackWhite'
// 到货视频
import arrivalVideo from './modules/arrivalVideo'
// 风控舆情
import riskControl from './modules/risk-control';
// 反欺诈小工具
import dataTools from './modules/data-tools';

// -------------------- 迁移内容 ----------------------

// 保理公司
import financing from './modules/financing'
// 监控企业
import monitoringFirm from './modules/monitoring-firm'

Vue.use(Router)
export const constantRoutes = [{
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        // component: () => import('@/views/home/index'),
        component: Layout,
        redirect: '/industrial-policy',
        children: [{
            path: '/home',
            component: () => import('@/views/home/index'),
            name: 'home',

        }]
    },
    {
        path: '/demo',
        component: () => import('@/views/demo/index.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    infrastructure,
    industryData,
    resource,
    drug,
    service,
    blackWhite,
    riskControl,
    arrivalVideo,
    config,
    dataTools,
    zhongdeng,
    financing,
    monitoringFirm
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
