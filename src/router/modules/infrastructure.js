import Layout from '@/layout/index'
const infrastructureRouter = {
    path: '/infrastructure',
    component: Layout,
    name: 'infrastructure',
    redirect: '/winning',
    children: [{
            path: '/winning',
            name: 'winning',
            meta: [{
                name: '基建工程'
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据'
            }, {
                name: '中国建筑中标数据'
            }],
            component: () => import('@/views/infrastructure/winning.vue')
        },
        {
            path: '/industrial-policy',
            name: 'industrial-policy',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业宏观'
            }, {
                name: '监管机构'
            }, {
                name: '住建部'
            }],
            component: () => import('@/views/infrastructure/industrial-policy.vue')
        },
        {
            path: '/data-general',
            name: 'data-general',
            component: () => import('@/views/infrastructure/data-general.vue')
        },
        {
            path: '/cement-price',
            name: 'cement-price',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '水泥价格'
            }, {
                name: '数据明细'
            }],
            component: () => import('@/views/infrastructure/cement-price.vue')
        },
        {
            path: '/steel-price',
            name: 'steel-price',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '价格数据'
            }, {
                name: '钢材价格'
            }],
            component: () => import('@/views/infrastructure/steel-price.vue')
        },
        {
            path: '/black-list',
            name: 'black-list',
            component: () => import('@/views/infrastructure/black-list.vue')
        },
        {
            path: '/black-detail',
            name: 'black-detail',
            component: () => import('@/views/infrastructure/black-detail.vue')
        },
        {
            path: '/staff-list/:customerCode/:customerName',
            name: 'staff-list',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业宏观'
            }, {
                name: '监管机构'
            }, {
                name: '住建部',
                path: '/industrial-policy'
            }, {
                name: '企业详情'
            }],
            component: () => import('@/views/infrastructure/staff-list.vue')
        },
        {
            path: '/person-detail',
            name: 'person-detail',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业宏观'
            }, {
                name: '住建部',
                path: '/industrial-policy'
            }, {
                name: '企业详情'
            }],
            component: () => import('@/views/infrastructure/person-detail.vue')
        },
        // 中标数据库
        {
            path: '/in-win-data-house',
            name: 'in-win-data-house',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中标数据库'
            }],
            component: () => import('@/views/infrastructure/winning/data-house.vue')
        },
        {
            path: '/in-win-data-zz',
            name: 'in-win-data-zz',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中国中铁中标数据'
            }],
            component: () => import('@/views/infrastructure/winning/zz-data.vue')
        },
        {
            path: '/in-win-data-zt',
            name: 'in-win-data-zt',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中国铁建中标数据'
            }],
            component: () => import('@/views/infrastructure/winning/zt-data.vue')
        },
        //详情
        {
            path: '/in-win-data-detail',
            name: 'in-win-data-detail',
            meta: [{
                    name: '基建工程',
                }, {
                    name: '产业交易'
                }, {
                    name: '招投标数据',
                }, {
                    name: '中国铁建中标数据'
                },
                {
                    name: '详情'
                }
            ],
            component: () => import('@/components/Winning/detail.vue')
        },
        {
            path: '/in-win-data-zj',
            name: 'in-win-data-zj',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中国交建中标数据'
            }],
            component: () => import('@/views/infrastructure/winning/zj-data.vue')
        },
        // 中国铁塔中标数据
        {
            path: '/in-win-data-tieta',
            name: 'in-win-data-tieta',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中国铁塔中标数据'
            }],
            component: () => import('@/views/infrastructure/tower/tieta-data.vue')
        },
        // 中国铁塔中标数据-详情
        {
            path: '/in-win-data-tieta-detail',
            name: 'in-win-data-tieta-detail',
            meta: [{
                name: '基建工程',
            }, {
                name: '产业交易'
            }, {
                name: '招投标数据',
            }, {
                name: '中国铁塔中标数据',
                path: '/in-win-data-tieta'
            }, {
                name: '详情'
            }, ],
            component: () => import('@/views/infrastructure/tower/tieta-data-detail.vue')
        },
        // ------------------------------------------ 基建工程 -> 企业数据 start  ------------------------------------------

        // 供应商库 - 供应商库 - 高级搜索
        {
            path: '/supplierAdvancedt',
            name: 'supplierAdvancedt',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '供应商库'
            }],
            component: () => import('@/views/industryData/supplierList.vue')
        },
        // 供应商库 - 供应商库 - 列表
        {
            path: '/supplierList',
            name: 'supplierList',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '供应商库'
            }],
            component: () => import('@/views/industryData/supplierList.vue')
        },
        // 供应商库 - 供应商库 - 详情
        {
            path: '/supplierDetail',
            name: 'supplierDetail',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '供应商库',
                path: '/supplierAdvancedt'
            }, {
                name: '企业详情'
            }],
            component: () => import('@/views/industryData/supplierDetail.vue')
        },
        // 预授信库库 - 列表
        {
            path: '/prospectiveList',
            name: 'prospectiveList',
            meta: [{
                name: '基建工程',
                active: '基建工程'
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '预授信库'
            }],
            component: () => import('@/views/industryData/prospectiveList.vue')
        },
        // 预授信库库 - 列表 - 详情
        {
            path: '/prospectiveDetail',
            name: 'prospectiveDetail',
            meta: [{
                name: '基建工程',
                active: '基建工程'
            }, {
                name: '企业数据'
            }, {
                name: '供应商'
            }, {
                name: '预授信库',
                path: '/prospectiveList'
            }, {
                name: '企业详情'
            }],
            // component: () => import('@/views/industryData/prospectiveDetail.vue')  // 这个版本先隐藏
            // component: () => import('@/views/industryData/supplierDetail.vue') // 先用 供应商库详情页面
            component: () => import('@/views/industryData/prospectiveDetailHan.vue') // Han
        },
        // 工程项目 - 项目库 - tab
        {
            path: '/projectTabs',
            name: 'projectTabs',
            meta: [{
                name: '基建工程',
            }, {
                name: '交易数据'
            }, {
                name: '项目数据'
            }, {
                name: '项目库'
            }],
            component: () => import('@/views/industryData/projectTabs.vue')
        },

        // 工程项目 - 项目库 - 列表
        {
            path: '/projectList',
            name: 'projectList',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '项目库'
            }],
            component: () => import('@/views/industryData/projectList.vue')
        },
        // 工程项目 - 项目库 - 详情
        {
            path: '/projectDetail',
            name: 'projectDetail',
            meta: [{
                name: '基建工程',
            }, {
                name: '企业数据'
            }, {
                name: '项目库',
                path: '/projectList'
            }, {
                name: '项目库详情'
            }],
            component: () => import('@/views/industryData/projectDetail.vue')
        },
        // ------------------------------------------ 基建工程 -> 企业数据 end  --------------------------------------------

        // ------------------------------------------ 基建工程 -> 交易数据 start  ------------------------------------------
        // 中国建筑中标数据
        {
            path: '/biddingDate',
            name: 'biddingDate',
            meta: [{
                name: '基建工程',
                active: '基建工程'
            }, {
                name: '交易数据'
            }, {
                name: '招投标数据'
            }, {
                name: '中国建筑中标数据'
            }],
            component: () => import('@/views/industryTrade/biddingDate.vue')
        },
        // ------------------------------------------ 基建工程 -> 交易数据 end  --------------------------------------------

        // ------------------------------------------ 操作配置 -> 内容设置 start  ------------------------------------------
        // 建筑工程 - 招标单位名称规范
        {
            path: '/standardList',
            name: 'standardList',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '建筑工程'
            }, {
                name: '招标单位名称规范'
            }],
            component: () => import('@/views/contentSetting/standardList.vue')
        },
        // 操作配置 - 项目数据更新 - 列表
        {
            path: '/projectUpdate',
            name: 'projectUpdate',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '建筑工程'
            }, {
                name: '项目数据更新'
            }],
            component: () => import('@/views/industryData/projectList.vue')
        },
        // 操作配置 - 项目数据更新 - 编辑
        {
            path: '/projectCompile',
            name: 'projectCompile',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '建筑工程'
            }, {
                name: '项目数据更新',
                path: '/projectUpdate',
            }, {
                name: '项目数据编辑'
            }],
            component: () => import('@/views/industryData/projectDetail.vue')
        },
        // 工程项目 - 项目库 - 详情
        {
            path: '/projectDetails',
            name: 'projectDetails',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '建筑工程'
            }, {
                name: '项目数据更新',
                path: '/projectUpdate',
            }, {
                name: '项目库详情'
            }],
            component: () => import('@/views/industryData/projectDetail.vue')
        },
        // 医药医疗 - 药品名称规范
        {
            path: '/drugName',
            name: 'drugName',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药品名称规范'
            }],
            component: () => import('@/views/contentSetting/drugName.vue')
        },
        // 医药医疗 - 下游名称规范
        {
            path: '/downstreamName',
            name: 'downstreamName',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '下游名称规范'
            }],
            component: () => import('@/views/contentSetting/downstreamName.vue')
        },
        // 医药医疗 - 医院数据更新
        {
            path: '/hospitalData',
            name: 'hospitalData',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据'
            }],
            component: () => import('@/views/contentSetting/hospitalData.vue')
        },
        // 医药医疗 - 医院数据更新 - 医院库
        {
            path: '/hospitalData',
            name: 'hospitalData',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据'
            }],
            component: () => import('@/views/contentSetting/hospitalData.vue')
        },
        // 医药医疗 - 医院数据更新 - 医院库 -新增
        {
            path: '/hospitalDataAdd',
            name: 'hospitalDataAdd',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据',
                path: '/hospitalData'
            }, {
                name: '医院新增'
            }],
            component: () => import('@/views/contentSetting/hospitalAmend.vue')
        },
        // 医药医疗 - 医院数据更新 - 医院库 -修改
        {
            path: '/hospitalDataAmend',
            name: 'hospitalDataAmend',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据',
                path: '/hospitalData'
            }, {
                name: '医院修改'
            }],
            component: () => import('@/views/contentSetting/hospitalAmend.vue')
        },
        // 医药医疗 - 医院数据更新 - 医院库 -详情
        {
            path: '/hospitalDataDetail',
            name: 'hospitalDataDetail',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据',
                path: '/hospitalData'
            }, {
                name: '医院详情'
            }],
            component: () => import('@/views/medicalTreatment/hospitalDetails.vue')
        },
        // 医药医疗 -> 企业-经营品类-医院库
        {
            path: '/businessHospital',
            name: 'businessHospital',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '医院数据'
            }],
            component: () => import('@/views/contentSetting/businessHospital.vue')
        },
        // 医药医疗 - 药品数据更新 - 药品库
        {
            path: '/drugData',
            name: 'drugData',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药品数据'
            }],
            component: () => import('@/views/contentSetting/drugData.vue')
        },
        // 医药医疗 - 药品数据更新 - 药品库 - 修改
        {
            path: '/drugDataAmend/:row',
            name: 'drugDataAmend',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药品数据',
                path: '/drugData'
            }, {
                name: '修改'
            }],
            component: () => import('@/views/contentSetting/drugAmend.vue')
        },
        // 医药医疗 - 药品数据更新 - 药品库 - 详情
        {
            path: '/drugDataDetail/:row',
            name: 'drugDataDetail',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药品数据',
                path: '/drugData'
            }, {
                name: '药品详情'
            }],
            component: () => import('@/views/medicalTreatment/drugStoragePage/drugDetails.vue')
        },
        // 医药医疗 -> 企业-经营品类-药品库
        {
            path: '/businessDrug',
            name: 'businessDrug',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药品数据'
            }],
            component: () => import('@/views/contentSetting/businessDrug.vue')
        },
        // ------------------------------------------ 操作配置 -> 内容设置 end  --------------------------------------------

        // ------------------------------------------ 医药医疗 -> 企业数据 start  ------------------------------------------

        // 医药医疗 - 医院库
        {
            path: '/medicalHomePage',
            name: 'medicalHomePage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '下游终端'
            }, {
                name: '医院库'
            }],
            component: () => import('@/views/medicalTreatment/medicalHomePage.vue')
        },
        // 医药医疗 - 医院库 - 详情
        {
            path: '/hospitalDetails',
            name: 'hospitalDetails',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '下游终端'
            }, {
                name: '医院库',
                path: '/medicalHomePage'
            }, {
                name: '医院详情'
            }],
            component: () => import('@/views/medicalTreatment/hospitalDetails.vue')
        },
        // ------------------------------------------ 医药医疗 -> 企业数据 end  --------------------------------------------

        // ------------------------------------------ 医药医疗 -> 交易数据 start  ------------------------------------------
        // 医药医疗 - 药品库
        // {
        //     path: '/drugStorage',
        //     name: 'drugStorage',
        //     meta: [{
        //         name: '医药医疗',
        //     }, {
        //         name: '交易数据'
        //     }, {
        //         name: '医药库'
        //     }, {
        //         name: '药品库'
        //     }],
        //     component: () => import('@/views/medicalTreatment/drugStorage.vue')
        // },
        // // 医药医疗 - 药品库 - 详情
        // {
        //     path: '/drugDetails/:row',
        //     name: 'drugDetails',
        //     meta: [{
        //         name: '医药医疗',
        //     }, {
        //         name: '交易数据'
        //     }, {
        //         name: '医药库'
        //     }, {
        //         name: '药品库',
        //         path: '/drugStorage'
        //     }, {
        //         name: '药品详情'
        //     }],
        //     component: () => import('@/views/medicalTreatment/drugDetails.vue')
        // },
        // 医药医疗 - 资金流数据 - 发票数据
        {
            path: '/invoiceData',
            name: 'invoiceData',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '资金流数据'
            }, {
                name: '发票数据'
            }],
            component: () => import('@/views/medicalTreatment/invoiceData.vue')
        },
        // ------------------------------------------ 医药医疗 -> 交易数据 end  --------------------------------------------


        // ---------------医院医疗---企业数据---商业公司库------
        {
            path: '/middleManage/manage',
            name: 'manage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '中游流通经营'
            }, {
                name: '商业公司库'
            }],
            component: () => import('@/views/middleManage/manage')
        },
        // 商业公司库详情
        {
            path: '/nomarket/nomarketManage',
            name: 'nomarketManage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '中游流通经营'
            }, {
                name: '商业公司库',
                path: '/middleManage/manage'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/middleManage/nomarket/nomarketManage.vue')
        },
        // 上市商业公司库详情
        {
            path: '/market/marketManage',
            name: 'marketManage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '中游流通经营'
            }, {
                name: '商业公司库'
            }],
            component: () => import('@/views/middleManage/market/marketManage.vue')
        },


    ]
}

export default infrastructureRouter
