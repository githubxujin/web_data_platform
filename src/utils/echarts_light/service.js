
let imgDom = document.createElement('img')
let imgDom1 = document.createElement('img')
imgDom.src = require('@/assets/images/light/bar-bg1.png')
imgDom1.src = require('@/assets/images/light/bar-bg.png')
let imgDomD = document.createElement('img')
let imgDom1D = document.createElement('img')
imgDomD.src = require('@/assets/images/bar-bg1.png')
imgDom1D.src = require('@/assets/images/bar-bg.png')

import echarts from "echarts"

export default {
    // 公共服务 /贷前数据 /尽调数据 /尽调报告
    'diligence': {
        // 房建 新建项目 基建 市政 工业厂房 商业综合体 重建项目 扩建项目 其他
        'colorArr': ['#12B29E', '#1EA57D', '#5ED262', '#67A030', '#59955B', '#90C191', '#B1DC7C', '#DBE67D', '#E5D755'],
        // 钢筋,木枋,木模板,型材,钢绞线,其他,劳务,土方,混凝土,水泥,铝合板
        'colorSupplyArr': ['#C1EBFF', '#7DD1FA', '#6AB3FF', '#3C9CFF', '#177EFF', '#004FFF', '#3558A7', '#1F97CD', '#007DC9', '#0070C9', '#003FA2'],
        //                 地方国企,  中央企业,  白名单地产公司,其他,  事业单位,  民营企业500强
        'ownerBackground': ['#A2C4FE', '#4064D4', '#777ADC', '#4047D4', '#779CDC', '#5C41BE']
    },

    // 公共服务 /贷后数据处理 /中登应用
    'zhongdeng': {
        title: ['#333', '#4064D4'],
        accumulative: ['#4064D4', '#FBB148', '#57A5FF'],
        areaStyle: [
            ['rgba(64,100,212,.5)', 'rgba(64,100,212,0)'],
            ['rgba(251,177,72,.5)', 'rgba(251,177,72,0)'],
            ['rgba(87,165,255,.5)', 'rgba(87,165,255,0)'],
        ],
        // 饼图           安全,        异常,  特别关注,疑似高度匹配,高度匹配
        drawProjectPie: ['#81E3C7', '#768CFF', '#EB6F98', '#22CEE2', '#5554F0'],
        //合作金融机构饼图
        supplierPie:['#5554F0', '#768CFF', '#22CEE2', '#EB6F98']
    },

    // 公共服务 /贷后数据处理 /发票数据 /销项发票
    'output': {
        // 概况
        'stat': {
            itemStyleColor: '#4064D4',
            areaStyle: ['rgba(64,100,212,0)', 'rgba(64,100,212,.2)']
        },
        // 开票内容
        'InvoiceContent': {
            itemStyle0: ['#38C3CF', '#81E3C7'],
            itemStyle1: ['#5577FF', '#8598FF']
        },
        // 付款方
        'pay': {
            pieOption1: {
                'itemStyle_color': 'rgba(63,196,209,.4)',
                'label': '#3FC4D1',
                'backgroundStyle': '#E0F6F9',
                'series1_colorStops0': '#36C2CF',
                'series1_colorStops1': '#81E3C7'
            },
            pieOption2: {
                'itemStyle_color': 'rgba(118,140,225,.4)',
                'label': '#4165d4',
                'backgroundStyle': '#ebeffa',
                'series1_colorStops0': '#768CFF',
                'series1_colorStops1': '#A581D6'
            },
            setMapOption: {
                inRange: ['#CCDDF9', '#4064D4'],
                areaColor: ['#c9daf8', '#5e98fd'],
                borderColor: '#fff',
                mapOpt: ['#5577FF', '#38C3CF']
            },
            pipe: {
                'itemStyle_color': 'rgba(255,255,225,.4)',
                'label': '#fff',
                'backgroundStyle': 'rgba(255,255,225,.1)',
                'series1_colorStops0': '#fff',
                'series1_colorStops1': '#fff'
            },
            getColor: ["#5554F0", "#EB6F98", "#36C2CF", "#FBB148"]
        },
        // 开票行为
        'behavior': {
            // 开票数分布/趋势
            count: {
                series0_color: '#00AEDA',
                series2_color: '#36C2CF',
                series1_emphasis: ['#64D3D8', '#00AEDA'],
                series1_push: ['#64D3D8', '#07c5f9']

            },
            // 开票金额分布/趋势
            money: {
                series0_color: '#FF801E',
                series2_color: '#fd8e39',
                series1_emphasis: ['#FFCB60', '#f89127'],
                series1_push: ['#FFCB60', '#FBA348']
            },
            // 发票作废分布/比例
            cancel: {
                series0_color: '#39C27A',
                series2_color: '#5fd597',
                series1_emphasis: ['#A2F6DE', '#41b16d'],
                series1_push: ['#A2F6DE', '#5BD98C']
            },
            // 发票冲红分布/比例
            red: {
                series0_color: '#4064D4',
                series2_color: '#5c7ee7',
                series1_emphasis: ['#8088FF', '#2e60f8'],
                series1_push: ['#8088FF', '#4E79FC']
            },
            // 滚动条样式
            dataZoom:['#F1F4FC','#C6D0E4',]
            // dataZoom: ['#F1F4FC', '#7596FF']
        },
        // 关联应用
        'application': {
            // 2.行业趋势
            industryTrends: {
                colorList: ['#FF794D', '#FF946A', '#FBB148', '#FFC470', '#768CFF', '#6A69F2', '#4D71EC', '#4064D4', '#2757FC', '#3B26D9', '#EB6F98', '#EE81A5', '#70C6FF', '#22CEE2', '#36C2CF']
            },
            // 3.开票热力图
            hotInvoice: {
                axisPointer: ['#4064D4', '#fff'],
                visualMap: ["#C1EEE5", '#63B1BA', "#4EB183", "#16937A"],
                transparent: 'transparent'
            },
            // 4.下游热力图
            hotDownstream: {
                axisPointer: ['#4064D4', '#fff'],
                visualMap: ["#CBD5F3", '#B2B5EA', "#7177D8", "#4064D4"],
                transparent: 'transparent'
            },
            // 5.核心企业分析
            scatterDownStream: {
                axisPointer: '#4064D4',
                visualMap: ["#E8634B", "#FFED68", "#00B97A"]
            },
            // 6.收支预警
            incomeWarning: {
                series0_itemStyle: ['#7EDEE9', '#1DB5C3'],
                series1_color: ['rgba(54,194,207,0.20)', 'rgba(54,194,207,0.50)'],
                series1_borderColor: '#36C2CF'
            },
            // 7.作废预警
            cancellationWarning: {
                series0_itemStyle: ['#FF9420', '#FF9D33'],
                series1_color: ['rgba(251,199,72,0.20)', 'rgba(251,199,72,0.50)'],
                series1_borderColor: '#FCAE30'
            },
            // 8.冲红预警
            redWarning: {
                series0_itemStyle: ['#5AD1B9', '#05C8A0'],
                series1_color: ['rgba(90,209,185,0.20)', 'rgba(90,209,185,0.50)'],
                series1_borderColor: '#5AD1B9'
            },
            // 9.专票分析
            specialTicket: {
                series0_itemStyle: ['#4064D4', '#4064D4'],
                series1_color: ['rgba(64,100,212,0.20)', 'rgba(64,100,212,0.50)'],
                series1_borderColor: '#4084D5'
            },
            // 10.新增下游
            addDownstream: {
                series0_itemStyle: ['#FF8136', '#EC5D1E'],
                series1_color: ['rgba(251,163,73,0.20)', 'rgba(251,163,73,0.50)'],
                series1_borderColor: '#FF801E'
            },
            // 12.发票内容
            invoiceContent: {
                series0_itemStyle: ['#435FB1', '#3E5CC5'],
                series1_color: ['rgba(85,84,240,0.10)', ' rgba(85,84,240,0.50)'],
                series1_borderColor: '#5554F0'
            },
            // 13.月度变化
            monthChange: {
                axisPointer: '#4064D4'
            },
            // 14.开票趋势
            invoiceTrends: {
                colorList: ['#EB6F98', '#EE81A5', '#70C6FF', '#22CEE2', '#36C2CF', '#14DCC3', '#81E3C7', '#6FD7C2', '#12B29E', '#1EA57D', '#59955B', '#8CB05F', '#DBE67D', '#FF794D', '#FF946A', '#FBB148']
            },
            // 15.回款预测
            predict: {

            }
        },
    },

    // 公共服务 /反欺诈数据 /舆情监控 /舆情库
    'riskControl': {
        // 监测分析
        analyseOpinion: { imgDom, imgDom1 },
        analyseOpinion_dark: { imgDomD, imgDom1D },
        areaStyle: 'rgba(90,209,185,0.30)',
        itemStyle: '#36C2CF',
        // 相关性分析
        tooltip: ['#5554F0', '#666'],
        series: ['#4064D4 ', '#36C2CF', '#EE81A5']
    },

    // 公共服务 /贷后数据 /资金流水数据库 /资金流水数据库
    'moneyWater': {
        // 监控企业账户数
        pPie: ["#6DFFE7", "#8fd8f9", "#bef69e"],
        fff: '#fff',
        // 企业流水分析
        lineData: ['#36C2CF', '#4064D4'],
        // 
        series0: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [{
                offset: 0,
                color: '#5577FF'
            },

            {
                offset: 1,
                color: '#8598FF'
            }
            ]
        ),
        series1: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [{
                offset: 0,
                color: '#38C3CF'
            },

            {
                offset: 1,
                color: '#81E3C7'
            }
            ]
        ),
    }
}
