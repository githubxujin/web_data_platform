import Layout from '@/layout/index'
const resourceRouter = {
    path: '/resource',
    component: Layout,
    name: 'resource',
    redirect: '/resource/supplier',
    children: [{
            path: '/resource/supplier',
            name: 'resource-supplier',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '企业数据'
                },
                {
                    name: '供应商'
                },
                {
                    name: '供应商库'
                },
            ],
            component: () => import('@/views/resource/supplier.vue')
        },
        {
            path: '/resource/supplier-detail',
            name: 'resource-supplier-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '企业数据'
                },
                {
                    name: '供应商'
                },
                {
                    name: '供应商库',
                    path: '/resource/supplier'
                },
                {
                    name: '企业详情'
                }
            ],
            component: () => import('@/views/resource/detail.vue')
        },
        {
            path: '/resource/merchant',
            name: 'resource-merchant',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '企业数据'
                },
                {
                    name: '贸易商'
                },
                {
                    name: '贸易商库'
                },
            ],
            component: () => import('@/views/resource/merchant.vue')
        },
        {
            path: '/resource/merchantDetail',
            name: 'resource-merchantDetail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '企业数据'
                },
                {
                    name: '贸易商'
                },
                {
                    name: '贸易商库',
                    path: '/resource/merchant'
                },
                {
                    name: '企业详情'
                }
            ],
            component: () => import('@/views/resource/merchantDetail.vue')
        },
        // 4.1.7 港口库
        {
            path: '/resource/harbor',
            name: 'resource-harbor',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '港口库'
                }
            ],
            component: () => import('@/views/resource/harbor.vue')
        },
        // 4.1.7 港口库详情
        {
            path: '/resource/harbor-detail',
            name: 'resource-harbor-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '港口库',
                    path: '/resource/harbor'
                },
                {
                    name: '详情'
                },
            ],
            component: () => import('@/views/resource/harbor-detail.vue')
        },
        // 4.1.7 航线跟踪
        {
            path: '/resource/ship-route',
            name: 'resource-ship-route',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '航线跟踪'
                }
            ],
            component: () => import('@/views/resource/ship-route.vue')
        },
        // 4.1.7 航线跟踪详情
        {
            path: '/resource/ship-route-detail',
            name: 'resource-ship-route-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '航线跟踪',
                    path: '/resource/ship-route'
                },
                {
                    name: '详情'
                }
            ],
            component: () => import('@/views/resource/ship-route-detail.vue')
        },
        // 4.1.7 原油价格
        {
            path: '/resource/price-crudeOil',
            name: 'price-crudeOil',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '价格数据'
                },
                {
                    name: '原油价格',
                },
            ],
            component: () => import('@/views/resource/price-crudeOil.vue')
        },
        // 4.1.7 成品油价格
        {
            path: '/resource/price-productOil',
            name: 'price-productOil',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '价格数据'
                },
                {
                    name: '成品油价格',
                }
            ],
            component: () => import('@/views/resource/price-productOil.vue')
        },
        // 中石油
        {
            path: '/resource/petroleum',
            name: 'resource-petroleum',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                },
                {
                    name: '中石油中标数据',
                },
            ],
            component: () => import('@/views/resource/detail-data.vue')
        },
        {
            path: '/resource/sy-winning-detail/:id',
            name: 'sy-winning-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                },
                {
                    name: '中石油中标数据',
                    path: '/resource/petroleum'
                },
                {
                    name: '明细详情',
                },
            ],
            component: () => import('@/views/resource/winning-detail.vue')
        },
        // 中石化
        {
            path: '/resource/petrifaction',
            name: 'resource-petrifaction',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                },
                {
                    name: '中石化中标数据',
                },
            ],
            component: () => import('@/views/resource/detail-data.vue')
        },
        {
            path: '/resource/sh-winning-detail/:id',
            name: 'sh-winning-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                },
                {
                    name: '中石化中标数据',
                    path: '/resource/petrifaction'
                },
                {
                    name: '明细详情',
                },
            ],
            component: () => import('@/views/resource/winning-detail.vue')
        },
        // 中海油
        {
            path: '/resource/cnooc',
            name: 'resource-cnooc',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                },
                {
                    name: '中海油中标数据',
                },
            ],
            component: () => import('@/views/resource/detail-data.vue')
        },
        {
            path: '/resource/hy-winning-detail/:id',
            name: 'hy-winning-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '交易数据'
                },
                {
                    name: '招投标数据'
                }, {
                    name: '中海油中标数据',
                    path: '/resource/cnooc'
                },
                {
                    name: '明细详情',
                },
            ],
            component: () => import('@/views/resource/winning-detail.vue')
        },
        // 4.1.7 港口数据
        {
            path: '/resource/harbor',
            name: 'resource-harbor',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '港口数据'
                }
            ],
            component: () => import('@/views/resource/harbor.vue')
        },
        // 4.1.7 船舶航线数据
        {
            path: '/resource/ship-route',
            name: 'resource-ship-route',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '船舶航线数据'
                }
            ],
            component: () => import('@/views/resource/ship-route.vue')
        },
        // 4.1.7 船舶航线数据详情
        {
            path: '/resource/ship-route-detail',
            name: 'resource-ship-route-detail',
            meta: [{
                    name: '能源化工'
                },
                {
                    name: '产业宏观'
                },
                {
                    name: '产业数据'
                },
                {
                    name: '船舶航线数据'
                },
                {
                    name: '详情'
                }
            ],
            component: () => import('@/views/resource/ship-route-detail.vue')
        },
    ]

}

export default resourceRouter
