import Layout from "@/layout/index";

const resourceRouter = {
    path: "/service",
    component: Layout,
    name: "service",
    redirect: "/service/output",
    children: [

        // 尽调报告
        {
            path: "/service/diligence",
            name: "service-diligence",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "尽调数据"
                },
                {
                    name: "尽调报告"
                }
            ],
            component: () => import("@/views/service/diligence.vue")
        },
        //尽调报告详情
        {
            path: "/report-detail/:id/:customerName",
            name: "report-detail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "尽调报告",
                    path: "/service/diligence"
                },
                {
                    name: "尽调报告详情"
                }
            ],
            component: () => import("@/views/service/report-detail.vue")
        },
        // 销项发票
        {
            path: "/service/industryTrends",
            name: "service-industryTrends",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "贷后监控"
                },
                {
                    name: "行业动态"
                }
            ],
            component: () => import("@/views/service/industryTrends.vue")
        },
        // 销项发票
        {
            path: "/service/output",
            name: "service-output",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据处理"
                },
                {
                    name: "发票数据"
                },
                {
                    name: "销项发票"
                }
            ],
            component: () => import("@/views/service/output.vue")
        },
        {
            path: "/service/income",
            name: "service-income",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据处理"
                },
                {
                    name: "发票数据"
                },
                {
                    name: "进项发票"
                }
            ],
            component: () => import("@/views/service/income.vue")
        },

        {
            path: "/service/winning-edit",
            name: "service-winning-edit",
            meta: [{
                    name: "操作配置"
                },
                {
                    name: "内容设置"
                },
                {
                    name: "中标数据更新"
                },
                {
                    name: "编辑"
                }
            ],
            component: () => import("@/views/service/winning-edit.vue")
        },
        {
            path: "/service/winning-add",
            name: "service-winning-add",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "中标采集设置"
                },
                {
                    name: "中标数据库"
                }
            ],
            component: () => import("@/views/service/winning-add.vue")
        },
        // 授信评估

        //新增评估
        {
            path: "/config/credit-evaluate",
            name: "credit-evaluate",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "授信数据"
                },
                {
                    name: '授信评估'
                }
            ],
            component: () => import("@/views/operationConfig/credit-evaluate.vue")
        }, {
            path: "/service/credit-evaluate",
            name: "service-credit-evaluate",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "授信数据"
                },
                {
                    name: "评估结果"
                }
            ],
            component: () => import("@/views/service/credit-evalute.vue")
        },
        {
            path: "/service/company-evalute-list",
            name: "service-company-evalute-list",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "预授评估"
                },
                {
                    name: "企业评估列表"
                }
            ],
            component: () => import("@/views/service/company-evalute-list.vue")
        },
        {
            path: "/service/nature-evalute-list",
            name: "service-nature-evalute-list",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷前数据"
                },
                {
                    name: "预授评估"
                },
                {
                    name: "企业评估列表"
                }
            ],
            component: () => import("@/views/service/nature-evalute-list.vue")
        },
        {
            path: "/service/money-water",
            name: "service-money-water",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "资金流水数据库"
                },
                {
                    name: "资金流水数据库"
                }
            ],
            component: () => import("@/views/service/service-money-water.vue")
        },
        // 公共服务失信被执行人
        {
            path: '/enforcementPerson',
            name: 'enforcementPerson',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '黑白灰库'
            }, {
                name: '失信被执行人库'
            }],
            component: () => import('@/views/medicalTreatment/enforcementPerson')
        },
        // 公共服务失信被执行人弹窗
        {
            path: '/service/enforPersonMessage/enforDetailDialog',
            name: 'service-enforDetailDialog',
            meta: [{
                name: '公共服务',
            }, {
                name: '反欺诈数据'
            }, {
                name: '黑白灰库'
            }, {
                name: '失信被执行人库',
                path: '/enforcementPerson'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/enforPersonMessage/enforDetailDialog')
        },
        // 公共服务被执行人弹窗
        {
            path: '/service/enforPersonMessage/enforPersonDialog',
            name: 'service-enforPersonDialog',
            meta: [{
                name: '公共服务',
            }, {
                name: '贷前数据'
            }, {
                name: '授信评估'
            }, {
                name: '失信被执行人库',
                path: '/enforcementPerson'
            }, {
                name: '详情'
            }],
            component: () => import('@/views/medicalTreatment/enforPersonMessage/enforPersonDialog')
        },
        {
            path: "/service/money-water-detail",
            name: "service-money-water-detail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "资金流水数据库"
                },
                {
                    name: "资金流水数据库",
                    path: "/service/money-water"
                },
                {
                    name: "详情"
                }
            ],
            component: () => import("@/views/service/money-water/detail.vue")
        },
        {
            path: "/service/money-water-main-detail",
            name: "service-money-water-main-detail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "资金流水数据库"
                },
                {
                    name: "资金流水数据库",
                    path: "/service/money-water"
                },
                {
                    name: "详情"
                }
            ],
            component: () => import("@/views/service/money-water/main-detail.vue")
        },
        {
            path: "/service/money-water-bank-detail",
            name: "service-money-water-bank-detail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "资金流水数据库"
                },
                {
                    name: "资金流水数据库",
                    path: "/service/money-water"
                },
                {
                    name: "详情"
                }
            ],
            component: () => import("@/views/service/money-water/bank-detail.vue")
        },
        //企业关系图分析
        {
            path: "/service/company-relation",
            name: "service-company-relation",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "反欺诈数据"
                },
                {
                    name: "反欺诈小工具"
                },
                {
                    name: "企业关系图分析"
                },

            ],
            component: () => import("@/views/data-tools/realtion.vue")
        },
        //企业认定关系图分析
        {
            path: "/service/identified-relation",
            name: "service-identified-relation",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "反欺诈数据"
                },
                {
                    name: "反欺诈小工具"
                },
                {
                    name: "企业关联方认定分析"
                },

            ],
            component: () => import("@/views/data-tools/identified-relation.vue")
        },
        // 财政数据
        {
            path: '/drugIndustryData',
            name: 'drugIndustryData',
            meta: [{
                name: '医药医疗',
            }, {
                name: '产业宏观'
            }, {
                name: '产业数据'
            }, {
                name: '财政数据'
            }],
            component: () => import('@/views/medicalTreatment/drugIndustryData')
        },
        // 转让项目列表-详情
        {
            path: "/service/zhongdeng/projectListDetail",
            name: "service-zhongdeng-projectListDetail",
            meta: [{
                    name: "公共服务"
                },
                {
                    name: "贷后数据"
                },
                {
                    name: "中登应用"
                },
                {
                    name: "中登网登记明细详情",
                    path: "/zhongdeng/index"
                },

            ],
            component: () => import("@/views/zhongdeng/projectListDetail.vue")
        }
    ]
};

export default resourceRouter;
