import Layout from "@/layout/index";

const configRouter = {
    path: "/config",
    component: Layout,
    name: "config",
    redirect: "/in-win-data",
    children: [
        //预授信模板
        {
            path: "/in-win-data",
            name: "in-win-data",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "基建工程"
                },
                {
                    name: "预授信模板"
                }
            ],
            component: () => import("@/views/infrastructure/winning/in-win-data.vue")
        },
        {
            path: "/in-win-data-edit",
            name: "in-win-edit",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "基建工程"
                },
                {
                    name: "预授信模板"
                }
            ],
            component: () =>
                import("@/views/infrastructure/winning/in-win-data-edit.vue")
        },
        {
            path: "/in-win-data-add",
            name: "in-win-add",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "基建工程"
                },
                {
                    name: "预授信模板"
                },
                {
                    name: "新增"
                }
            ],
            component: () =>
                import("@/views/infrastructure/winning/in-win-data-add.vue")
        },
        {
            path: '/service/winning',
            name: 'service/winning',
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "基建工程"
                },
                {
                    name: "中标数据库更新"
                }
            ],
            component: () => import("@/views/service/winning.vue")
        },
        //发票内容校验
        {
            path: "/service/invoice-content-check",
            name: "invoice-content-check",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "医药医疗"
                },
                {
                    name: "发票内容校验"
                }
            ],
            component: () => import("@/views/service/invoice-content-check.vue")
        },
        //发票内容详情
        {
            path: "/service/invoice-content-detail",
            name: "invoice-content-detail",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "医药医疗"
                },
                {
                    name: "发票内容校验",
                    path: '/service/invoice-content-check'
                },
                {
                    name: "详情"
                }
            ],
            component: () => import("@/views/service/invoice-content-detail.vue")
        },
        //新增发票内容
        {
            path: "/service/invoice-content-add",
            name: "invoice-content-add",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "医药医疗"
                },
                {
                    name: "发票内容校验",
                    path: "/service/invoice-content-check"
                },
                {
                    name: "详情"
                }
            ],
            component: () => import("@/views/service/invoice-content-add.vue")
        },
        //资金流水信息管理
        {
            path: "/config/money-water",
            name: "money-water",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "公共服务"
                },
                {
                    name: '猫池数据配置'
                }
            ],
            component: () => import("@/views/operationConfig/money-water.vue")
        },
        //中等登记信息
        {
            path: "/config/check-in",
            name: "check-in",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "风控管理"
                },
                {
                    name: '中登登记信息'
                }
            ],
            component: () => import("@/views/operationConfig/check-in.vue")
        },
        // 黑白名单设置
        {
            path: "/config/black-white-setting",
            name: "black-white-setting",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "反欺诈数据"
                },
                {
                    name: "黑白灰库"
                },
                {
                    name: '黑白名单设置'
                }
            ],
            component: () => import("@/views/operationConfig/black-white-setting.vue")
        },

        // -------------------失信被执行人设置-----------------------
        {
            path: "/config/enforPersonSet",
            name: "enforPersonSet",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "公共服务"
                },
                {
                    name: '失信被执行人库'
                }
            ],
            component: () => import("@/views/operationConfig/enforPersonSet.vue"),

        },
        // -------------------操作配置-------各省商业公司数据-----------------------
        {
            path: "/config/companyDataSet",
            name: "companyDataSet",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "公共服务"
                },
                {
                    name: '各省商业公司数据'
                }
            ],
            component: () => import("@/views/operationConfig/companyDataSet.vue"),

        },



        // 行业动态设置
        {
            path: "/config/industry-dynamic",
            name: "industry-dynamic",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "账号设置"
                },
                {
                    name: "行业动态账户设置"
                },
                {
                    name: '行业动态设置'
                }
            ],
            component: () => import("@/views/operationConfig/industry-dynamic.vue")
        },
        //黑明名单详情
        {
            path: "/config/black-white-company-detail",
            name: "black-white-company-detail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "反欺诈数据"
                },
                {
                    name: "黑白灰库"
                },
                {
                    name: '黑白名单设置',
                    path: '/config/black-white-setting'
                }, {
                    name: '黑白名单详情'
                }
            ],
            component: () => import("@/views/operationConfig/black-white-company-detail.vue")
        },
        // 黑白灰名单 - 企业名单列表 - 修改企业名单
        {
            path: '/fraudPanel/namesList/amendNames',
            name: 'fraudPanel-namesList-amendNames',
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
                    name: '黑白名单设置',
                    path: '/config/black-white-setting'
                },
                {
                    name: '企业名单修改'
                }
            ],
            component: () => import('@/views/fraud/addNames')
        },
        // 黑白灰名单 - 账号名单列表 - 新增/修改企业名单
        {
            path: '/config/black-white-account',
            name: 'black-white-account',
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
                    name: '黑白名单设置',
                    path: '/config/black-white-setting'
                },
                {
                    name: '账号名单修改'
                }
            ],
            component: () => import('@/views/operationConfig/black-white-account.vue')
        },
        // 黑白灰名单 - 账号名单列表详情
        {
            path: '/config/black-white-account-detail',
            name: 'black-white-account-detail',
            meta: [{
                    name: '操作配置',
                },
                {
                    name: '内容设置'
                },
                {
                    name: '公共服务'
                },
                {
                    name: '黑白名单设置',
                    path: '/config/black-white-setting'
                },
                {
                    name: '账号名单详情'
                }
            ],
            component: () => import('@/views/operationConfig/black-white-account-detail.vue')
        },
        // 4.2.0 
        {
            path: '/config/zhongdeng/standard',
            name: 'config-zhongdneg-standard',
            meta: [{
                    name: '操作配置',
                },
                {
                    name: '内容设置'
                },
                {
                    name: '公共服务'
                },
                {
                    name: '中登网受让人规范',
                }
            ],
            component: () => import('@/views/operationConfig/zhongdeng/index.vue')
        },

        // -------------- 4.2.1 start ---------------------
        // 4.2.1 基建工程 - 企业数据 - 黑白灰名单 - 企业账号名单
        {
            path: '/view-construction/black-white',
            name: 'view-construction/black-white',
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
                    name: '黑白灰监控'
                }
            ],
            component: () => import('@/views/operationConfig/view-construction/black-white.vue')
        },
        // 4.2.1 医药医疗 - 企业数据 - 黑白灰库 - 企业账号名单
        {
            path: '/view-medicine/black-white',
            name: 'view-medicine/black-white',
            meta: [{
                    name: '医药医疗',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '黑白灰监控'
                }
            ],
            component: () => import('@/views/operationConfig/view-construction/black-white.vue')
        },
        // 4.2.1 能源化工 - 企业数据 - 黑白灰库 - 企业账号名单
        {
            path: '/view-energy/black-white',
            name: 'view-energy/black-white',
            meta: [{
                    name: '能源化工',
                },
                {
                    name: '企业数据'
                },
                {
                    name: '黑白灰库'
                },
                {
                    name: '黑白灰监控'
                }
            ],
            component: () => import('@/views/operationConfig/view-construction/black-white.vue')
        },
        // -------------- 4.2.1 end ---------------------

    ]
};

export default configRouter;
