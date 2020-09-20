<template>
    <div class="we-map">
        <div id="container" style="height:689px"></div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form history">
            <el-form-item>
                <el-date-picker start-placeholder='日期开始' end-placeholder='日期结束' v-model="dateArr" type="datetimerange" unlink-panels @change="changeDate" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>

        <img @click="drawer=true" v-if="flag==='dark'" class="reach_port_button" src="../../../../assets/images/ship-route/reach_port_button.png" alt="">
        <img @click="drawer=true" v-else class="reach_port_button" src="../../../../assets/images/light/reach_port_button.png" alt="">
        <!-- 靠港历史 -->
        <el-drawer class="el_drawer_content" id="el_drawer_content" direction="ltr" :visible.sync="drawer" :with-header="false" :modal="false" size="670px">
            <i class="el-icon-close xx" @click="drawer=false"></i>
            <div class="drawer-title">靠港历史</div>
            <div class="content_detail">
                <el-table :data="list" ref="refTable" @row-click="clickTable" :row-key="getRowKeys" :expand-row-keys="expands">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <div class="expand_left">
                                <div class="same end">终</div>
                                <img class="line" src="../../../../assets/images/ship-route/reach_port_arrow.png" alt="">
                                <div class="same start">始</div>
                            </div>
                            <div class="expand_right">
                                <div class="end">{{props.row.portNameCh || '-'}}（到达港）</div>
                                <div class="detatl">
                                    <div class="box">
                                        <span class="text">港口停留(h)</span>
                                        <span class="number">{{props.row.stayPortTime || '-'}}</span>
                                    </div>
                                    <div class="box">
                                        <span class="text">码头作业(h)</span>
                                        <span class="number">{{props.row.stayTerminalTime || '-'}}</span>
                                    </div>
                                    <div class="box">
                                        <span class="text">等泊时间(h)</span>
                                        <span class="number">{{props.row.waitBerthTime || '-'}}</span>
                                    </div>
                                    <div class="box">
                                        <span class="text">航时(h)</span>
                                        <span class="number">{{props.row.sailingTime || '-'}}</span>
                                    </div>
                                    <div class="box">
                                        <span class="text">航程(nm)</span>
                                        <span class="number">{{props.row.distance || '-'}}</span>
                                    </div>
                                    <div class="box">
                                        <span class="text">航速(kn)</span>
                                        <span class="number">{{props.row.speed || '-'}}</span>
                                    </div>
                                </div>
                                <div class="start">{{props.row.departurePort || '-'}}（始发港）</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="portNameCh" label="港口中文" show-overflow-tooltip align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="portNameEn" label="港口英文" show-overflow-tooltip></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="country" label="国家或地区" show-overflow-tooltip></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="arrivePortTime" label="到港时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{formatDate(scope.row.arrivePortTime,'YYYY-MM-DD hh:mm:ss') || '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="arriveBerthTime" label="靠泊时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{formatDate(scope.row.arriveBerthTime,'YYYY-MM-DD hh:mm:ss') || '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="leavePortTime" label="离港时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{formatDate(scope.row.leavePortTime,'YYYY-MM-DD hh:mm:ss') || '-'}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
import ship from "@/assets/images/echart/ship.png"
export default {
    data() {
        return {
            ruleForm: {
                startTimePoint: '',
                endTimePoint: '',
                mmsi: this.$route.query.mmsi
            },
            dateArr: [],
            drawer: false,
            list: [],
            // 获取row的key值
            getRowKeys(row) {
                return row.id;
            },
            // 要展开的行，数值的元素是row的key值
            expands: [],
        }
    },
    mounted() {
        this.fastChange(30)
        this.getList()
    },
    watch: {
        flag(e) {
            this.getList()
        },
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        clickTable(row, index, e) {
            this.$refs.refTable.toggleRowExpansion(row)
        },
        fastChange(val) {
            const date = new Date();
            this.ruleForm.endTimePoint = `${this.formatDate(new Date())} 00:00`;
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.ruleForm.startTimePoint = `${this.formatDate(startDate)} 00:00`;
            this.dateArr = [this.ruleForm.startTimePoint, this.ruleForm.endTimePoint]

        },
        init(path, name) {
            let strokeStyle, dirArrowStyle;//线得颜色
            let map
            if (this.flag === 'light') {
                strokeStyle = dirArrowStyle = this.$resource.hip_route_detail.lineColor;
                map = new AMap.Map('container', {
                    center: path[0],
                    resizeEnable: true,
                    zoom: 3,
                    zooms: [4, 12],
                    mapStyle: "",
                })
            } else {
                strokeStyle = '#346164';
                dirArrowStyle = '#43A1AC';
                map = new AMap.Map('container', {
                    center: path[0],
                    resizeEnable: true,
                    zoom: 3,
                    zooms: [4, 12],
                    mapStyle: "amap://styles/a993d011eba493f75f435b61596f3cda",
                })
            }


            if (name.length > 0 && name) {
                let five = [0, Math.floor((name.length - 1) / 3), Math.floor((name.length - 1) / 2), Math.floor((name.length - 1) / 5), name.length - 1]
                let market
                five.forEach((i, index) => {
                    market = new AMap.Marker({
                        position: path[i],
                        content: `<div class='markerInfo'>${name[i]}</div>`
                    })
                    map.add(market)
                })
            }


            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar({
                    visible: true // 去掉右下角控件
                }))
            })
            AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {

                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }
                var emptyLineStyle = {
                    lineWidth: 0,
                    fillStyle: null,
                    strokeStyle: null,
                    borderStyle: null
                };
                var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    autoSetFitView: false, //是否在绘制后自动调整地图视野以适合全部轨迹，默认true
                    map: map, //所属的地图实例
                    getPath: function (pathData, pathIndex) {
                        return pathData.path;
                    },
                    getHoverTitle: function (pathData, pathIndex, pointIndex) {

                        return ''
                    },
                    renderOptions: {
                        renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1

                        // pathLineStyle: emptyLineStyle,
                        pathLineStyle: {
                            lineWidth: 0,
                            strokeStyle: '#152A31',
                            borderStyle: 'none',
                        },
                        pathLineSelectedStyle: {
                            lineWidth: 0,
                            strokeStyle: '#152A31',
                            borderStyle: 'none',
                        },
                        pathLineHoverStyle: emptyLineStyle,
                        keyPointStyle: emptyLineStyle,
                        "startPointStyle": {
                            "radius": 8,
                            "fillStyle": "#5CB87A",
                            "lineWidth": 1,
                            "strokeStyle": "#5CB87A"
                        },
                        "endPointStyle": {
                            "radius": 8,
                            "fillStyle": "#EB5513",
                            "lineWidth": 1,
                            "strokeStyle": "#EB5513"
                        },

                        keyPointHoverStyle: emptyLineStyle,
                        keyPointOnSelectedPathLineStyle: emptyLineStyle,
                        // 轨迹线的样式

                    },
                });

                window.pathSimplifierIns = pathSimplifierIns;

                //设置数据
                pathSimplifierIns.setData([{
                    name: '路线0',
                    path
                }]);



                //对第一条线路（即索引 0）创建一个巡航器

                var navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: false,
                    speed: 1000000,
                    pathNavigatorStyle: {
                        autoRotate: false,
                        loop: true,
                        width: 40,
                        height: 40,
                        content: PathSimplifier.Render.Canvas.getImageContent(
                            ship, onload,
                            onerror),
                        strokeStyle: null,
                        fillStyle: null,
                        pathLinePassedStyle: {
                            lineWidth: 1,
                            strokeStyle: strokeStyle,
                            dirArrowStyle: {
                                width: 8,
                                stepSpace: 100,
                                strokeStyle: dirArrowStyle
                            }
                        }
                    }
                });

                navg1.start();
            })

        },
        getList() {
            this.ajax
                .json('/dcp/ship/track/page/list', this.ruleForm)
                .then(res => {
                    if (res.code === '200') {
                        let data = res.data
                        let longitudeAndLatitudeList = []
                        let timePoint = []
                        data.forEach((item, index) => {
                            longitudeAndLatitudeList.push([+item.longitude, +item.latitude])
                            if (data.length !== 1) timePoint.push(this.formatDate(item.timePoint, "YYYY-MM-DD HH:mm:ss"))
                        })
                        this.init(longitudeAndLatitudeList, timePoint)
                    }
                })
            this.ajax
                .json('/dcp/ship/voyage/page/list', {
                    mmsi: this.$route.query.mmsi,
                    startDate: this.ruleForm.startTimePoint,
                    endDate: this.ruleForm.endTimePoint
                })
                .then(res => {
                    this.list = res.data.records
                    this.expands.push(this.list[0].id)
                })
        },
        reSet() {
            this.ruleForm = {
                startTimePoint: '',
                endTimePoint: '',
                mmsi: this.$route.query.mmsi
            }
            this.fastChange(30)
            this.getList()
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.ruleForm.startTimePoint = this.formatDate(v[0], "YYYY-MM-DD HH:mm:ss")
                this.ruleForm.endTimePoint = this.formatDate(v[1], "YYYY-MM-DD HH:mm:ss")
            } else {
                this.ruleForm.startTimePoint = "";
                this.ruleForm.endTimePoint = "";
            }
        }
    },
}
</script>

