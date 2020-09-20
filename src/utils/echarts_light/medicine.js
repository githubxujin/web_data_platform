
/*
常用：
// 图例文字颜色
lineOpt.legend.textStyle.color = this.$medicine.legendColor

// 鼠标移入显示的背景颜色
opt.tooltip.backgroundColor = this.$medicine.tooltipBG 

// 滚动条
opt.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
opt.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]

// 标题
opt.title.textStyle.color = this.$medicine.title

// 饼图内圈的细线
pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring

// 折线图 - 鼠标移入显示的直线颜色
chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover

// 折线图 - 坐标线/网格线 颜色
industryTrends.yAxis.splitLine = this.$medicine.axis  // {...this.$medicine.axis,show: true}  网格
industryTrends.yAxis.axisLine = this.$medicine.axis
industryTrends.xAxis.axisLine = this.$medicine.axis

// 折线图 - 刻度线
chartData.xAxis.axisTick = this.$medicine.axis
chartData.yAxis.axisTick = this.$medicine.axis

*/

export default {
    // 图例文字颜色
    legendColor: '#666',
    // 鼠标移入显示的直线颜色 - 渐变
    onmouseover: [
        {
            offset: 0,
            color: 'rgba(64,100,212,1)'
        },
        {
            offset: 0.5,
            color: 'rgba(64,100,212,1)'
        },
        {
            offset: 1,
            color: 'rgba(64,100,212,1)'
        }
    ],
    // 鼠标移入显示的直线颜色 - 实线
    onmouseoverLine: '#7395FF',
    // 标题
    title: '#333',
    // 鼠标移入显示的背景色
    tooltipBG: 'rgba(0,0,0,0.70)',
    // 饼图-内边样式
    ring: '#D2D9E5',
    // 坐标网格线颜色
    axis: { lineStyle: { color: ['#ccc'] } },
    //坐标字体颜色
    nameColor: '#999',

    // 医药医疗 /企业数据 /下游终端 /医院库
    'medicalHomePage': {
        projectPie: ['#43B7A5', '#E4F8FA'],
        formatterColor: '#666',
        drawIncludedPie: [
            '#02B9A6', '#09BDB7', '#0FBEAE', '#15BFA8 ', '#1CC09F',
            '#21C197 ', '#28C390 ', '#2DC48C ', '#2DC48C', '#3DC889',
            '#43C988', '#4ACB87 ', '#50CD86 ', '#59CF85 ', '#5CD084',
            '#66D283 ', '#6ED481', '#73D680', '#79D77F', '#82D97E',
            '#88DA7C', '#90DD7B', '#95DE7A', '#9CE079', '#A3E177',
            '#AAE377', '#B2E575', '#B6E674', '#C0E973', '#C7EB72',
            '#CCEC70', '#D2ED6F']
    },

    // 医药医疗 /产业交易 /进销存数据 /药品流向
    'drugprice': {
        // 上下游规模
        scale: {
            tooltip: 'rgba(0,0,0,0.70)',
            series0: ['#4064D4', 'rgba(64,100,212,0.91)'],
            areaStyle: ['rgba(64,100,212,0)', 'rgba(64,100,212,0.20)'],
            series1: ['#36C2CF', 'rgba(90,209,185,1)']
        },
        // 药品明细
        detail: {
            arrColor: [{ color: "#7894EA" }, { color: "#36C2CF" }, { color: "#81E3C7" }],
            Arrline: [
                {
                    normal: {
                        color: "#5AD1B9",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                },
                {
                    normal: {
                        color: "#36C2CF",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                },
                {
                    normal: {
                        color: "#81E3C7",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                }
            ],
            Arrgrowth: [ // 增长率
                {
                    normal: {
                        color: "#2FB79B",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                },
                {
                    normal: {
                        color: "#36C2CF",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                },
                {
                    normal: {
                        color: "#81E3C7",
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                }
            ]
        },
        // 药品价格
        price: {
            tooltipLight: ['rgba(120,207,214,0)', 'rgba(67,161,172,1)', 'rgba(67,161,172,0)'],
            series0: ['rgba(90,209,185,0.61)', 'rgba(90,209,185,0)', 'rgba(90,209,185,0.61)'],
            series1: ['#4064D4', 'rgba(64,100,212,0)', 'rgba(64,100,212,0.2)'],
            formatter: ['rgba(90,209,185,0.61)', '#4064D4']
        },
    },

    // 能源化工 /交易数据 /招投标数据
    // 中石油中标数据
    'petroleum': {
        itemStyle: '#36C2CF',
        areaStyle: ['rgba(90,209,185,0.11)', 'rgba(90,209,185,0.11)'],
    },
    //公共服务 /贷后数据处理 /发票数据 /销项发票 /关联应用 /回款预测
    'output': {
        colorList: [
            { color: '#36C2CF', active: false, projectName: '' },
            { color: '#4064D4', active: false, projectName: '' },
            { color: '#FBB148 ', active: false, projectName: '' },
            { color: '#EB6F98', active: false, projectName: '' },
            { color: '#2757FC', active: false, projectName: '' }
        ]
    },
    //公共服务 /贷前数据 /授信数据 /授信评估 /企业评估详情 /关联数据
    'company_evalute_list': {
        color: ['#4064D4', '#3DBD7D', '#5554F0', '#4598FF', '#5AD1B9', '#4064D4', ' #FF946A',
            '#EB6F98', '#70C6FF',
            '#81E3C7', '#6FD7C2', '#12B29E', '#DBE67D'
        ],
        typeList: [{
            name: '分支机构',
            borderColor: '#297D70'
        }, {
            name: '客户供应商',
            borderColor: '#636389'
        }, {
            name: '诉讼关联',
            borderColor: '#7D352D'
        }, {
            name: '债务/债权',
            borderColor: '#A15D41'
        }, {
            name: '历史投资',
            borderColor: '#B28149'
        }, {
            name: '历史股东',
            borderColor: '#43648C'
        }, {
            name: '疑似关联',
            borderColor: '#29617D'
        }, {
            name: '投资',
            borderColor: '#B29E49'
        }, {
            name: '判决关联',
            borderColor: '#3B478D'
        }, {
            name: '成员',
            borderColor: '#9BBC6C'
        }, {
            name: '业务竞争',
            borderColor: '#834455'
        }, {
            name: '股东',
            borderColor: '#355C9C'
        }, {
            name: '兄弟公司',
            borderColor: '#5A8D73'
        }, {
            name: '公司'
        }]
    },
    //公共服务 /反欺诈数据 /反欺诈小工具 /股权穿透
    'equity': {
        bg: ['#4064D4', '#F6F7FB'],//背景颜色
        font: '#666',//文字颜色
        font2: '#666',
        Font2: '#fff',//实际控制人文字
        borderColor: '#D2D9E5',//边框颜色
        icon: '#fff',//按钮颜色
        triangle: '#4064D4',
        lineColor: '#4064D4',//线条颜色
        proportion: '#4064D4',
        iconbg: '#4064D4',//按钮背景色
        controller: '#36C2CF',//实际控制人背景色
    },
    // 医药医疗 /产业宏观 /产业数据 /财政数据
    'drugIndustryData': {
        pPie: ['#DBE67D', '#8CB05F', '#59955B', '#1EA57D', '#12B29E', '#6FD7C2', '#81E3C7', '#14DCC3', '#36C2CF', '#22CEE2', '#70C6FF'],
        iPie: ['#768CFF', '#6A69F2', '#4D71EC', '#4064D4', '#2757FC', '#3B26D9', '#EB6F98', '#EE81A5', '#70C6FF', '#22CEE2', '#36C2CF']
    },
    // 操作配置 /账号设置 /行业动态账户设置 /行业动态设置
    'industry_dynamic': {
        centerColor: ['#36C2CF', '#36C2CF'],
        color: [
            { border: '#4064D4', color: '#4064D4' },
            { border: '#3DBD7D', color: '#3DBD7D' },
            { border: '#5554F0', color: '#5554F0' },
            { border: '#4598FF', color: '#4598FF' },
            { border: '#5AD1B9', color: '#5AD1B9' },
            { border: '#4064D4', color: '#4064D4' },
            { border: '#FF946A', color: '#FF946A' },
        ]
    },
    // 医药医疗 /企业数据 /上游生产 /药厂库
    'pharmaceuticalFactory': {
        color: ["#4064D4", "#6FD7C2", "#70C6FF", "#EE81A5"]
    }

}
