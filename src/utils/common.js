export const sortFieldList = [{
    label: '按转让金额',
    value: 1
},
{
    label: '按融资金额',
    value: 2
},
{
    label: '按转让次数',
    value: 3
},
{
    label: '按合作时长',
    value: 4
},
]

//行业类别联动企业类别
export const companyTypeObj = {
    '': [ //全部
        '承建单位',
        '建设单位',
        '上游药厂',
        '商业公司',
        '下游医药',
        '合作上游',
        '合作下游',
        '供应商',
        '贸易商',
        '商业保理'
    ],
    1: [ //基建工程
        '承建单位',
        '建设单位'
    ],
    2: [ //医药医疗
        '上游药厂',
        '商业公司',
        '下游医药',
    ],
    3: [ //能源化工
        '合作上游',
        '合作下游',
        '供应商',
        '贸易商'
    ],
    0: [ //其他
        '商业保理'
    ]
}

//企业类型
export const entTypeLabel = (key) => {
    switch (key) {
        case "0":
            return "公司"
        case "1":
            return "社会组织"
        case "3":
            return "香港公司"
        case "4":
            return "政府机构"
        case "5":
            return "台湾公司"
        case "6":
            return "基金会"
        case "7":
            return "医院"
        case "8":
            return "海外公司"
        case "9":
            return "律师事务所"
        case "10":
            return "学校"
        case "-1":
            return "其他"
        default:
            '-'
    }
}
//企业类别
export const companyTypeList = ['承建单位',
    '建设单位',
    '上游药厂',
    '商业公司',
    '下游医药',
    '合作上游',
    '合作下游',
    '供应商',
    '贸易商',
    '商业保理'
]
//业务类别
export const businessCategoryList = [{
        value: 1,
        label: '承建单位'
    },
    {

        value: 2,
        label: '建设单位'
    },
]
// 公用材料
export const materialList = [{
        name: "型钢"
    },
    {
        name: "钢筋"
    },
    {
        name: "钢结构"
    },
    {
        name: "其它钢材"
    },
    {
        name: "水泥"
    },
    {
        name: "混凝土"
    },
    {
        name: "模板"
    },
    {
        name: "木枋"
    },
    {
        name: "劳务"
    },
    {
        name: "其它"
    }
]

export const projectTypeList = [{
        name: "基建"
    },
    {
        name: "房屋建筑工程"
    },
    {
        name: "市政工程"
    },
    {
        name: "工业厂房"
    },
    {
        name: "商业综合体"
    },
    {
        name: "其它"
    }
]

export const claimStatusList = [{
        key: 0,
        name: '未认领'
    },
    {
        key: 1,
        name: '已认领'
    }
]


export const deepClone = (obj) => {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]); // 递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
// 递归获取id
export const getParentId = (obj) => {
    var idsList = [];
    fn(obj);

    function fn(obj) {
        if (obj.id) {
            idsList.push(obj.id);
        }
        if (obj.parent) {
            fn(obj.parent);
        }
    }
    return idsList;
}

export const coreEnterpriseSystemLabel = (key) => {
    switch (key) {
        case 0:
            return '累计收录的企业数'
        case 1:
            return '中建体系企业数'
        case 2:
            return '中铁体系企业数'
        case 3:
            return '中铁建体系企业数'
        case 4:
            return '中交体系企业数'
        case -1:
            return '其他'
    }
}
export const negativeTypeLabel = (key) => {
    switch (key) {
        case 1:
            return '被执行人'
        case 2:
            return '失信被执行人'
        case 3:
            return '裁判文书'
        case 4:
            return '负面'

    }
}


export const getKeyValue = (data, obj) => {
    data.map(i => {
        if (i.value === null) {
            obj[i.date] = 0;
        } else {
            obj[i.date] = i.value;
        }
    });
    return obj;
}



export const sortBarOptions = [{
        label: "中标公告降序",
        value: "tender-desc"
    },
    {
        label: "中标明细降序",
        value: "bidder-desc"
    },
    {
        label: "中标公告升序",
        value: "tender-asc"
    },
    {
        label: "中标明细升序",
        value: "bidder-asc"
    },
];
//   数据渠道


export const sourceOptions = [{
        label: "云筑网",
        value: "云筑网"
    }, //中国建筑
    {
        label: "中国交建物资采购管理系统",
        value: "中国交建物资采购管理系统"
    }, //中交
    {
        label: "中国铁建物资采购网",
        value: "中国铁建物资采购网"
    }, //中铁建
    {
        label: "铁建商城",
        value: "铁建商城"
    }, //中铁建
    {
        label: "铁建汇采",
        value: "铁建汇采"
    }, //中铁建
    {
        label: "中铁鲁班商务网",
        value: "中铁鲁班商务网"
    } // 中铁
];

