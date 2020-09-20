<!--尽调报告统计概况-->
<template>
    <div class="table-wrap">
        <div class="top-title">
            尽调项目<span>{{allProject}}</span>
        </div>

        <div class=" data-content">

            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">项目类型分布</div>
                <div class="chart-list">
                    <div id="projectType" style="width:200px;height:200px;"></div>
                </div>
            </div>
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">供应物资分布</div>
                <div class="chart-list">
                    <div id="supplyContent" style="width:200px;height:200px;"></div>
                </div>
            </div>
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">建设单位分布</div>
                <div class="chart-list">
                    <div id="ownerBackground" style="width:200px;height:200px;"></div>
                </div>
            </div>
        </div>
        <div class="category">
            <div class="category-item">
                <ul>
                    <li v-if="oneProject.value!== '0%'">
                        <span class="circle oneProject"></span><span class="text">{{oneProject.name}}</span><span class="category-number">{{oneProject.value}}</span>
                    </li>
                    <li v-if="twoProject.value!==''">
                        <span class="circle twoProject"></span><span class="text">{{twoProject.name}}</span><span class="category-number">{{twoProject.value}}</span>
                    </li>
                    <li v-if="threeProject.value!==''">
                        <span class="circle threeProject"></span><span class="text">{{threeProject.name}}</span><span class="category-number">{{threeProject.value}}</span>
                    </li>
                    <li v-if="fourProject.value!==''">
                        <span class="circle fourProject"></span><span class="text">{{fourProject.name}}</span><span class="category-number">{{fourProject.value}}</span>
                    </li>
                    <li v-if="fiveProject.value!==''">
                        <span class="circle fiveProject"></span><span class="text">{{fiveProject.name}}</span><span class="category-number">{{fiveProject.value}}</span>
                    </li>
                    <li v-if="sixProject.value!==''">
                        <span class="circle sixProject"></span><span class="text">{{sixProject.name}}</span><span class="category-number">{{sixProject.value}}</span>
                    </li>
                    <li v-if="sevenProject.value!==''">
                        <span class="circle sevenProject"></span><span class="text">{{sevenProject.name}}</span><span class="category-number">{{sevenProject.value}}</span>
                    </li>
                    <li v-if="eightProject.value!==''">
                        <span class="circle eightProject"></span><span class="text">{{eightProject.name}}</span><span class="category-number">{{eightProject.value}}</span>
                    </li>
                    <li v-if="nineProject.value!==''">
                        <span class="circle nineProject"></span><span class="text">{{nineProject.name}}</span><span class="category-number">{{nineProject.value}}</span>
                    </li>
                    <li v-if="tenProject.value!==''">
                        <span class="circle tenProject"></span><span class="text">{{tenProject.name}}</span><span class="category-number">{{tenProject.value}}</span>
                    </li>
                </ul>
            </div>
            <div class="category-item">
                <ul>
                    <li v-if="oneSupply.value!==''">
                        <span class="circle oneSupply"></span><span class="text">{{oneSupply.name}}</span><span class="category-number">{{oneSupply.value}}</span>
                    </li>
                    <li v-if="twoSupply.value!==''">
                        <span class="circle twoSupply"></span><span class="text">{{twoSupply.name}}</span><span class="category-number">{{twoSupply.value}}</span>
                    </li>
                    <li v-if="threeSupply.value!==''">
                        <span class="circle threeSupply"></span><span class="text">{{threeSupply.name}}</span><span class="category-number">{{threeSupply.value}}</span>
                    </li>
                    <li v-if="fourSupply.value!==''">
                        <span class="circle fourSupply"></span><span class="text">{{fourSupply.name}}</span><span class="category-number">{{fourSupply.value}}</span>
                    </li>
                    <li v-if="fiveSupply.value!==''">
                        <span class="circle fiveSupply"></span><span class="text">{{fiveSupply.name}}</span><span class="category-number">{{fiveSupply.value}}</span>
                    </li>
                    <li v-if="sixSupply.value!==''">
                        <span class="circle sixSupply"></span><span class="text">{{sixSupply.name}}</span><span class="category-number">{{sixSupply.value}}</span>
                    </li>
                    <li v-if="sevenSupply.value!==''">
                        <span class="circle sevenSupply"></span><span class="text">{{sevenSupply.name}}</span><span class="category-number">{{sevenSupply.value}}</span>
                    </li>
                    <li v-if="eightSupply.value!==''">
                        <span class="circle eightSupply"></span><span class="text">{{eightSupply.name}}</span><span class="category-number">{{eightSupply.value}}</span>
                    </li>
                    <li v-if="nineSupply.value!==''">
                        <span class="circle nineSupply"></span><span class="text">{{nineSupply.name}}</span><span class="category-number">{{nineSupply.value}}</span>
                    </li>
                    <li v-if="tenSupply.value!==''">
                        <span class="circle tenSupply"></span><span class="text">{{tenSupply.name}}</span><span class="category-number">{{tenSupply.value}}</span>
                    </li>
                    <li v-if="elevenSupply.value!==''">
                        <span class="circle elevenSupply"></span><span class="text">{{elevenSupply.name}}</span><span class="category-number">{{elevenSupply.value}}</span>
                    </li>
                    <li v-if="twelveSupply.value!==''">
                        <span class="circle twelveSupply"></span><span class="text">{{twelveSupply.name}}</span><span class="category-number">{{twelveSupply.value}}</span>
                    </li>
                    <li v-if="thirteenSupply.value!==''">
                        <span class="circle thirteenSupply"></span><span class="text">{{thirteenSupply.name}}</span><span class="category-number">{{thirteenSupply.value}}</span>
                    </li>
                    <li v-if="fourteenSupply.value!==''">
                        <span class="circle fourteenSupply"></span><span class="text">{{fourteenSupply.name}}</span><span class="category-number">{{fourteenSupply.value}}</span>
                    </li>
                </ul>
            </div>
            <div class="category-item">
                <ul>
                    <li v-if="oneOwner.value!==''">
                        <span class="circle oneOwner"></span><span class="text">{{oneOwner.name}}</span><span class="category-number">{{oneOwner.value}}</span>
                    </li>
                    <li v-if="twoOwner.value!==''">
                        <span class="circle twoOwner"></span><span class="text">{{twoOwner.name}}</span><span class="category-number">{{twoOwner.value}}</span>
                    </li>
                    <li v-if="threeOwner.value!==''">
                        <span class="circle threeOwner"></span><span class="text">{{threeOwner.name}}</span><span class="category-number">{{threeOwner.value}}</span>
                    </li>
                    <li v-if="fourOwner.value!==''">
                        <span class="circle fourOwner"></span><span class="text">{{fourOwner.name}}</span><span class="category-number">{{fourOwner.value}}</span>
                    </li>
                    <li v-if="fiveOwner.value!==''">
                        <span class="circle fiveOwner"></span><span class="text">{{fiveOwner.name}}</span><span class="category-number">{{fiveOwner.value}}</span>
                    </li>
                    <li v-if="sixOwner.value!==''">
                        <span class="circle sixOwner"></span><span class="text">{{sixOwner.name}}</span><span class="category-number">{{sixOwner.value}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import dueLine from "@/views/service/config/dueLine";
import echarts from "echarts";
import { deepClone } from "@/utils/common";
import { mapState } from "vuex";

export default {
    props: {
        businessType: String
    },
    data () {
        return {
            allProject: 0,
            invoiceMonth: {},
            oneProject: {
                value: "",
                name: ""
            },
            twoProject: {
                value: "",
                name: ""
            },
            threeProject: {
                value: "",
                name: ""
            },
            fourProject: {
                value: "",
                name: ""
            },
            fiveProject: {
                value: "",
                name: ""
            },
            sixProject: {
                value: "",
                name: ""
            },
            sevenProject: {
                value: "",
                name: ""
            },
            eightProject: {
                value: "",
                name: ""
            },
            nineProject: {
                value: "",
                name: ""
            },
            tenProject: {
                value: "",
                name: ""
            },
            oneSupply: {
                value: "",
                name: ""
            },
            twoSupply: {
                value: "",
                name: ""
            },
            threeSupply: {
                value: "",
                name: ""
            },
            fourSupply: {
                value: "",
                name: ""
            },
            fiveSupply: {
                value: "",
                name: ""
            },
            sixSupply: {
                value: "",
                name: ""
            },
            sevenSupply: {
                value: "",
                name: ""
            },
            eightSupply: {
                value: "",
                name: ""
            },
            nineSupply: {
                value: "",
                name: ""
            },
            tenSupply: {
                value: "",
                name: ""
            },
            elevenSupply: {
                value: "",
                name: ""
            },
            twelveSupply: {
                value: "",
                name: ""
            },
            thirteenSupply: {
                value: "",
                name: ""
            },
            fourteenSupply: {
                value: "",
                name: ""
            },
            oneOwner: {
                value: "",
                name: ""
            },
            twoOwner: {
                value: "",
                name: ""
            },
            threeOwner: {
                value: "",
                name: ""
            },
            fourOwner: {
                value: "",
                name: ""
            },
            fiveOwner: {
                value: "",
                name: ""
            },
            sixOwner: {
                value: "",
                name: ""
            },
            // sevenOwner: {
            //     value: "",
            //     name: ""
            // },
        };
    },
    computed: mapState({
        companyList: state => state.invoice.companyList,
        flag: state => state.echart.flag
    }),
    watch: {
        flag (e) {
            this.getGeneral();
        }
    },
    mounted () {
        this.getGeneral();
    },
    methods: {
        // 获取概况
        getGeneral () {
            this.ajax.json(
                "/dcp/riskreport/count", {}, { type: 'get' }
            ).then(res => {
                this.allProject = res.data.allProject;
                let data = res.data;
                //累计尽调项目
                // this.allProject = data.allProject;
                let chartData = deepClone(dueLine);
                chartData.xAxis.data = data.projectList.map(i => i.created_time);
                chartData.series[0].data = res.data.projectList.map(
                    i => i.t
                );
                this.invoiceMonth = chartData;
                //项目类型占比
                let colorArr = [];
                let projectArr = [];
                let projectTotal = data.projectType[data.projectType.length - 1].all; //总数
                data.projectType.map((item, index) => {
                    item.t = ((item.t / projectTotal) * 100).toFixed(2);
                    if (item.project_type === "房建") {
                        colorArr[index] = "#12B29E";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[0]
                        this.oneProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "新建项目") {
                        colorArr[index] = "#1EA57D";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[1]
                        this.twoProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "基建") {
                        colorArr[index] = "#2F8769";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[2]
                        this.threeProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "市政") {
                        colorArr[index] = "#598878";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[3]
                        this.fourProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "工业厂房") {
                        colorArr[index] = "#59955B";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[4]
                        this.fiveProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "商业综合体") {
                        colorArr[index] = "#75925B";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[5]
                        this.sixProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "重建项目") {
                        colorArr[index] = "#8CB05F";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[6]
                        this.sevenProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "迁建项目") {
                        colorArr[index] = "#A8B05F";
                        // if(this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[7]
                        this.eightProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "扩建项目") {
                        colorArr[index] = "#A8B05F";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[7]
                        this.nineProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    if (item.project_type === "其他") {
                        colorArr[index] = "#339473";
                        if (this.flag === 'light') colorArr[index] = this.$service.diligence.colorArr[8]
                        this.tenProject = {
                            value: item.t + "%",
                            name: item.project_type
                        };
                    }
                    projectArr.push({
                        value: item.t,
                        name: item.project_type
                    })
                })
                projectArr = [...projectArr];
                const myChart = echarts.init(
                    document.getElementById("projectType")
                );
                var value = "";
                var name = "";
                let _this = this;
                var option = {
                    tooltip: {
                        show: true,
                        alwaysShowContent: true,
                        backgroundColor: "none",
                        position: ["13%", "35%"], // tooltip文字 定位位置
                        formatter: function (params) {
                            // 这个可以自己写dom样式
                            if (_this.flag === 'light') {
                                if (params.seriesIndex === 0) {
                                    value = params.value;
                                    name = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                                }
                            } else {
                                if (params.seriesIndex === 0) {
                                    value = params.value;
                                    name = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                                }
                            }

                        }
                    },
                    series: [
                        {
                            // 外圆
                            hoverOffset: 3,
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["80", "90"],
                            color: colorArr,
                            startAngle: 135,
                            labelLine: {
                                normal: {
                                    length: 25
                                }
                            },
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: projectArr
                        },
                        {
                            //  内圆
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["70", "71"],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: "",
                                    itemStyle: {
                                        normal: {
                                            color: "rgb(41, 49, 52)"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
                if (this.flag === 'light') {
                    option.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                }
                myChart.setOption(option);
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                //设置默认选中高亮部分
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart.on("mouseover", function (e) {
                    //当检测到鼠标悬停事件，取消默认选中高亮
                    if (index) {
                        myChart.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: index
                        });
                    } else {
                        myChart.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }

                    //高亮显示悬停的那块
                    myChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                });
                var index = "";
                //检测鼠标移出后显示之前默认高亮的那块
                myChart.on("mouseout", function (e) {
                    // console.log('e',e);
                    myChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                    index = e.dataIndex;
                });
                //供应材料占比
                let colorSupplyArr = [];
                let supplyArr = [];
                let supplyTotal = data.supplyContent[data.supplyContent.length - 1].all; //总数
                data.supplyContent.map((item, index) => {
                    item.t = ((item.t / supplyTotal) * 100).toFixed(2);
                    if (item.supply_content === "钢筋") {
                        colorSupplyArr[index] = "#BFA559";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[0]
                        this.oneSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "木枋") {
                        colorSupplyArr[index] = "#4688B9";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[1]
                        this.twoSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "木模板") {
                        colorSupplyArr[index] = "#4685D1";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[2]
                        this.threeSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "型材") {
                        colorSupplyArr[index] = "#337B8B";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[3]
                        this.fourSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "钢绞线") {
                        colorSupplyArr[index] = "#14DCA6";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[4]
                        this.fiveSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "其他") {
                        colorSupplyArr[index] = "#358E80";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[5]
                        this.sixSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "砂石") {
                        colorSupplyArr[index] = "#4AAC8F";
                        // if(this.flag === 'light') colorSupplyArr[index] = 'pink'
                        this.sevenSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "劳务") {
                        colorSupplyArr[index] = "#4D71EC";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[6]
                        this.eightSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "土方") {
                        colorSupplyArr[index] = "#64A483";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[7]
                        this.nineSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "混凝土") {
                        colorSupplyArr[index] = "#9BBC6C";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[8]
                        this.tenSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "水泥") {
                        colorSupplyArr[index] = "#74B683";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[9]
                        this.elevenSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "砖") {
                        colorSupplyArr[index] = "#1E77A5";
                        // if(this.flag === 'light') colorSupplyArr[index] = 'pink'
                        this.twelveSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "幕墙") {
                        colorSupplyArr[index] = "#724DEC";
                        // if(this.flag === 'light') colorSupplyArr[index] = 'pink'
                        this.thirteenSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    if (item.supply_content === "铝合板") {
                        colorSupplyArr[index] = "#DB5A41";
                        if (this.flag === 'light') colorSupplyArr[index] = this.$service.diligence.colorSupplyArr[10]
                        this.fourteenSupply = {
                            value: item.t + "%",
                            name: item.supply_content
                        };
                    }
                    supplyArr.push({
                        value: item.t,
                        name: item.supply_content
                    })
                })
                supplyArr = [...supplyArr];
                const myChart1 = echarts.init(
                    document.getElementById("supplyContent")
                );
                // eslint-disable-next-line no-unused-vars
                var value1 = "";
                // eslint-disable-next-line no-unused-vars
                var name1 = "";
                var option1 = {
                    tooltip: {
                        show: true,
                        alwaysShowContent: true,
                        backgroundColor: "none",
                        position: ["13%", "35%"], // tooltip文字 定位位置
                        formatter: function (params) {
                            // 这个可以自己写dom样式
                            if (_this.flag === 'light') {
                                if (params.seriesIndex === 0) {
                                    value1 = params.value;
                                    name1 = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value1}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name1}</div>`;
                                }
                            } else {
                                if (params.seriesIndex === 0) {
                                    value1 = params.value;
                                    name1 = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value1}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name1}</div>`;
                                }
                            }

                        }
                    },
                    series: [
                        {
                            // 外圆
                            hoverOffset: 3,
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["80", "90"],
                            color: colorSupplyArr,
                            startAngle: 135,
                            labelLine: {
                                normal: {
                                    length: 25
                                }
                            },
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: supplyArr
                        },
                        {
                            //  内圆
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["70", "71"],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: "",
                                    itemStyle: {
                                        normal: {
                                            color: "rgb(41, 49, 52)"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
                if (this.flag === 'light') {
                    option1.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                }
                myChart1.setOption(option1);
                myChart1.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                //设置默认选中高亮部分
                myChart1.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart1.on("mouseover", function (e) {
                    //当检测到鼠标悬停事件，取消默认选中高亮
                    if (index1) {
                        myChart1.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: index1
                        });
                    } else {
                        myChart1.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }

                    //高亮显示悬停的那块
                    myChart1.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                });
                var index1 = "";
                //检测鼠标移出后显示之前默认高亮的那块
                myChart1.on("mouseout", function (e) {
                    // console.log('e',e);
                    myChart1.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                    index1 = e.dataIndex;
                });
                //业主背景占比
                let colorOwnerArr = [];
                let ownerArr = [];
                let OwneTotal = data.ownerBackground[data.ownerBackground.length - 1].all; //总数
                data.ownerBackground.map((item, index) => {
                    item.t = ((item.t / OwneTotal) * 100).toFixed(2);
                    if (item.owner_background === "地方国企") {
                        colorOwnerArr[index] = "#4161BE";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[0]
                        this.oneOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    if (item.owner_background === "中央企业") {
                        colorOwnerArr[index] = "#61B3F9";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[1]
                        this.twoOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    if (item.owner_background === "白名单地产公司") {
                        colorOwnerArr[index] = "#779CDC";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[2]
                        this.threeOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    if (item.owner_background === "其他") {
                        colorOwnerArr[index] = "#777ADC";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[3]
                        this.fourOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    if (item.owner_background === "事业单位") {
                        colorOwnerArr[index] = "#766DBF";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[4]
                        this.fiveOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    if (item.owner_background === "民营企业500强") {
                        colorOwnerArr[index] = "#5C41BE";
                        if (this.flag === 'light') colorOwnerArr[index] = this.$service.diligence.ownerBackground[5]
                        this.sixOwner = {
                            value: item.t + "%",
                            name: item.owner_background
                        };
                    }
                    // if (item.owner_background === "砂石") {
                    //     colorOwnerArr[index] = "#4144BE";
                    //     this.sevenOwner = {
                    //         value: item.t + "%",
                    //         name: item.owner_background
                    //     };
                    // }
                    ownerArr.push({
                        value: item.t,
                        name: item.owner_background
                    })
                })
                ownerArr = [...ownerArr];
                const myChart2 = echarts.init(
                    document.getElementById("ownerBackground")
                );
                // eslint-disable-next-line no-unused-vars
                var value2 = "";
                // eslint-disable-next-line no-unused-vars
                var name2 = "";
                var option2 = {
                    tooltip: {
                        show: true,
                        alwaysShowContent: true,
                        backgroundColor: "none",
                        position: ["13%", "35%"], // tooltip文字 定位位置
                        formatter: function (params) {
                            // 这个可以自己写dom样式
                            if (_this.flag === "light") {
                                if (params.seriesIndex === 0) {
                                    value2 = params.value;
                                    name2 = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value2}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name2}</div>`;
                                }
                            } else {
                                if (params.seriesIndex === 0) {
                                    value2 = params.value;
                                    name2 = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value2}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name2}</div>`;
                                }
                            }

                        }
                    },
                    series: [
                        {
                            // 外圆
                            hoverOffset: 3,
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["80", "90"],
                            color: colorOwnerArr,
                            startAngle: 135,
                            labelLine: {
                                normal: {
                                    length: 25
                                }
                            },
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: ownerArr
                        },
                        {
                            //  内圆
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["70", "71"],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: "",
                                    itemStyle: {
                                        normal: {
                                            color: "rgb(41, 49, 52)"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
                if (this.flag === 'light') {
                    option2.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                }
                myChart2.setOption(option2);
                myChart2.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                //设置默认选中高亮部分
                myChart2.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart2.on("mouseover", function (e) {
                    //当检测到鼠标悬停事件，取消默认选中高亮
                    if (index2) {
                        myChart2.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: index2
                        });
                    } else {
                        myChart2.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }

                    //高亮显示悬停的那块
                    myChart2.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                });
                var index2 = "";
                //检测鼠标移出后显示之前默认高亮的那块
                myChart2.on("mouseout", function (e) {
                    // console.log('e',e);
                    myChart2.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                    index2 = e.dataIndex;
                });
            });
        },
    }
};
</script>
<style lang="scss" scoped>
.light {
    .pe {
        position: relative;
    }
    .echart-unit {
        position: absolute;
        right: 40px;
        top: 20px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        line-height: 14px;
    }
    el-form .el-big-wrap {
        width: 1360px;
        margin: 0 auto;
        margin-left: -30px;
    }
    .stat {
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &-left,
        &-right {
            display: flex;
            width: 650px;
            height: 140px;
            background-image: linear-gradient(-90deg, rgba(50, 55, 61, 0.31) 0%, rgba(39, 50, 53, 0.84) 59%, #233132 100%);
            align-self: center;
        }
        &-left {
            .echart-big-wrap {
                padding: 10px 0;
                margin-left: 15px;
                box-sizing: border;
            }
        }
        &-number-logo,
        &-amount-logo {
            width: 76px;
            height: 76px;
            margin-top: 35px;
            margin-left: 40px;
        }
        &-number-logo {
            background: url('../../assets/images/policy/bz.png') no-repeat;
        }
        &-amount-logo {
            background: url('../../assets/images/stat/amount.png') no-repeat;
        }
        &-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin-left: 40px;
            text-align: left;
        }
        &-number {
            font-size: 30px;
            color: #ffffff;
            letter-spacing: 0.88px;
            line-height: 26px;
        }
        &-text {
            margin-top: 16px;
            font-size: 16px;
            color: #51b5bf;
            letter-spacing: 1.53px;
        }
    }
    .top-title {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        color: #333;
        font-family: 'PingFang-SC-Regular';
        font-size: 18px;
        letter-spacing: 2px;
        span {
            color: #4064d4;
            margin-left: 5px;
        }
    }
    .table-wrap {
        padding-bottom: 0;
    }
    .data-content {
        display: flex;
        justify-content: space-between;
        /deep/ .invoice-echart-wrap {
            flex: 1;
            &:last-child {
                .invoice-echart-title {
                    left: 50px;
                }
            }
            .pie-title {
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #333;
                margin: -10px 0 0 126px;
                letter-spacing: 1.5px;
                text-align: center;
            }
            .chart-list {
                margin-top: 30px;
                font-family: PingFangSC-Light;
                display: flex;
                justify-content: center;
            }
        }
    }
    .category {
        display: flex;
        &-item {
            flex: 1;
            margin: 20px 0;
            border-right: 1px solid #dcdfe6;
            ul {
                height: auto;
                display: flex;
                // justify-content: center;
                flex-wrap: wrap;
                list-style: none;
                li {
                    width: 50%;
                    margin-bottom: 15px;
                    font-size: 12px;
                    color: #13aabb;
                    letter-spacing: 0;
                    .category-number {
                        display: inline-block;
                        font-size: 12px;
                        color: #909399;
                        letter-spacing: 0;
                        margin-left: 20px;
                    }
                    .circle {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        margin: 0 10px;
                    }
                    .text {
                        color: #43a1ac;
                        display: inline-block;
                        width: 35%;
                    }
                    .oneProject {
                        background: #12b29e;
                    }
                    .twoProject {
                        background: #1ea57d;
                    }
                    .threeProject {
                        background: #2f8769;
                    }
                    .fourProject {
                        background: #598878;
                    }
                    .fiveProject {
                        background: #59955b;
                    }
                    .sixProject {
                        background: #75925b;
                    }
                    .sevenProject {
                        background: #8cb05f;
                    }
                    .eightProject {
                        background: #a8b05f;
                    }
                    .nineProject {
                        background: #a8b05f;
                    }
                    .tenProject {
                        background: #339473;
                    }
                    .oneSupply {
                        background: #bfa559;
                    }
                    .twoSupply {
                        background: #4688b9;
                    }
                    .threeSupply {
                        background: #4685d1;
                    }
                    .fourSupply {
                        background: #337b8b;
                    }
                    .fiveSupply {
                        background: #14dca6;
                    }
                    .sixSupply {
                        background: #358e80;
                    }
                    .sevenSupply {
                        background: #4aac8f;
                    }
                    .eightSupply {
                        background: #4d71ec;
                    }
                    .nineSupply {
                        background: #64a483;
                    }
                    .tenSupply {
                        background: #9bbc6c;
                    }
                    .elevenSupply {
                        background: #74b683;
                    }
                    .twelveSupply {
                        background: #1e77a5;
                    }
                    .thirteenSupply {
                        background: #724dec;
                    }
                    .fourteenSupply {
                        background: #db5a41;
                    }
                    .oneOwner {
                        background: #4161be;
                    }
                    .twoOwner {
                        background: #61b3f9;
                    }
                    .threeOwner {
                        background: #779cdc;
                    }
                    .fourOwner {
                        background: #777adc;
                    }
                    .fiveOwner {
                        background: #766dbf;
                    }
                    .sixOwner {
                        background: #5c41be;
                    }
                    .sevenOwner {
                        background: #4144be;
                    }
                }
            }
        }
        &-item:last-child {
            border-right: none;
            ul {
                li {
                    .text {
                        width: 45%;
                    }
                }
            }
        }
    }
}
.dark {
    .pe {
        position: relative;
    }
    .echart-unit {
        position: absolute;
        right: 40px;
        top: 20px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        line-height: 14px;
    }
    el-form .el-big-wrap {
        width: 1360px;
        margin: 0 auto;
        margin-left: -30px;
    }
    .stat {
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &-left,
        &-right {
            display: flex;
            width: 650px;
            height: 140px;
            background-image: linear-gradient(-90deg, rgba(50, 55, 61, 0.31) 0%, rgba(39, 50, 53, 0.84) 59%, #233132 100%);
            align-self: center;
        }
        &-left {
            .echart-big-wrap {
                padding: 10px 0;
                margin-left: 15px;
                box-sizing: border;
            }
        }
        &-number-logo,
        &-amount-logo {
            width: 76px;
            height: 76px;
            margin-top: 35px;
            margin-left: 40px;
        }
        &-number-logo {
            background: url('../../assets/images/policy/bz.png') no-repeat;
        }
        &-amount-logo {
            background: url('../../assets/images/stat/amount.png') no-repeat;
        }
        &-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin-left: 40px;
            text-align: left;
        }
        &-number {
            font-size: 30px;
            color: #ffffff;
            letter-spacing: 0.88px;
            line-height: 26px;
        }
        &-text {
            margin-top: 16px;
            font-size: 16px;
            color: #51b5bf;
            letter-spacing: 1.53px;
        }
    }
    .top-title {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        color: #fff;
        font-family: PingFangSC-Light;
        font-size: 18px;
        letter-spacing: 2px;
        span {
            color: #43a1ac;
            margin-left: 5px;
        }
    }
    .table-wrap {
        padding-bottom: 0;
    }
    .data-content {
        display: flex;
        justify-content: space-between;
        /deep/ .invoice-echart-wrap {
            flex: 1;
            &:last-child {
                .invoice-echart-title {
                    left: 50px;
                }
            }
            .pie-title {
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #ffffff;
                margin: -10px 0 0 126px;
                letter-spacing: 1.5px;
                text-align: center;
            }
            .chart-list {
                margin-top: 30px;
                font-family: PingFangSC-Light;
                display: flex;
                justify-content: center;
            }
        }
    }
    .category {
        display: flex;
        &-item {
            flex: 1;
            margin: 20px 0;
            border-right: 1px solid #4f5155;
            ul {
                height: auto;
                display: flex;
                // justify-content: center;
                flex-wrap: wrap;
                list-style: none;
                li {
                    width: 50%;
                    margin-bottom: 15px;
                    font-size: 12px;
                    color: #13aabb;
                    letter-spacing: 0;
                    .category-number {
                        display: inline-block;
                        font-size: 12px;
                        color: #909399;
                        letter-spacing: 0;
                        margin-left: 20px;
                    }
                    .circle {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        margin: 0 10px;
                    }
                    .text {
                        color: #43a1ac;
                        display: inline-block;
                        width: 35%;
                    }
                    .oneProject {
                        background: #12b29e;
                    }
                    .twoProject {
                        background: #1ea57d;
                    }
                    .threeProject {
                        background: #2f8769;
                    }
                    .fourProject {
                        background: #598878;
                    }
                    .fiveProject {
                        background: #59955b;
                    }
                    .sixProject {
                        background: #75925b;
                    }
                    .sevenProject {
                        background: #8cb05f;
                    }
                    .eightProject {
                        background: #a8b05f;
                    }
                    .nineProject {
                        background: #a8b05f;
                    }
                    .tenProject {
                        background: #339473;
                    }
                    .oneSupply {
                        background: #bfa559;
                    }
                    .twoSupply {
                        background: #4688b9;
                    }
                    .threeSupply {
                        background: #4685d1;
                    }
                    .fourSupply {
                        background: #337b8b;
                    }
                    .fiveSupply {
                        background: #14dca6;
                    }
                    .sixSupply {
                        background: #358e80;
                    }
                    .sevenSupply {
                        background: #4aac8f;
                    }
                    .eightSupply {
                        background: #4d71ec;
                    }
                    .nineSupply {
                        background: #64a483;
                    }
                    .tenSupply {
                        background: #9bbc6c;
                    }
                    .elevenSupply {
                        background: #74b683;
                    }
                    .twelveSupply {
                        background: #1e77a5;
                    }
                    .thirteenSupply {
                        background: #724dec;
                    }
                    .fourteenSupply {
                        background: #db5a41;
                    }
                    .oneOwner {
                        background: #4161be;
                    }
                    .twoOwner {
                        background: #61b3f9;
                    }
                    .threeOwner {
                        background: #779cdc;
                    }
                    .fourOwner {
                        background: #777adc;
                    }
                    .fiveOwner {
                        background: #766dbf;
                    }
                    .sixOwner {
                        background: #5c41be;
                    }
                    .sevenOwner {
                        background: #4144be;
                    }
                }
            }
        }
        &-item:last-child {
            border-right: none;
            ul {
                li {
                    .text {
                        width: 45%;
                    }
                }
            }
        }
    }
}
</style>
