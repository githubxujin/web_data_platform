import Layout from '@/layout/index'

const resourceRouter = {
    path: '/monitoring',
    component: Layout,
    name: 'monitoring',
    redirect: '/monitoring',
    children: [

        // ---------- 操作配置-开始 -------------
        {
            path: '/monitoring',
            name: 'monitoring',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '监控企业配置'
            }],
            component: () => import('@/views/monitoring/monitoring.vue')
        },
        {
            path: '/allocation',
            name: 'allocation',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '监控企业分配'
            }],
            component: () => import('@/views/monitoring/allocation.vue')
        },
        {
            path: '/allocationAdd',
            name: 'allocationAdd',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '监控企业分配',
                path: '/allocation'
            }, {
                name: '新增'
            }],
            component: () => import('@/views/monitoring/allocationAdd.vue')
        },
        {
            path: '/allocationEdit/:id',
            name: 'allocationEdit',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '监控企业分配',
                path: '/allocation'
            }, {
                name: '编辑'
            }],
            component: () => import('@/views/monitoring/allocationEdit.vue')
        },
        // ---------- 操作配置-结束 -------------
    ]
}

export default resourceRouter