// 招标信息格式
export const fromOptions = [{
        label: "网页",
        value: "网页"
    },
    {
        label: "word",
        value: "word"
    },
    {
        label: "pdf",
        value: "pdf"
    }
]
// 招标日期
export const dateOptions = [{
        label: '全部',
        value: '3'
    },
    {
        label: '招标日期',
        value: '1'
    },
    {
        label: '中标日期',
        value: '2'
    }
    // "type": "1" //1:招标日期 2:中标日期 3:所有

]




export const cancelFlagLabel = (key) => {
    switch (key) {
        case 0:
            return '有效'
        case 1:
            return '作废'
    }
}
export const isRedLabel = (key) => {
    switch (key) {
        case 0:
            return '否'
        case 1:
            return '是'
    }
}
export const usedFlagLabel = (key) => {
    switch (key) {
        case 0:
            return '否'
        case 1:
            return '是'
    }
}

export const invoiceTypeLabel = (key) => {
    switch (key) {
        case '01':
            return '增值税专用发票'
        case '03':
            return '机动车销售统一发票'
        case '04':
            return '增值税普通发票'
        case '10':
            return '增值税普通发票(电子)'
    }
}
export const checkResultLabel = (key) => {
    switch (key) {
        case 0:
            return '失败'
        case 1:
            return '成功'
    }
}
export const channelLabel = (key) => {
    switch (key) {
        case "1":
            return '风报'
        case "2":
            return 'CFCA'
        case "3":
            return '天御反欺诈'
    }
}
export const industryCategoryLabel = (key) => {
    switch (key) {
        case 0:
            return '其他'
        case 1:
            return '基建工程'
        case 2:
            return '医药医疗'
        case 3:
            return '能源化工'
        default:
            return '-'
    }
}
export const tradeStatusLabel = (key) => {
    switch (key) {
        case 0:
            return '正常'
        case 1:
            return '被抹账'
        case 2:
            return '处理中'
        default:
            return "-"

    }
}
export const sourceLabel = (key) => {
    switch (key) {
        case 1:
            return '猫池'
        case 2:
            return '主账户'
        case 3:
            return '二级账户'
        case 4:
            return '银行流水'
    }
}
export const isCashSweepLabel = (key) => {
    switch (key) {
        case 0:
            return '否'
        case 1:
            return '是'
        default:
            return '-'

    }
}
export const invoiceTagLabel = (key) => {
    switch (key) {
        case 0:
            return '未知'
        case 1:
            return '正常'
        case 2:
            return '异常'
    }
}
export const relationLabel = (key) => {
    switch (key) {
        case "分支机构":
            return 'branch'
        case "客户供应商":
            return 'clientSupplier'
        case '诉讼关联':
            return 'court'
        case '兄弟公司':
            return 'sibling'
        case '债务/债权':
            return 'debt'
        case '历史投资':
            return 'exInv'
        case '历史股东':
            return 'exSh'
        case '疑似关联':
            return 'guess'
        case '投资':
            return 'invest'
        case '判决关联':
            return 'legal'
        case '成员':
            return 'member'
        case '业务竞争':
            return 'purchase'
        case '股东':
            return 'shareholder'
    }
}
export const evaluateStatusLabel = (key) => {
    switch (key) {
        case 0:
            return '评估中'
        case 1:
            return '评估完成'
        default:
            return '-'
    }
}

export const cancelFlagList = [{
        value: '0',
        label: '有效'
    },
    {
        value: '1',
        label: '作废'
    },
]
export const industryCategoryList = [{
        value: 1,
        label: '基建工程'
    },
    {
        value: 2,
        label: '医药医疗'
    },
    {
        value: 3,
        label: '能源化工'
    },
    {
        value: 0,
        label: '其他'
    }
]
export const isRedList = [{
        value: '0',
        label: '否'
    },
    {
        value: '1',
        label: '是'
    },
]
export const usedFlagList = [{
        value: '0',
        label: '否'
    },
    {
        value: '1',
        label: '是'
    },
]

export const invoiceTypeList = [{
        value: '01',
        label: '增值税专用发票'
    },
    {
        value: '03',
        label: '机动车销售统一发票'
    },
    {
        value: '04',
        label: '增值税普通发票'
    },
    {
        value: '10',
        label: '增值税普通发票(电子)'
    },

]

export const templateList = [{
        value: 'cooperationYear',
        label: '合作年限'
    },
    {
        value: 'firstBidDate',
        label: '最近中标日期'
    },
    {
        value: 'bidCount',
        label: '历史中标总次数'
    },
    {
        value: 'bidCountYear',
        label: '近一年中标总次数'
    },
    {
        value: 'material',
        label: '中标材料 '
    },
    {
        value: 'businessStatus',
        label: '工商登记状态 '
    },
    {
        value: 'executedDishonest',
        label: '失信被执行 '
    },
    {
        value: 'projectProvince',
        label: '中标项目地域分布 '
    },
    {
        value: 'projectType',
        label: '中标项目类型 '
    },
    {
        value: 'tenderee',
        label: '招标单位  '
    },

]

