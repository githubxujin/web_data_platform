import echarts from "echarts";
export default {
    //基建工程 /产业宏观 /监管机构 /住建部
    'industrial_policy': {
        leftPie: ['#36C2CF', '#768CFF', '#81E3C7'],
        rightPie: ['#36C2CF', '#3B26D9', '#70C6FF', '#2757FC', '#4D71EC', '#14DCC3'],
    },
    //基建工程 /产业交易 /价格数据 /钢材价格
    steel_price: {
        color: ['#36C2CF', '#4084D5', '#FBB148', '#EB6F98', '#2757FC', '#14DCC3'],
        mxcolor: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [{
                offset: 0,
                color: "#eefaf8"
            },
            // {
            //     offset: 0.5,
            //     color: "rgba(103,148,172,0.15)"
            // },
            {
                offset: 1,
                color: "#eefaf8"
            }
            ]
        ),
        lineColor: '#36c2cf',
        linear: ['#EC6249', '#5CB87A'
        ]
    },
    //基建工程 /交易数据 /项目数据 /项目库
    projectTabs: {
        leftPie: {
            color: ['#768CFF', '#36C2CF'],
            normal: '#D2D9E5',
        },
        rightPie: {
            color: [{
                name: '基建',
                color: '#36C2CF'
            }, {
                name: '房建',
                color: '#70C6FF'
            }, {
                name: '市政工程',
                color: '#4D71EC'
            }, {
                name: '工业厂房',
                color: '#3B26D9'
            }, {
                name: '商业综合体',
                color: '#2757FC'
            }, {
                name: '其他',
                color: '#14DCC3'
            },]
        }
    },
    //基建工程 /交易数据 /招投标数据 /中国建筑中标数据
    'biddingDate': {
        topLine: {
            areaStyle: ['#edfaf7', '#edfaf7'],
            normal: '#36C2CF',
            emphasis: '#7395FF',
            borderColor: '#7395FF',
            colorStops: [
                {
                    offset: 0,
                    color: "#7395FF"
                },
                {
                    offset: 1,
                    color: "#7395FF"
                }
            ],
            lineStyle: '#D2D9E5'
        },
        leftPie: {
            alreadyColor: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                    {
                        offset: 1,
                        color: "#81E3C7" // 0% 处的颜色
                    },
                    {
                        offset: 0.5,
                        color: "#36C2CF" // 100% 处的颜色
                    },
                    {
                        offset: 0,
                        color: "#36C2CF" // 100% 处的颜色
                    }
                ],
                false
            ),
            overColor: '#E0F6F9',
            normal: '#D2D9E5',
        },
        rightPie: {
            color: [{
                name: '其它',
                color: '#81e3c7'
            }, {
                name: '其它钢材',
                color: '#12b29e'
            }, {
                name: '劳务',
                color: '#eb6f98'
            }, {
                name: '型钢',
                color: '#5554F0'
            }, {
                name: '木枋',
                color: '#768CFF'
            }, {
                name: '模板',
                color: '#FBB148'
            }, {
                name: '水泥',
                color: '#22CEE2'
            }, {
                name: '混凝土',
                color: '#EB6F98'
            }, {
                name: '钢筋',
                color: '#4064d4'
            }, {
                name: '钢结构',
                color: '#FF946A'
            }]
        }
    }
}