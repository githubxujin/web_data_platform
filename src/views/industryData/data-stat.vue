<template>
    <div>
        <div class="stat-wrap">
            <div class="stat-left">
                <div class="stat-left-img"></div>
                <div class="stat-left-content">
                    <div class="stat-left-number">
                        {{ params.allProject | numFormat}}
                    </div>
                    <div class="stat-left-text">
                        累计收录项目
                    </div>
                </div>
            </div>
            <div class="stat-right">
                <div v-for="(v,i) in topThree" :key="i">
                    <span>{{v.count | numFormat}}</span>
                    <p>{{v.province}}</p>
                    <img :src="v.img">
                </div>
            </div>
        </div>
        <div class="el-20"></div>
        <div class="project-title">
            <p>合作项目分布</p>
            <p>项目类型分布</p>
        </div>
        <div class="data-content">
            <div class="detail-left">
                <div class="chart-list">
                    <div id="cooperation" style="width:200px;height:200px;"></div>
                    <ul>
                        <li>
                            已合作项目占比
                            <span>{{ (this.params.cooperationProject / this.params.allProject * 100).toFixed(2)}} %</span>
                        </li>
                        <li>
                            未合作项目占比
                            <span>{{((this.params.allProject - this.params.cooperationProject) / this.params.allProject * 100).toFixed(2)}} %</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-right">
                <div class="chart-list">
                    <div id="material" style="width:200px;height:200px;"></div>
                    <div class="tab-over">
                        <table class="tab-con" cellspacing="0">
                            <tr v-for="(item,inx) in dataArr" :key="inx">
                                <td colspan="2">
                                    <div>
                                        <i :style="{background:item.color}"></i>
                                        {{item.name}}
                                        <span>{{item.value}}</span>
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data () {
        return {
            projectTabs: {
                leftPie: {
                    color: ['#47DCC3', '#1EA57D'],
                    normal: '#303f43',
                },
                rightPie: {
                    color: [{
                        name: '基建',
                        color: '#1E77A5'
                    }, {
                        name: '房建',
                        color: '#358E80'
                    }, {
                        name: '市政工程',
                        color: '#A23A40'
                    }, {
                        name: '工业厂房',
                        color: '#CC7451'
                    }, {
                        name: '商业综合体',
                        color: '#14DCA6'
                    }, {
                        name: '其他',
                        color: '#4AAC8F'
                    },]
                }
            },
            params: {
                allProject: 0,
                cooperationProject: 0,
                projectTypeProportion: [],
                top5: []
            },
            topThree: [],
            noCooperation: 0,
            processed: 0,
            dataArr: [],

        };
    },
    watch: {
        flag (e) {
            this.getData();
        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag;
            },
        }
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {
            this.$http('/dcp/select/project/count', {}, { type: 'get' }).then(res => {
                this.params = res.data
                if (this.params.top5 && this.params.top5.length > 0) {
                    this.topThree = this.params.top5.slice(0, 3)
                    let directory = ""
                    directory = this.flag === "dark" ? '' : "light/"


                    this.topThree.forEach(v => {
                        if (v.province === '北京市') {
                            v.img = require(`../../assets/images/${directory}beijing.png`)
                        } else if (v.province === '广东省') {
                            v.img = require(`../../assets/images/${directory}guangdong.png`)
                        } else if (v.province === '湖北省') {
                            v.img = require(`../../assets/images/${directory}hubei.png`)
                        } else if (v.province === '福建省') {
                            v.img = require(`../../assets/images/${directory}fujian.png`)
                        } else if (v.province === '辽宁省') {
                            v.img = require(`../../assets/images/${directory}liaoning.png`)
                        } else if (v.province === '四川省') {
                            v.img = require(`../../assets/images/${directory}sichuan.png`)
                        }
                    })
                }
                if (this.flag === 'dark') {
                    this.getCooperation(this.params.cooperationProject, this.projectTabs);
                    this.getProjectType(this.params.projectTypeProportion, this.projectTabs);
                } else {
                    this.getCooperation(this.params.cooperationProject, this.$infrastructure.projectTabs);
                    this.getProjectType(this.params.projectTypeProportion, this.$infrastructure.projectTabs);
                }
            })
        },
        getCooperation (cooperationProject, color) {
            const myChart = echarts.init(
                document.getElementById("cooperation")
            );
            let name, value;
            var option = {
                tooltip: {
                    show: true,
                    alwaysShowContent: true,
                    backgroundColor: "none",
                    position: ["13%", "35%"], // tooltip文字 定位位置
                    formatter: function (params) {
                        // 这个可以自己写dom样式

                        if (this.flag === 'dark') {
                            if (params.seriesIndex === 0) {
                                value = params.value.toFixed(2);
                                name = params.name;
                                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value.toFixed(2)}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                            } else {
                                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                            }
                        } else {
                            if (params.seriesIndex === 0) {
                                value = params.value.toFixed(2);
                                name = params.name;
                                return `<div style="width:140px;text-align:center;color:#4064D4;font-family:PingFang-SC-Regular;font-size:30px;letter-spacing: 1.01px;">${params.value.toFixed(2)}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.name}</div>`;
                            } else {
                                return `<div style="width:140px;text-align:center;color:#4064D4;font-family:PingFang-SC-Regular;font-size:30px;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                            }
                        }
                    }
                },
                series: [
                    {
                        // 外圆
                        minAngle: 5,
                        hoverOffset: 3,
                        type: "pie",
                        center: ["50%", "50%"],
                        radius: ["80", "90"],
                        color: '#1EA57D',
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
                        data: [
                            {
                                value: cooperationProject / this.params.allProject * 100,
                                // value: 40,
                                name: "已合作项目占比 ",
                                itemStyle: {
                                    color: color.leftPie.color[0]
                                }
                            },
                            {
                                value: (this.params.allProject - cooperationProject) / this.params.allProject * 100,
                                // value: 60,
                                name: "未合作项目占比",
                                itemStyle: {
                                    color: color.leftPie.color[1]
                                }
                            }
                        ]
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
                                        color: color.leftPie.normal
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
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

        },
        getProjectType (data, color) {
            var colorArr = [];
            this.dataArr = [];
            data.forEach((v, i) => {
                let newColor = color.rightPie.color;
                v.value = ((v.count / this.params.allProject) * 100).toFixed(2);
                if (v.projectType != '房屋建筑工程') {
                    newColor.find(x => {
                        if (x.name === v.projectType) {
                            this.dataArr.push({
                                value: v.value + "%",
                                name: v.projectType,
                                color: x.color,
                            })
                            colorArr[i] = x.color
                        }
                    });
                }

            });
            data = [...data]
            const myChart = echarts.init(
                document.getElementById("material")
            );
            var value = "";
            var name = "";
            var option = {
                tooltip: {
                    show: true,
                    alwaysShowContent: true,
                    backgroundColor: "none",
                    position: ["13%", "35%"], // tooltip文字 定位位置
                    formatter: function (params) {
                        // console.log('1111',params);
                        // 这个可以自己写dom样式
                        if (this.flag === 'dark') {
                            if (params.seriesIndex === 0) {
                                value = params.value;
                                name = params.data.projectType;
                                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.data.projectType}</div>`;
                            } else {
                                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                            }
                        } else {
                            if (params.seriesIndex === 0) {
                                value = params.value;
                                name = params.data.projectType;
                                return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.data.projectType}</div>`;
                            } else {
                                return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                            }
                        }
                    }
                },
                series: [
                    {
                        minAngle: 5,
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
                        data: data
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
                                        color: color.leftPie.normal
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
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

        }
    }
};
</script>

<style lang="scss" scoped>
tr {
    float: left;
    width: 50%;
}
.dark {
    .stat {
        font-family: PingFangSC-Light;
        .stat-wrap {
            height: 139px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
        }
        &-left {
            width: 408px;
            background-image: linear-gradient(90deg, #32373d 0%, #233132 100%);
            display: flex;
            &-img {
                margin-top: 31px;
                margin-left: 54px;
                background: url('../../assets/images/policy/bz.png') no-repeat;
                width: 75px;
                height: 75px;
            }
            &-content {
                margin-top: 35px;
                margin-left: 38px;
                display: flex;
                flex-direction: column;
            }
            &-number {
                font-family: PingFangSC-Light;
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
                line-height: 22px;
            }
        }
        .stat-right {
            width: 933px;
            display: flex;
            justify-content: space-between;
            div {
                flex: 1;
                position: relative;
                margin-left: 20px;
                background-color: #263234;
                &:first-child {
                    margin-left: 0;
                }
                p,
                span {
                    font-family: PingFangSC-Light;
                    position: absolute;
                    z-index: 1;
                    right: 20px;
                }
                span {
                    top: 45px;
                    font-size: 20px;
                    color: #ffffff;
                    letter-spacing: 1.17px;
                }
                p {
                    top: 79px;
                    font-size: 14px;
                    color: #449fa8;
                    letter-spacing: 0.82px;
                    margin: 0;
                }
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }
            }
        }
    }
    .project-title {
        display: flex;
        padding-top: 45px;
        p {
            margin: 0;
            width: 450px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 1.5px;
            padding-left: 112px;
            &:last-child {
                padding-left: 88px;
            }
        }
    }
    .data-content {
        display: flex;
        justify-content: flex-start;
        padding: 45px 55px 85px 85px;
        margin-bottom: 35px;
        p {
            margin: 0;
            // font-family: PingFangSC-Regular;
            font-size: 16px;
            letter-spacing: 1.5px;
            color: #ffffff;
            letter-spacing: 1.5px;
            margin-bottom: 50px;
        }
        .detail-left {
            width: 450px;
            // height: 270px;
            border-right: 1px solid #4f5155;
            p {
                padding-left: 45px;
            }
        }
        .detail-right {
            width: 770px;
            // height: 270px;
            padding-left: 70px;
            p {
                padding-left: 45px;
            }
        }
        .chart-list {
            display: flex;
            ul {
                width: 210px;
                margin-top: 70px;
                list-style: none;
                li {
                    height: 18px;
                    line-height: 18px;
                    padding-left: 15px;
                    font-size: 12px;
                    color: #43a1ac;
                    letter-spacing: 0;
                    font-family: PingFangSC-Light;
                    position: relative;
                    &::before {
                        content: '';
                        width: 6px;
                        height: 6px;
                        background: #14dcc3;
                        border-radius: 50%;
                        position: absolute;
                        top: 6px;
                        left: 0;
                    }
                    span {
                        margin-left: 20px;
                        color: #909399;
                    }
                    &:last-child {
                        margin-top: 20px;
                        &::before {
                            background: #1ea57d;
                        }
                    }
                }
            }
            .tab-over {
                height: 174px;
                max-height: 174px;
                margin-left: 50px;
                margin-top: 15px;
                margin-top: 54px;

                &::-webkit-scrollbar {
                    /*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
                    width: 5px;
                    // height: 8px;
                }
            }
            .tab-con {
                width: 410px;

                td {
                    width: 190px;
                    font-size: 12px;
                    color: #43a1ac;
                    letter-spacing: 1.17px;
                    height: 27px;
                    line-height: 27px;
                    border: 0;
                    &:first-child {
                        border-left: 0;
                    }
                    &:last-child {
                        border-right: 0;
                        padding-left: 30px;
                        padding-right: 15px;
                    }
                    div {
                        position: relative;
                        padding-left: 15px;
                        overflow: hidden;
                        font-family: PingFangSC-Light;
                        letter-spacing: 1.17px;
                        font-size: 12px;
                        i {
                            position: absolute;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background: #358e80;
                            top: 14px;
                            left: 0;
                        }
                        span {
                            float: right;
                            font-size: 12px;
                            color: #909399;
                        }
                    }
                }
            }
        }
    }
}

.light {
    .stat {
        font-family: PingFangSC-Light;
        .stat-wrap {
            height: 139px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            background-color: #ebecf3;
        }
        &-left {
            width: 408px;
            background-image: linear-gradient(-45deg, #00b1d5 0%, #39c2b6 100%);
            display: flex;
            &-img {
                margin-top: 31px;
                margin-left: 54px;
                background: url('~@/assets/images/light/bz.png') no-repeat;
                width: 75px;
                height: 75px;
            }
            &-content {
                margin-top: 35px;
                margin-left: 38px;
                display: flex;
                flex-direction: column;
            }
            &-number {
                font-family: PingFangSC-Light;
                font-size: 30px;
                color: #ffffff;
                letter-spacing: 0.88px;
                line-height: 26px;
            }
            &-text {
                margin-top: 16px;
                font-size: 16px;
                color: #fff;
                letter-spacing: 1.53px;
                line-height: 22px;
            }
        }
        .stat-right {
            width: 933px;
            display: flex;
            justify-content: space-between;
            div {
                flex: 1;
                position: relative;
                margin-left: 20px;
                background-color: #263234;
                &:first-child {
                    margin-left: 0;
                }
                p,
                span {
                    position: absolute;
                    z-index: 1;
                    right: 20px;
                }
                span {
                    top: 45px;
                    font-size: 20px;
                    color: #ffffff;
                    letter-spacing: 1.17px;
                }
                p {
                    top: 79px;
                    font-size: 14px;
                    color: #fff;
                    letter-spacing: 0.82px;
                    margin: 0;
                }
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }
            }
        }
    }
    .project-title {
        display: flex;
        padding-top: 45px;
        p {
            margin: 0;
            width: 450px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #333;
            letter-spacing: 1.5px;
            padding-left: 112px;
            &:last-child {
                padding-left: 88px;
            }
        }
    }
    .data-content {
        display: flex;
        justify-content: flex-start;
        padding: 45px 55px 85px 85px;
        margin-bottom: 35px;
        p {
            margin: 0;
            // font-family: PingFangSC-Regular;
            font-size: 16px;
            letter-spacing: 1.5px;
            color: #ffffff;
            letter-spacing: 1.5px;
            margin-bottom: 50px;
        }
        .detail-left {
            width: 450px;
            // height: 270px;
            border-right: 1px solid #d2d9e5;
            p {
                padding-left: 45px;
            }
        }
        .detail-right {
            width: 770px;
            // height: 270px;
            padding-left: 70px;
            p {
                padding-left: 45px;
            }
        }
        .chart-list {
            display: flex;
            ul {
                width: 210px;
                margin-top: 70px;
                list-style: none;
                li {
                    height: 18px;
                    line-height: 18px;
                    padding-left: 15px;
                    font-size: 12px;
                    color: #43a1ac;
                    letter-spacing: 0;
                    font-family: PingFangSC-Light;
                    position: relative;
                    &::before {
                        content: '';
                        width: 6px;
                        height: 6px;
                        background: #14dcc3;
                        border-radius: 50%;
                        position: absolute;
                        top: 6px;
                        left: 0;
                    }
                    span {
                        margin-left: 20px;
                        color: #909399;
                    }
                    &:last-child {
                        margin-top: 20px;
                        &::before {
                            background: #1ea57d;
                        }
                    }
                }
            }
            .tab-over {
                height: 174px;
                max-height: 174px;
                margin-left: 50px;
                margin-top: 15px;
                margin-top: 54px;

                &::-webkit-scrollbar {
                    /*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
                    width: 5px;
                    // height: 8px;
                }
            }
            .tab-con {
                width: 410px;
                td {
                    width: 190px;
                    font-size: 12px;
                    color: #43a1ac;
                    letter-spacing: 1.17px;
                    height: 27px;
                    line-height: 27px;
                    border: 0;
                    &:first-child {
                        border-left: 0;
                    }
                    &:last-child {
                        border-right: 0;
                        padding-left: 30px;
                        padding-right: 15px;
                    }
                    div {
                        position: relative;
                        padding-left: 15px;
                        overflow: hidden;
                        font-family: PingFangSC-Light;
                        letter-spacing: 1.17px;
                        font-size: 12px;
                        i {
                            position: absolute;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background: #358e80;
                            top: 14px;
                            left: 0;
                        }
                        span {
                            float: right;
                            font-size: 12px;
                            color: #909399;
                        }
                    }
                }
            }
        }
    }
}
</style>