//params[0]  爸爸  
//params[1]  跟爸爸校对
// key   key的名称
export const getDaysValue = (dayList, list, key, obj = {}) => {
    dayList.map(i => {
        obj[i] = {
            invoiceDate: i,
            [key]: 0
        }

        list.map(j => {

            if (i === Number(j.invoiceDate)) {
                obj[j.invoiceDate] = {
                    invoiceDate: j.invoiceDate,
                    [key]: j[key]
                }

            }

        })
    })
    return Object.values(obj)
}
//dayList  爸爸  
//list 跟爸爸校对
// key   key的名称
// dateKey key的名称
export const getSuperDaysValue = (dayList, list, key, dateKey, obj = {}) => {
    dayList.map(i => {
        obj[i] = {
            [dateKey]: i,
            [key]: 0
        }

        list.map(j => {

            if (i === j[dateKey]) {
                obj[j[dateKey]] = {
                    [dateKey]: j[dateKey],
                    [key]: j[key]
                }

            }

        })
    })
    return Object.values(obj)
}


// 板块
export const plateList = [
    /*{
        label: '全部',
        value: '',
    },*/
    {
        label: '基建工程',
        value: 1
    },
    {
        label: '医药医疗',
        value: 2
    },
    {
        label: '能源化工',
        value: 3
    },
    {
        label: '其他',
        value: 0
    },
]
export const plateListThree = [
    /*{
        label: '全部',
        value: '',
    },*/
    {
        label: '基建工程',
        value: 1
    },
    {
        label: '医药医疗',
        value: 2
    },
    {
        label: '能源化工',
        value: 3
    }
]
// 等级
export const gradeList = [
    /*{
        label: '请选择',
        value: '',
    },*/
    {
        label: '一级单位',
        value: 1
    },
    {
        label: '二级单位',
        value: 2
    },
    {
        label: '三级单位',
        value: 3
    }
]

// 名单类型
export const listType = [
    /*{
        label: '请选择',
        value: '',
    },*/
    {
        label: '待定名单',
        value: 0
    },
    {
        label: '白名单',
        value: 1
    },
    {
        label: '黑名单',
        value: 2
    },
    {
        label: '灰名单',
        value: 3
    }
]

// 审核状态
export const auditList = [
    /*{
        label: '请选择',
        value: '',
    },*/
    {
        label: '待审核',
        value: 0
    },
    {
        label: '通过',
        value: 1
    },
    {
        label: '否决',
        value: 2
    },
    {
        label: '退回',
        value: 3
    }
]


//部门
export const departmentList = [{
        label: '企业金融部门',
        value: 0
    },
    {
        label: '运营部',
        value: 1
    },
    {
        label: '风险管理部',
        value: 2
    },
]
//交易类型
export const TransactionTypeList = [{
        label: '收入',
        value: 0
    },
    {
        label: '支出',
        value: 1
    },
]
//猫池来源
export const catPoolSource = [{
        label: '猫池',
        value: 0,
    },
    {
        label: '主账户',
        value: 1,
    },
    {
        label: '二级账户',
        value: 2,
    }
]

// 接收类型
export const receptionList = [
    // {
    //     label: '请选择',
    //     value: '',
    // },
    {
        label: '固定标签',
        value: 1
    },
    {
        label: '固定公众号',
        value: 2
    }
]
// 公众号类别
export const officialTypeList = [
    // {
    //     label: '类别选择',
    //     value: '',
    // },
    {
        label: '基建工程',
        value: 1
    },
    {
        label: '医药医疗',
        value: 2
    },
    {
        label: '能源化工',
        value: 3
    },
    {
        label: '公共动态',
        value: 4
    },
]
//受让人类型
export const assigneeTypeLabel = (key) => {
    switch (key) {
        case 1:
            return '银行'
        case 2:
            return '证券公司'
        case 3:
            return '保理公司'
        case 4:
            return '其他'
        default:
            return '-'
    }
}

//获取树形结构
export const getTreeArr = (paths) => {
    // debugger

    return paths.reduce((acc, obj) => {
        if (obj.level === '1') {
            acc.children = [obj]

        } else if (obj.level === '2') {
            acc.children[0].children = [obj]
        } else if (obj.level === '3') {
            acc.children[0].children[0].children = [obj]
        } else if (obj.level === '4') {
            acc.children[0].children[0].children[0].children = [obj]
        }
        return acc

    }, {})
}
