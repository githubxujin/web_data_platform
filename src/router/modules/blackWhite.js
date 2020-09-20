import Layout from '@/layout/index'
const resourceRouter = {
    path: '/fraud',
    component: Layout,
    name: 'fraud',
    redirect: '/fraudPanel/namesList',
    children: [
        // 黑白名单设置 - 企业名单列表
        {
            path: '/fraudPanel/namesList',
            name: 'fraudPanel-namesList',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业账号名单'
                }
            ],
            component: () => import('@/views/fraud/namesList')
        },
        // 黑白灰库 - 企业名单列表 - 新增企业名单
        {
            path: '/fraudPanel/namesList/addNames',
            name: 'fraudPanel-namesList-addNames',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业名单',
                    path: '/fraudPanel/namesList'
                },
                {
                    name: '企业名单新增'
                }
            ],
            component: () => import('@/views/fraud/addNames')
        },

        // 黑白灰库 - 企业名单列表 - 企业名单详情
        {
            path: '/fraudPanel/namesList/namesDetail/:id',
            name: 'fraudPanel-namesList-namesDetail',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业账号名单',
                    path: '/fraudPanel/namesList'
                },
                {
                    name: '企业名单详情'
                }
            ],
            component: () => import('@/views/fraud/namesDetail')
        },
        // 黑白灰库 - 企业名单审核列表
        {
            path: '/fraudPanel/checkList',
            name: 'fraudPanel-checkList',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业名单审核'
                },
            ],
            component: () => import('@/views/fraud/checkList')
        },
        // 黑白灰库 - 企业名单审核详情
        {
            path: '/fraudPanel/checkList/checkDetail/:id',
            name: 'fraudPanel-checkList-checkDetail',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业名单审核',
                    path: '/fraudPanel/checkList'
                },
                {
                    name: '企业名单审核详情'
                }
            ],
            component: () => import('@/views/fraud/namesDetail')
        },
        // 黑白灰库 - 账号名单列表
        {
            path: '/fraudPanel/accountList',
            name: 'fraudPanel-accountList',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单'
                }
            ],
            component: () => import('@/views/fraud/accountList')
        },
        // 黑白灰库 - 账号名单列表 - 新增账号名单
        {
            path: '/fraudPanel/accountList/addAccount',
            name: 'fraudPanel-accountList-addAccount',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单',
                    path: '/fraudPanel/accountList',
                },
                {
                    name: '账号名单新增'
                }
            ],
            component: () => import('@/views/fraud/addAccount')
        },
        // 黑白灰库 - 账号名单列表 - 账号名单修改
        {
            path: '/fraudPanel/accountList/amendAccount/:id',
            name: 'fraudPanel-accountList-amendAccount',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单',
                    path: '/fraudPanel/accountList',
                },
                {
                    name: '账号名单修改'
                }
            ],
            component: () => import('@/views/fraud/addAccount')
        },
        // 黑白灰库 - 账号名单列表 - 账号名单详情
        {
            path: '/fraudPanel/accountList/accountDetail/:id',
            name: 'fraudPanel-accountList-accountDetail',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单',
                    path: '/fraudPanel/accountList',
                },
                {
                    name: '账号名单详情'
                }
            ],
            component: () => import('@/views/fraud/accountDetail')
        },
        // 黑白灰库 - 账号名单审核列表
        {
            path: '/fraudPanel/accountCheckList',
            name: 'fraudPanel-accountCheckList',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单审核'
                }
            ],
            component: () => import('@/views/fraud/accountCheckList')
        },
        // 黑白灰库 - 账号名单列表 - 账号名单审核详情
        {
            path: '/fraudPanel/accountCheckList/accountCheckDetail/:id',
            name: 'fraudPanel-accountCheckList-accountCheckDetail',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号名单审核',
                    path: '/fraudPanel/accountCheckList'
                },
                {
                    name: '账号名单审核详情'
                }
            ],
            component: () => import('@/views/fraud/accountDetail')
        },
        // 基建工程 - 黑白灰库 - 企业黑白灰库
        {
            path: '/industrial/namesList',
            name: 'industrial-namesList',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业黑白灰库'
                }
            ],
            component: () => import('@/views/fraud/namesList')
        },
        // 基建工程 - 黑白灰库 - 企业黑白灰库 - 详情
        {
            path: '/enterpriseDetail/:id',
            name: 'enterpriseDetail',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '企业黑白灰库',
                    path: '/enterpriseList'
                },
                {
                    name: '企业黑白灰库详情'
                }
            ],
            component: () => import('@/views/fraud/namesDetail')
        },
        // 基建工程 - 黑白灰库 - 账号黑白灰库
        {
            path: '/identificationList',
            name: 'identificationList',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号黑白灰库'
                }
            ],
            component: () => import('@/views/fraud/identificationList')
        },
        // 基建工程 - 黑白灰库 - 账号黑白灰库 - 详情
        {
            path: '/identificationDetail/:id',
            name: 'identificationDetail',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '账号黑白灰库',
                    path: '/identificationList'
                },
                {
                    name: '账号黑白灰库详情'
                }
            ],
            component: () => import('@/views/fraud/accountDetail')
        }
    ]
}

export default resourceRouter
