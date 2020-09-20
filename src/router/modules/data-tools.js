import Layout from '@/layout/index'

const resourceRouter = {
    path: '/data-tools',
    component: Layout,
    name: 'data-tools',
    redirect: '/data-tools/controller-query',
    children: [
        {
            path: '/data-tools/controller-query',
            name: 'data-tools-controller-query',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '反欺诈小工具'
            }, {
                name: '实控人查询'
            }],
            component: () => import('@/views/data-tools/controller-query')
        },
        {
            path: '/data-tools/equity',
            name: 'data-tools-equity',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '反欺诈小工具'
            }, {
                name: '股权穿透'
            }],
            component: () => import('@/views/data-tools/equity')
        },
        {
            path: '/data-tools/ty-fraud',
            name: 'data-tools-ty-fraud',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '反欺诈小工具'
            }, {
                name: '天御反欺诈'
            }],
            component: () => import('@/views/data-tools/ty-fraud')
        },
        {
            path: '/data-tools/organization',
            name: 'data-tools-organization',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '反欺诈小工具'
            }, {
                name: '中建组织架构'
            }],
            component: () => import('@/views/data-tools/organization')
        },
        {
            path: '/data-tools/account-relation',
            name: 'data-tools-account-relation',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '反欺诈小工具'
            }, {
                name: '账户关系图'
            }],
            component: () => import('@/views/data-tools/account-relation')
        },
    ]
}

export default resourceRouter
