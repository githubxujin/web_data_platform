import Layout from '@/layout/index'
const resourceRouter = {
    path: '/arrivalVideo',
    component: Layout,
    name: 'arrivalVideo',
    redirect: '/dataAdministration/delivery',
    children: [
        // 到货视频 - 到货视频审核
        {
            path: '/dataAdministration/delivery',
            name: 'dataAdministration-delivery',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '贷前数据'
                },
                {
                    name: '到货视频'
                },
                {
                    name: '到货视频审核'
                }
            ],
            component: () => import('@/views/arrivalVideo/deliveryList')
        },
        // 到货视频 - 到货视频审核 - 详情
        {
            path: '/dataAdministration/delivery/deliveryDetail/:id/:projectName/:customerName',
            name: 'dataAdministration-delivery-deliveryDetail',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '贷前数据'
                },
                {
                    name: '到货视频'
                },
                {
                    name: '到货视频审核',
                    path: '/dataAdministration/delivery'
                },
                {
                    name: '到货视频审核详情'
                }
            ],
            component: () => import('@/views/arrivalVideo/deliveryDetail')
        },
        // 到货视频 - 到货视频查看
        {
            path: '/dataAdministration/delivery-query',
            name: 'dataAdministration-delivery-query',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '交易数据'
                },
                {
                    name: '物流数据'
                },
                {
                    name: '到货视频库'
                }
            ],
            component: () => import('@/views/arrivalVideo/deliveryList')
        },
        // 到货视频 - 到货视频查看 - 详情
        {
            path: '/dataAdministration/delivery-query/deliveryDetail/:id/:projectName/:customerName',
            name: 'dataAdministration-delivery-query-deliveryDetail',
            meta: [{
                    name: '基建工程',
                },
                {
                    name: '交易数据'
                },
                {
                    name: '物流数据'
                },
                {
                    name: '到货视频库',
                    path: '/dataAdministration/delivery-query'
                },
                {
                    name: '到货视频库查看详情'
                }
            ],
            component: () => import('@/views/arrivalVideo/deliveryDetail')
        },
        // 行业动态 - 基建动态
        {
            path: '/industryTrends/constructionTrends',
            name: 'industryTrends-constructionTrends',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '行业动态库'
                }
            ],
            component: () => import('@/views/industryTrends')
        },
        // 行业动态 - 基建动态 - 详情
        {
            path: '/industryTrends/constructionTrends/dynamicDeatils',
            name: 'industryTrends-dynamicDeatils',
            meta: [{
                    name: '公共服务',
                },
                {
                    name: '反欺诈数据'
                },
                {
                    name: '行业动态库',
                    path: '/industryTrends/constructionTrends'
                },
                {
                    name: '基建动态详情'
                }
            ],
            component: () => import('@/views/industryTrends/dynamicDeatils')
        },
    ]
}

export default resourceRouter
