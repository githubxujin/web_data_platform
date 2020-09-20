import Layout from '@/layout/supplierIndex'
const industryDataRouter = {
    path: '/industryData',
    component: Layout,
    name: 'industryData',
    redirect: '/supplierLibrary',
    children: [
        // 供应商库 - 供应商库 - 首页
        {
            path: '/supplierLibrary',
            name: 'supplierLibrary',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '供应商库'
            }],
            component: () => import('@/views/industryData/supplierLibrary.vue')
        },
    ]
}

export default industryDataRouter
