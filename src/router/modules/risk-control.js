import Layout from '@/layout/index'

const resourceRouter = {
    path: '/risk-control',
    component: Layout,
    name: 'risk-control',
    redirect: '/risk-control/index',
    children: [{
            path: '/risk-control/index',
            name: 'risk-control-index',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/index')
        },
        {
            path: '/risk-control/feedback/count',
            name: 'feedback-count',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/feedback/count')
        },
        {
            path: '/risk-control/feedback/list',
            name: 'feedback-list',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/feedback/list')
        },
        {
            path: '/risk-control/feedback/list-my',
            name: 'feedback-list-my',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/feedback/list')
        },
        {
            path: '/risk-control/analyse/opinion',
            name: 'analyse',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/analyse/opinion')
        },
        {
            path: '/risk-control/analyse/relation',
            name: 'relation',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/analyse/relation')
        },
        {
            path: '/risk-control/special',
            name: 'special',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/special')
        },
        {
            path: '/risk-control/info',
            name: 'info',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '舆情监控'
            }, {
                name: '舆情库'
            }],
            component: () => import('@/views/risk-control/info')
        },
        {
            path: '/risk-notice',
            name: 'risk-notice',
            meta: [{
                name: '操作配置',
            }, {
                name: '账号设置'
            }, {
                name: '行业动态账户设置'
            }, {
                name: '动态推送'
            }],
            component: () => import('@/views/risk-control/risk-notice')
        },
        // 4.2.2
        {
            path: '/popular',
            name: 'popular',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容配置'
            }, {
                name: '公共服务'
            }, {
                name: '舆情重大事件设置'
            }],
            component: () => import('@/views/risk-control/popular')
        }
    ]
}

export default resourceRouter
