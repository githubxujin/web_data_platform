import Layout from '@/layout/index'

const drugRouter = {
    path: '/drug',
    component: Layout,
    name: 'drug',
    redirect: 'drug-data',
    children: [{
            path: '/drug-data',
            name: 'grug-data',
            component: () => import('@/views/drug/drug-data.vue')
        }, {
            path: '/drug-inventory',
            name: 'drug-inventory',
            component: () => import('@/views/drug/inventory.vue')
        }, {
            path: '/drug-price',
            name: 'drug-price',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '进销存数据'
            }, {
                name: '药品流向'
            }],
            component: () => import('@/views/drug/drug-price.vue')
        },
        // 医药医疗 - 药厂库
        {
            path: '/pharmaceuticalFactory',
            name: 'pharmaceuticalFactory',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '上游生产'
            }, {
                name: '药厂库'
            }],
            component: () => import('@/views/medicalTreatment/pharmaceuticalFactory.vue'),
        },
        // 药厂信息(详情)
        {
            path: '/pharmaceuticalFactory/basicMessage',
            name: 'basicMessage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '企业数据'
            }, {
                name: '上游生产'
            }, {
                name: '药厂库',
                path: '/pharmaceuticalFactory'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/pharmaceuticalFactory/basicMessage.vue')
        },

        // 医药医疗----公共服务
        // {
        //     path: '/enforcementPerson',
        //     name: 'enforcementPerson',
        //     meta: [{
        //         name: '医药医疗',
        //     }, {
        //         name: '公共服务'
        //     }, {
        //         name: '贷前数据'
        //     }, {
        //         name: '失信被执行人'
        //     }],
        //     component: () => import('@/views/medicalTreatment/enforcementPerson')
        // },



        // --------------------操作配置--------------------------
        // ------------------药厂数据更新-------------------------
        {
            path: '/drugFactoryNum',
            name: 'drugFactoryNum',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药厂数据更新'
            }],
            component: () => import('@/views/contentSetting/drugFactoryNum.vue')
        },
        // 药厂新增
        {
            path: '/drugFactoryIncreate',
            name: 'drugFactoryIncreate',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药厂数据更新',
                path: '/drugFactoryNum'
            }, {
                name: '新增'
            }],
            component: () => import('@/views/contentSetting/drugFactoryIncreate.vue')
        },
        // 药厂修改
        {
            path: '/drugFactoryCompile',
            name: 'drugFactoryCompile',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药厂数据更新',
                path: '/drugFactoryNum'
            }, {
                name: '编辑'
            }],
            component: () => import('@/views/contentSetting/drugFactoryIncreate.vue')
        },
        // 药厂数据更新的详情页跳转
        {
            path: '/drugFacDetailSet/drugFacMessage',
            name: '/drugFacDetailSet/drugFacMessage',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '药厂数据更新',
                path: '/drugFactoryNum'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/contentSetting/drugFacDetailSet/drugFacMessage.vue')
        },


        // 操作配置---商业公司库更新
        {
            path: '/manageSetting',
            name: 'manageSetting',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '商业公司库更新'
            }],
            component: () => import('@/views/contentSetting/manageSetting.vue')
        },
        // 操作配置--商业公司新增编辑
        {
            path: '/nomarketSitting/nomarketManageNew',
            name: 'nomarketManageNew',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '商业公司库更新',
                path: '/manageSetting'
            }, {
                name: '新增'
            }],
            component: () => import('@/views/contentSetting/nomarketSitting/nomarketManage')
        },
        // 操作配置-商业公司详情
        // 商业公司库详情
        {
            path: '/operation/businessDetails',
            name: 'businessDetails',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '商业公司库更新',
                path: '/manageSetting'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/middleManage/nomarket/nomarketManage.vue')
        },

        {
            path: '/nomarketSitting/nomarketManageRes',
            name: 'nomarketManageRes',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '商业公司库更新',
                path: '/manageSetting'
            }, {
                name: '编辑'
            }],
            component: () => import('@/views/contentSetting/nomarketSitting/nomarketManage')
        },

        // 操作配置--上市商业公司新增编辑
        {
            path: '/marketSitting/marketManage',
            name: 'marketManage',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '商业公司库更新'
            }],
            component: () => import('@/views/contentSetting/marketSitting/marketManage')
        },

        // ------------------操作配置--器械库更新-------------------------
        {
            path: '/instrumentIncreate',
            name: 'instrumentIncreate',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreate.vue')
        },
        // 操作设置分支----器械库注册部分详情跳转页面
        {
            path: '/instrumentIncreatePage/instrumentRegisDetail',
            name: '/instrumentIncreatePage/instrumentRegisDetail',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/instrumentRegisDetail.vue')
        },
        // 操作设置分支----器械库备案部分详情跳转页面
        {
            path: '/instrumentIncreatePage/instrumentPutDetail',
            name: '/instrumentIncreatePage/instrumentPutDetail',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗',
            }, {
                name: '器械库更新'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/instrumentPutDetail.vue')
        },


        // ------------------操作配置--器械产品注册(新增和编辑页面)-------------------------
        {
            path: '/regisIncreate',
            name: 'regisIncreate',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新',
                path: '/instrumentIncreate'
            }, {
                name: '医疗器械产品（注册）编辑'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/regisIncreate.vue')
        },
        {
            path: '/regisIncreateAdd',
            name: 'regisIncreateAdd',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新',
                path: '/instrumentIncreate'
            }, {
                name: '医疗器械产品（注册）新增'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/regisIncreate.vue')
        },
        // ------------------操作配置--器械产品备案(新增和编辑页面)-------------------------
        {
            path: '/putIncreate',
            name: 'putIncreate',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新',
                path: '/instrumentIncreate'
            }, {
                name: '医疗器械产品（备案）编辑'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/putIncreate.vue')
        },
        {
            path: '/putIncreateAdd',
            name: 'putIncreateAdd',
            meta: [{
                name: '操作配置',
            }, {
                name: '内容设置'
            }, {
                name: '医药医疗'
            }, {
                name: '器械库更新',
                path: '/instrumentIncreate'
            }, {
                name: '医疗器械产品（备案）新增'
            }],
            component: () => import('@/views/contentSetting/instrumentIncreatePage/putIncreate.vue')
        },


        // ----------------------   交易数据-器械库    ----------------
        {
            path: '/instrument',
            name: 'instrument',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '器材库'
            }, {
                name: '器械库'
            }],
            component: () => import('@/views/medicalTreatment/instrumentPage/instrumentDetail'),
        },
        // 器械库详情路由(注册页面)
        {
            path: '/instrumentPage/regisMessage',
            name: 'regisMessage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '器材库'
            }, {
                name: '器械库',
                path: '/instrument'
            }, {
                name: '医疗器械产品（注册）详情'
            }],
            component: () => import('@/views/medicalTreatment/instrumentPage/regisMessage')
        },
        // 器械库详情路由(备案页面)
        {
            path: '/instrumentPage/putMessage',
            name: 'putMessage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '器材库'
            }, {
                name: '器械库',
                path: '/instrument'
            }, {
                name: '医疗器械产品（备案）详情'
            }],
            component: () => import('@/views/medicalTreatment/instrumentPage/putMessage')
        },
        // --------------- 4.2.3 开始 -------------------
        // 4.2.3 医疗服务数据
        {
            path: '/database',
            name: 'database',
            meta: [{
                name: '医药医疗',
            }, {
                name: '产业宏观'
            }, {
                name: '产业数据'
            }, {
                name: '医疗服务数据'
            }],
            component: () => import('@/views/medicalTreatment/database/database')
        },
        // 4.2.3 医疗服务数据-详情
        {
            path: '/database-detail',
            name: 'database-detail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '产业宏观'
            }, {
                name: '产业数据'
            }, {
                name: '医疗服务数据',
                path: '/database'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/database/database-detail')
        },
        // 4.2.3 宏观经济运行
        {
            path: '/runTime',
            name: 'runTime',
            meta: [{
                name: '医药医疗',
            }, {
                name: '产业宏观'
            }, {
                name: '产业数据'
            }, {
                name: '宏观经济运行'
            }],
            component: () => import('@/views/medicalTreatment/database/runTime')
        },
        // 4.2.3 宏观经济运行-详情
        {
            path: '/runTime-detail',
            name: 'runTime-detail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '产业宏观'
            }, {
                name: '产业数据'
            }, {
                name: '宏观经济运行',
                path: '/runTime'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/database/runTime-detail')
        },
        // 4.2.3 药品招投标库
        {
            path: '/tenderDatabase',
            name: 'tenderDatabase',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '招投标数据'
            }, {
                name: '药品招投标库'
            }],
            component: () => import('@/views/medicalTreatment/tenderDatabase/tenderDatabase.vue')
        },
        // 4.2.3 药品招投标库-详情
        {
            path: '/tenderDatabase-detail',
            name: 'tenderDatabase-detail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '招投标数据'
            }, {
                name: '药品招投标库',
                path: '/tenderDatabase'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/tenderDatabase/tenderDatabase-detail.vue')
        },
        // 4.2.3 MID药品目录库
        {
            path: '/midDrug',
            name: 'midDrug',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: 'MID药品目录库'
            }],
            component: () => import('@/views/medicalTreatment/midDrug/midDrug.vue')
        },
        // 4.2.3 MID药品目录库-详情
        {
            path: '/midDrug-detail',
            name: 'midDrug-detail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: 'MID药品目录库',
                path: '/midDrug'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/midDrug/midDrug-detail.vue')
        },
        // 4.2.3 一致性评价库
        {
            path: '/consistencyDatabase',
            name: 'consistencyDatabase',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '一致性评价库'
            }],
            component: () => import('@/views/medicalTreatment/consistencyDatabase/consistencyDatabase.vue')
        },

        // 医药医疗 - 上市药品
        {
            path: '/drugStorage',
            name: 'drugStorage',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '上市药品'
            }],
            component: () => import('@/views/medicalTreatment/drugStoragePage/index.vue')
        },
        // 医药医疗 - 上市药品 -统计概况- 详情
        {
            path: '/drugDetails/:row',
            name: 'drugDetails',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '上市药品',
                path: '/drugStorage'
            }, {
                name: '药品详情'
            }],
            component: () => import('@/views/medicalTreatment/drugStoragePage/drugDetails.vue')
        },

        // 医药医疗 - 上市药品 -数据明细- 详情
        {
            path: '/drugStorage/details',
            name: 'drugDetail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '上市药品',
                path: '/drugStorage'
            }, {
                name: '药品详情'
            }],
            component: () => import('@/views/medicalTreatment/drugStoragePage/detail.vue')
        },

        // 医药医疗 - 医保目录库
        {
            path: '/insurance',
            name: 'insurance',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '医保目录库'
            }],
            component: () => import('@/views/medicalTreatment/insurancePage/detaiPage.vue')
        },
        // 医药医疗 - 医保目录库 - 详情
        {
            path: '/insurancePage/detail',
            name: 'insuranceDetail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '医保目录库',
                path: '/insurance'
            }, {
                name: '药品详情'
            }],
            component: () => import('@/views/medicalTreatment/insurancePage/detail.vue')
        },

        // 医药医疗 - 基药目录库
        {
            path: '/basic',
            name: 'basic',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '基药目录库'
            }],
            component: () => import('@/views/medicalTreatment/basicPage/detaiPage.vue')
        },

        // 医药医疗 - 基药目录库 - 详情
        {
            path: '/basic/detail',
            name: 'basicDetail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '基药目录库',
                path: '/basic'
            }, {
                name: '药品详情'
            }],
            component: () => import('@/views/medicalTreatment/basicPage/detail.vue')
        },
        // 医药医疗 - 参比药物及上市药物
        {
            path: '/drugs',
            name: 'drugs',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '参比药物及上市药物'
            }],
            component: () => import('@/views/medicalTreatment/drugsPage/detaiPage.vue')
        },
        // 医药医疗 - 参比药物及上市药物 - 详情
        {
            path: '/drugs/detail',
            name: 'drugsDetail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '参比药物及上市药物',
                path: '/drugs'
            }, {
                name: '参比药物及上市药物详情'
            }],
            component: () => import('@/views/medicalTreatment/drugsPage/detail.vue')
        },
        // 医药医疗 - OTC目录库
        {
            path: '/otc',
            name: 'otc',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: 'OTC目录库'
            }],
            component: () => import('@/views/medicalTreatment/otcPage/detaiPage.vue')
        },

        // 医药医疗 - OTC目录库 - 详情
        {
            path: '/otc/detail',
            name: 'otcDetail',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: 'OTC目录库',
                path: '/otc'
            }, {
                name: 'OTC目录库详情'
            }],
            component: () => import('@/views/medicalTreatment/otcPage/detail.vue')
        },
        // 医药医疗 - 药品目录
        {
            path: '/drug/directory',
            name: 'drug-directory',
            meta: [{
                name: '医药医疗',
            }, {
                name: '交易数据'
            }, {
                name: '医药库'
            }, {
                name: '重点监控目录',
            }],
            component: () => import('@/views/medicalTreatment/drugsPage/directory.vue')
        },

        // --------------- 4.2.3 结束 -------------------
    ]
}

export default drugRouter
