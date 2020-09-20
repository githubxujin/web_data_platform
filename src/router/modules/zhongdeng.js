import Layout from '@/layout/index'
const zhongdengRouter = {
    path: '/zhongdeng',
    component: Layout,
    name: 'zhongdeng',
    redirect: '/zhongdeng/index',
    children: [{
            path: '/zhongdeng/index',
            name: 'zhongdeng-index',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据'
            }, {
                name: '中登应用'
            }],
            component: () => import('@/views/zhongdeng/index.vue')
        },
        {
            path: '/zhongdeng/index-detail',
            name: 'zhongdeng-index-detail',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据处理'
            }, {
                name: '中登应用',
                path: '/zhongdeng/index'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/zhongdeng/index-detail.vue')
        },        
        {
            path: '/zhongdeng/check-detail',
            name: 'zhongdeng-index',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据'
            }, {
                name: '中登应用'
            }, {
                name: '查重列表'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/zhongdeng/pages/check/detail.vue')
        },
        {
            path: '/zhongdeng/check-inner',
            name: 'check-inner',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据'
            }, {
                name: '中登应用'
            }, {
                name: '查重列表'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/zhongdeng/pages/check/detail-inner.vue')
        },
        {
            path: '/zhongdeng/info-detail',
            name: 'info-index',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据'
            }, {
                name: '中登应用'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/zhongdeng/pages/register-detail/detail.vue')
        },
        {
            path: '/zhongdeng/total-detail',
            name: 'info-index',
            meta: [{
                name: '公共服务'
            }, {
                name: '贷后数据'
            }, {
                name: '中登应用'
            }, {
                name: '登记汇总查询'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/zhongdeng/pages/register-total-overview.vue')
        }
    ]
}

export default zhongdengRouter
