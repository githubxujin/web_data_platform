const menu = [{
        resourceName: "基建工程",
        childList: [{
                resourceName: "产业宏观",
                childList: [{
                        resourceName: "法律法规"
                    },
                    {
                        resourceName: "监管机构",
                        childList: [{
                            resourceName: "住建部",
                            resourcePath: "/industrial-policy"
                        }]
                    },
                    {
                        resourceName: "产业政策"
                    },
                    {
                        resourceName: "产业舆情"
                    }
                ]
            },
            {
                resourceName: "企业数据",
                childList: [{
                        resourceName: "供应商",
                        childList: [{
                                resourceName: "供应商库",
                                resourcePath: "/supplierLibrary"
                            },
                            {
                                resourceName: "预授信库",
                                resourcePath: "/prospectiveList"
                            }
                        ]
                    },
                    {
                        resourceName: "承建单位"
                    },
                    {
                        resourceName: "建设单位"
                    },
                    {
                        resourceName: "黑白灰库",
                        childList: [{
                            resourceName: "黑白灰监控",
                            resourcePath: "/view-construction/black-white"
                        }]
                    }
                ]
            },
            {
                resourceName: "交易数据",
                childList: [{
                        resourceName: "项目数据",
                        childList: [{
                            resourceName: "项目库",
                            resourcePath: "/projectTabs"
                        }]
                    },
                    {
                        resourceName: "招投标数据",
                        childList: [{
                                resourceName: "中国建筑中标数据",
                                resourcePath: "/biddingDate"
                            },
                            {
                                resourceName: "中国中铁中标数据",
                                resourcePath: "/in-win-data-zz"
                            },
                            {
                                resourceName: "中国铁建中标数据",
                                resourcePath: "/in-win-data-zt"
                            },
                            {
                                resourceName: "中国交建中标数据",
                                resourcePath: "/in-win-data-zj"
                            },
                            {
                                resourceName: "中国铁塔中标数据",
                                resourcePath: "/in-win-data-tieta"
                            }
                        ]


                    },
                    {
                        resourceName: "价格数据",
                        childList: [{
                                resourceName: "钢材价格",
                                resourcePath: "/steel-price"
                            },
                            {
                                resourceName: "水泥价格",
                                resourcePath: "/cement-price"
                            }
                        ]
                    },
                    {
                        resourceName: "物流数据",
                        childList: [{
                            resourceName: "到货视频库",
                            resourcePath: "/dataAdministration/delivery-query"
                        }]
                    },
                    {
                        resourceName: "资金流数据"
                    }
                ]
            },
            {
                resourceName: "金融数据",
                childList: [{
                        resourceName: "额度数据"
                    },
                    {
                        resourceName: "转让数据"
                    },
                    {
                        resourceName: "融资数据"
                    },
                    {
                        resourceName: "账期数据"
                    },
                    {
                        resourceName: "付款数据"
                    },
                    {
                        resourceName: "回款数据"
                    },
                    {
                        resourceName: "息费数据"
                    },
                    {
                        resourceName: "中登数据"
                    },
                    {
                        resourceName: "征信数据"
                    }
                ]
            }
        ]
    },
    {
        resourceName: "医药医疗",
        childList: [{
                resourceName: "产业宏观",
                childList: [{
                        resourceName: "法律法规"
                    },
                    {
                        resourceName: "监管机构"
                    },
                    {
                        resourceName: "产业政策"
                    },
                    {
                        resourceName: "产业舆情"
                    },
                    {
                        resourceName: "产业数据",
                        childList: [{
                                resourceName: "财政数据",
                                resourcePath: "/drugIndustryData"
                            },
                            {
                                resourceName: "医疗服务数据",
                                resourcePath: "/database"
                            },
                            // {
                            //     resourceName: "宏观经济运行",
                            //     resourcePath: "/runTime"
                            // }
                        ]
                    }
                ]
            },
            // 新增中游流通--->商业公司库页面
            {
                resourceName: "企业数据",
                childList: [{
                        resourceName: "工业企业",
                        childList: [{
                            resourceName: '药厂库',
                            resourcePath: '/pharmaceuticalFactory'
                        }]
                    },
                    {
                        resourceName: "流通企业",
                        childList: [{
                            resourceName: '商业公司库',
                            resourcePath: "/middleManage/manage"
                        }]
                    },
                    {
                        resourceName: "终端",
                        childList: [{
                            resourceName: "医院库",
                            resourcePath: "/medicalHomePage"
                        }]
                    },
                    {
                        resourceName: "黑白灰库",
                        childList: [{
                            resourceName: "黑白灰监控",
                            resourcePath: "/view-medicine/black-white"
                        }]
                    }
                ]

            },
            {
                resourceName: "交易数据",
                childList: [{
                        resourceName: "医药库",
                        childList: [{
                                resourceName: "上市药品",
                                resourcePath: "/drugStorage"
                            },
                            {
                                resourceName: "医保目录库",
                                resourcePath: "/insurance"
                            },
                            {
                                resourceName: "基药目录库",
                                resourcePath: "/basic"
                            },
                            {
                                resourceName: "参比药物及上市药物",
                                resourcePath: "/drugs"
                            },
                            {
                                resourceName: "OTC目录库",
                                resourcePath: "/otc"
                            },
                            {
                                resourceName: "重点监控目录",
                                resourcePath: "/drug/directory"
                            },
                            {
                                resourceName: "MID药品目录库",
                                resourcePath: "/midDrug"
                            },
                            {
                                resourceName: "一致性评价库",
                                resourcePath: "/consistencyDatabase"
                            }
                        ]
                    },
                    {
                        resourceName: "器材库",
                        childList: [{
                            resourceName: '器械库',
                            resourcePath: '/instrument'
                        }]
                    },
                    {
                        resourceName: "招投标数据",
                        childList: [{
                            resourceName: "药品招投标库",
                            resourcePath: "/tenderDatabase"
                        }]
                    },
                    {
                        resourceName: "进销存数据",
                        childList: [{
                            resourceName: "药品流向",
                            resourcePath: "/drug-price"
                        }]
                    },
                    {
                        resourceName: "资金流数据",
                        childList: [{
                            resourceName: "发票数据",
                            resourcePath: "/invoiceData"
                        }]
                    }
                ]
            },
            {
                resourceName: "金融数据",
                childList: [{
                        resourceName: "额度数据"
                    },
                    {
                        resourceName: "转让数据"
                    },
                    {
                        resourceName: "融资数据"
                    },
                    {
                        resourceName: "账期数据"
                    },
                    {
                        resourceName: "付款数据"
                    },
                    {
                        resourceName: "回款数据"
                    },
                    {
                        resourceName: "息费数据"
                    },
                    {
                        resourceName: "中登数据"
                    },
                    {
                        resourceName: "征信数据"
                    }
                ]
            }
        ]
    },
    {
        resourceName: "能源化工",
        childList: [{
                resourceName: "产业宏观",
                childList: [{
                        resourceName: "法律法规"
                    },
                    {
                        resourceName: "监管机构"
                    },
                    {
                        resourceName: "产业政策"
                    },
                    {
                        resourceName: "产业舆情"
                    },
                    {
                        resourceName: "产业数据",
                        childList: [{
                                resourceName: '港口库',
                                resourcePath: '/resource/harbor'
                            },
                            {
                                resourceName: '航线跟踪',
                                resourcePath: '/resource/ship-route'
                            },
                        ]
                    },


                ]
            },
            {
                resourceName: "企业数据",
                childList: [{
                        resourceName: "供应商",
                        childList: [{
                            resourceName: "供应商库",
                            resourcePath: "/resource/supplier"
                        }]
                    },
                    {
                        resourceName: "贸易商",
                        childList: [{
                            resourceName: "贸易商库",
                            resourcePath: "/resource/merchant"
                        }]
                    },
                    {
                        resourceName: "黑白灰库",
                        childList: [{
                            resourceName: " 黑白灰监控",
                            resourcePath: "/view-energy/black-white"
                        }]
                    }
                ]
            },
            {


                resourceName: "交易数据",
                childList: [{
                        resourceName: "招投标数据",
                        childList: [{
                                resourceName: "中石油中标数据",
                                resourcePath: "/resource/petroleum"
                            },
                            {
                                resourceName: "中石化中标数据",
                                resourcePath: "/resource/petrifaction"
                            },
                            {
                                resourceName: "中海油中标数据",
                                resourcePath: "/resource/cnooc"
                            }



                        ]
                    },
                    {
                        resourceName: "价格数据",
                        childList: [{
                                resourceName: "原油价格",
                                resourcePath: "/resource/price-crudeOil"
                            },
                            // {
                            //     name: "成品油价格",
                            //     path: "/resource/price-productOil"
                            // }
                        ]
                    }
                ]
            },
            {
                resourceName: "金融数据"
            }
        ]
    },
    {
        resourceName: "公共服务",
        childList: [{
                resourceName: "贷前数据",
                childList: [{
                        resourceName: "授信数据",
                        childList: [{
                                resourceName: "授信评估",
                                resourcePath: "/config/credit-evaluate"
                            },
                            {
                                resourceName: "评估数据",
                                resourcePath: "/service/credit-evaluate"
                            }
                        ]
                    },
                    {
                        resourceName: "尽调数据",
                        childList: [{
                            resourceName: "尽调报告",
                            resourcePath: "/service/diligence"
                        }]
                    },
                    {
                        resourceName: "到货视频",
                        childList: [{
                            resourceName: "到货视频审核",
                            resourcePath: "/dataAdministration/delivery"
                        }]
                    },
                    {
                        resourceName: "中标采集"
                    }
                ]
            },
            {
                resourceName: "贷后数据",
                childList: [{
                        resourceName: "贷后监控",
                        childList: [
                            // {
                            //     resourceName: "行业动态",
                            //     resourcePath: "/service/industryTrends"
                            // }
                        ]
                    },
                    {
                        resourceName: "风控台账数据"
                    },
                    {
                        resourceName: "运营台账数据"
                    },
                    {
                        resourceName: "中登应用",
                        childList: [{
                            resourceName: "中登数据",
                            resourcePath: "/zhongdeng/index"
                        }]
                    },
                    {
                        resourceName: "发票数据",
                        childList: [{
                                resourceName: "销项发票",
                                resourcePath: "/service/output"
                            },
                            {
                                resourceName: "进项发票",
                                resourcePath: "/service/income"
                            }
                        ]
                    },
                    {
                        resourceName: "企业流水监控",
                        childList: [{
                            resourceName: "企业流水数据",
                            resourcePath: "/service/money-water"
                        }]
                    }
                ]
            },
            {
                resourceName: "反欺诈数据",
                childList: [{
                        resourceName: "舆情监控",
                        childList: [{
                            resourceName: "舆情库",
                            resourcePath: "/risk-control/index"
                        }]
                    },
                    {
                        resourceName: "行业动态",
                        childList: [{
                            resourceName: "行业动态库",
                            resourcePath: "/service/industryTrends"
                        }]
                    },

                    {
                        resourceName: "黑白灰库",
                        childList: [{
                            resourceName: "名单管理",
                            resourcePath: "/config/black-white-setting"
                        }]
                    },
                    {
                        resourceName: "反欺诈小工具",
                        childList: [{
                                resourceName: "企业关系图分析",
                                resourcePath: "/service/company-relation"
                            },
                            {
                                resourceName: "企业关联方认定分析",
                                resourcePath: "/service/identified-relation"
                            },
                            {
                                resourceName: "企业股权穿透分析",
                                resourcePath: "/data-tools/equity"
                            },
                            {
                                resourceName: "企业实控人穿透分析",
                                resourcePath: "/data-tools/controller-query"
                            },

                            {
                                resourceName: "企业银行账户关联分析",
                                resourcePath: "/data-tools/account-relation"
                            },
                            {
                                resourceName: "自然人反欺诈评估",
                                resourcePath: "/data-tools/ty-fraud"
                            },
                            {
                                resourceName: "中国建筑组织结构查询",
                                resourcePath: "/data-tools/organization"
                            }
                        ]
                    },
                    {
                        name: "黑白灰库",
                        children: [{
                                name: "黑白名单设置",
                                path: "/config/black-white-setting"
                            },
                            {
                                name: "失信被执行人库",
                                path: "/enforcementPerson"
                            }
                        ]
                    }
                ]
            },
            // {
            //     resourceName: "资金数据"
            // },
            // {
            //     resourceName: "资产数据"
            // },
            {
                resourceName: "金融数据",
                childList: [{
                    resourceName: "金融机构",
                    childList: [{
                        resourceName: "保理公司库",
                        resourcePath: "/financing"
                    }]
                }]
            }
        ]
    }, {
        resourceName: "操作配置",
        childList: [{
                resourceName: "账号设置",
                childList: [{
                        resourceName: "行业动态",
                        childList: [{
                            resourceName: "行业动态设置",
                            resourcePath: "/config/industry-dynamic"
                        }]
                    },
                    {
                        resourceName: "药品流向"
                    }
                ]
            },
            {
                resourceName: "权限设置"
            },
            {
                resourceName: "通知设置",
                childList: [{
                    resourceName: "邮箱通知"
                }]
            },
            {
                resourceName: "内容设置",
                childList: [{
                        resourceName: "基建工程",
                        childList: [{
                                resourceName: "招标单位名称规范",
                                resourcePath: "/standardList"
                            },
                            {
                                resourceName: "预授信模板",
                                resourcePath: "/in-win-data"
                            },
                            {
                                resourceName: "项目数据更新",
                                resourcePath: "/projectUpdate"
                            },
                            {
                                resourceName: "中标数据库更新",
                                resourcePath: "/service/winning"
                            }
                        ]
                    },
                    {
                        resourceName: "医药医疗",
                        childList: [{
                                resourceName: "药品名称规范",
                                resourcePath: "/drugName"
                            },
                            {
                                resourceName: "下游名称规范",
                                resourcePath: "/downstreamName"
                            },
                            {
                                resourceName: "医院数据更新",
                                resourcePath: "/hospitalData"
                            },
                            {
                                resourceName: "药品数据更新",
                                resourcePath: "/drugData"
                            },
                            {
                                resourceName: "发票内容校验",
                                resourcePath: "/service/invoice-content-check"
                            },

                            {
                                resourceName: "药厂库更新",
                                resourcePath: "/drugFactoryNum"
                            },
                            {
                                resourceName: "机械库更新",
                                resourcePath: "/instrumentIncreate"
                            },
                            {
                                resourceName: "商业公司库更新",
                                resourcePath: "/manageSetting"
                            },

                        ]
                    },
                    {
                        resourceName: "能源化工"
                    },
                    {
                        resourceName: "公共服务",
                        childList: [{
                                resourceName: "猫池数据配置",
                                resourcePath: "/config/money-water"
                            },
                            {
                                resourceName: "失信被执行人库",
                                resourcePath: "/config/enforPersonSet"
                            },
                            {
                                resourceName: "各省商业公司数据",
                                resourcePath: "/config/companyDataSet"
                            },
                            {
                                resourceName: "保理公司库数据更新",
                                resourcePath: "/financing-operation"
                            },
                            {
                                resourceName: "监控企业配置",
                                resourcePath: "/monitoring"
                            },
                            {
                                resourceName: "监控企业分配",
                                resourcePath: "/allocation"
                            },
                            {
                                resourceName: "舆情重大事件设置",
                                resourcePath: "/popular"
                            },
                            {
                                resourceName: "中登网受让人规范",
                                resourcePath: "/config/zhongdeng/standard"
                            },
                        ]
                    }
                ]
            }
        ]
    }
];

export default menu;
