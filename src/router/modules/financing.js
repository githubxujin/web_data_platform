import Layout from '@/layout/index'

const resourceRouter = {
    path: '/financing',
    component: Layout,
    name: 'financing',
    redirect: '/financing',
    children: [
        // ---------- 公共服务-开始 -------------
        // 4.2.2
        {
            path: '/financing',
            name: 'financing',
            meta: [{
                name: '公共服务',
            }, {
                name: '金融数据'
            }, {
                name: '金融机构'
            }, {
                name: '保理公司库'
            }],
            component: () => import('@/views/financing/index')
        },
        // 4.2.2
        {
            path: '/financing/detail',
            name: 'financing/detail',
            meta: [{
                name: '公共服务',
            }, {
                name: '金融数据'
            }, {
                name: '金融机构'
            }, {
                name: '保理公司库',
                path: '/financing'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/financing/financing-operation-detail.vue')
        },
        // ---------- 公共服务-结束 -------------

        // ---------- 操作配置-开始 -------------
        // 4.2.2
        {
            path: '/financing-operation',
            name: 'financing-operation',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '保理公司库数据更新'
            }],
            component: () => import('@/views/financing/financing-operation.vue')
        },
        // 4.2.2
        {
            path: '/financing-operation-add',
            name: 'financing-operation-add',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '保理公司库数据更新',
                path: '/financing-operation'
            }, {
                name: '保理公司新增'
            }],
            component: () => import('@/views/financing/financing-operation-add.vue')
        },
        // 4.2.2
        {
            path: '/financing-operation-detail',
            name: 'financing-operation-detail',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '保理公司库数据更新',
                path: '/financing-operation'
            }, {
                name: '保理公司详情'
            }],
            component: () => import('@/views/financing/financing-operation-detail.vue')
        },
        // ---------- 操作配置-结束 -------------
    ]
}

export default resourceRouter