<style lang="scss" >
    .we-map {
        .history {
            position: absolute;
            top: 20px;
            left: 19px;
        }

        // table
        .content {
            position: relative;
        }
        .reach_port_button {
            position: absolute;
            top: 187px;
            width: 35px;
            cursor: pointer;
        }
        .el-drawer__wrapper.el_drawer_content {
            top: 0 !important;
        }
        .content_detail {
            margin: 0 10px;
        }
        .el_drawer_content .el-drawer {
            height: 681px;
        }
        .el-table__expanded-cell {
            padding: 20px 50px !important;
        }
    }

    .dark {
        .we-map {
            .amap-controls {
                .amap-control.amap-toolbar {
                    border-radius: none;
                    background-color: #18454a;
                    span {
                        line-height: 25px;
                        color: #fff !important;
                    }
                    & span:hover {
                        background-color: #43a1ac;
                    }
                }
            }

            .amap-toolbar span:first-child {
                border-bottom: 1px solid #33656b;
            }
            .expand_right {
                color: #fff;
            }
            .el-table__row.expanded,
            .el-table__expanded-cell {
                background: #313438;
            }
            .el-table {
                background-color: #2d3034;
            }
            .el-table th {
                background-color: #2d3034;
            }
            .el-table tr {
                background: #2d3034;
            }
            .expand_left {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #ffffff;
                line-height: 20px;
                position: relative;
                display: inline-block;
                .same {
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;
                    text-align: center;
                }
                .end {
                    background: #bb4d31;
                }
                .line {
                    margin-left: 5px;
                    width: 9px;
                }
                .start {
                    background: #358e62;
                }
            }
        }
    }
    .light {
        .we-map {
            .amap-toolbar {
                border-radius: none;
                background-color: #fff;
                span {
                    line-height: 25px;
                    color: #4064d4 !important;
                }
                & span:hover {
                    background-color: #dbe6fa;
                }
            }
            .amap-toolbar span:first-child {
                border-bottom: 1px solid #d2d9e5;
            }
            .expand_right {
                color: #666;
            }
            .el-table__row.expanded,
            .el-table__expanded-cell {
                background: #f7f9fd;
            }
            .el-table {
                background-color: #f7f9fd;
            }
            .el-table th {
                background-color: #fff;
            }
            .el-table tr {
                background: #fff;
                border-bottom: 2px solid #000;
            }
            .expand_left {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #ffffff;
                line-height: 20px;
                position: relative;
                display: inline-block;
                .same {
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;
                    text-align: center;
                }
                .end {
                    background: #ec6249;
                }
                .line {
                    margin-left: 5px;
                    width: 9px;
                }
                .start {
                    background: #3dbd7d;
                }
            }
        }
    }

    .el-table__body-wrapper.is-scrolling-none {
        height: 570px;
        overflow-y: auto;
    }
    // 展开

    .expand_right {
        vertical-align: top;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        position: relative;
        display: inline-block;
        margin-top: 3px;
        margin-left: 10px;
        width: 470px;
        .end {
            margin-bottom: 102px;
        }
        .detatl {
            font-family: PingFang-SC-Regular;
            color: #999;
            position: absolute;
            top: 34px;
            left: 0;
            display: flex;
            flex-wrap: wrap;
            line-height: 31px;
            .box {
                width: 100px;
                margin-right: 45px;
                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
            .text {
                float: left;
            }
            .number {
                float: right;
            }
        }
    }
    .search {
        position: absolute;
        right: 30px;
        bottom: 21px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #43a1ac;
        cursor: pointer;
    }
</style>
