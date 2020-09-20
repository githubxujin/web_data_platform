<template>
    <div class="stat" id="fullScreen">
        <div class="table-wrap">
            <div>
                <div class="echart-desc">鼠标滚动键进行图形的↑ 放大与↓缩小</div>
                <div class="table-title">企业关系图</div>
                <chart height="700px" width="100%" :option="opt" id="relation" :tabClick="true" @showDialog="showDialog" />
            </div>

        </div>
        <el-drawer class="el_drawer_content" title="节点详情" :visible.sync="drawer" :with-header="false" :modal="false" size="380px">

            <i class="el-icon-close xx" @click="drawer=false"></i>
            <div class="drawer-title">节点详情</div>
            <div class="content_box ml20">
                <div class="dialog-title mt20 mb20"><span ref="key_dot" class="key_dot"></span>{{childRelation.name}}<span class="number" v-if="number>0">{{number}}
                    </span></div>
                <div class="drawer-company-list-wrap mr20">
                    <div v-if="allRelation[relationLabel(childRelation.name)] && allRelation[relationLabel(childRelation.name)].length>0">
                        <div class="dialog-box-wrap" v-for="(item,index) in allRelation[relationLabel(childRelation.name)]" :key="index">
                            <div class="name">{{item.name}}</div>
                            <div class="post" v-if="item.position && item.position.length > 0">
                                <span v-for="(j,ik) in item.position" :key="'j'+ik">{{j}} &nbsp;</span>
                            </div>
                            <div class="post" v-if="item.quitDate && item.quitDate.length > 0">
                                退出时间：{{item.quitDate}}
                            </div>
                            <div class="post" v-if="item.uratio && item.uratio.length > 0">
                                持股比：{{item.uratio | percentage}}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <!-- <div class="dialog-box-wrap">
                            <div>{{relationLabel(childRelation.data.en_name)}}</div>
                            <div>aa</div>
                        </div> -->
                    </div>

                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
let listData = []
let linkData = []
import relation from "@/utils/echart/graph/relation"
import chart from "@/components/Charts/invoiceInvalid.vue"
import { deepClone, relationLabel } from "@/utils/common"
import { mapState } from "vuex";
export default {
    components: {
        chart
    },
    data() {
        return {
            relationLabel,
            drawer: false,
            opt: {},
            allRelation: {},
            childRelation: {
                name: '',
                data: {
                    en_name: '',
                }
            },
            number: 0
        };
    },
    computed: mapState({
        flag: state => state.echart.flag
    }),
    watch: {
        flag(e) {
            this.getChart()
        }
    },
    created() {
        this.getChart()
    },
    methods: {
        getChart() {
            listData = []
            linkData = []
            let { evaluateId } = this.$route.query
            this.ajax
                .json(`/dcp/query/enterprise/relation/${evaluateId}`, {}, { type: 'get' })
                .then(res => {
                    let en_name = ['branch', 'clientSupplier', 'court', 'debt', 'exInv',
                        'exSh', 'guess', 'invest', 'legal', 'member', 'purchase',
                        'shareholder', 'sibling']
                    this.allRelation = res.data
                    //箭头  股东  历史投资  虚线
                    let data = deepClone(relation)

                    var typeList = [{
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
                    }], branchList = [], clientSupplierList = [], courtList = [], debtList = [], exInvList = [],
                        exShList = [], guessList = [], investList = [], legalList = [], memberList = [], purchaseList = [],
                        shareholderList = [], siblingList = [];
                    let arrName = [branchList, clientSupplierList, courtList, debtList, exInvList,
                        exShList, guessList, investList, legalList, memberList, purchaseList,
                        shareholderList, siblingList,
                    ]
                    let legend = [];
                    let color = []
                    if (this.flag === 'light') {
                        color = this.$medicine.company_evalute_list.color;
                        data.series[0].label.normal.color = '#666'
                        data.legend.backgroundColor = '#fff';
                        legend = typeList.map((item, inx) => {
                            return {
                                name: typeList[inx].name,
                                itemStyle: {
                                    color: item.name === '公司' ? '#36C2CF' : color[inx],
                                }
                            }
                        })
                        data.series[0].categories = legend;
                        data.series[0].label.normal.fontFamily = 'PingFang-SC-Regular';
                        data.toolbox.emphasis.iconStyle.borderColor = '#4064D4';
                        data.toolbox.feature = {
                            "restore": {
                                "icon": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAt5JREFUSA3tl11IU2EYx//73tzWdGbzc4Sa9DENCj+6U7rozi6ECMKLICqEoI8bwYKsKIi6SiJvIrzqpougiy4CMVhpUqlb0BpCutwWznRza7rtuN73xF5Fz3uOCM4bn5u95/n67T3neZ73HNWEbyaLHRAtZdbXlecV7fkRhDqvxDWwXfCam7G9S7G4Nov4+j2BwdEYxv0JROYzON1ahIsdDhaeJf2RaxG1iqklF5sCB2fTeDQwAwp2lhnQ7LLCUaxDS72FJb39LIChzzF23d5qx7VzZex6/UIR7J1MoufJNAqtGjy8uh+NR8zrc4jXGSELrUYFvVaF9jY7Tp0olPTLKWXBoUgaN/umUes04m5XFQqM/CYwmzQ4VG2CTqvGW/cCOk4W5xiSv/xMxP3xQBB7LBpFKM1Md2vUq9F7uQpGgxoPns9IApmSjkwpGfMlsq0XvNkRz6KUeYMuPJfKToWWRf0wiaGxvp/JDX5UQZncHQ+ORlHpMKDJtVpA7N9KLBx2HZyletHSTGIq9unx5v28hOd/FRc84f+7aahU9uOHLfAHklImUccFRxbSYstwIxUM5Xv1CJE25AkXrCPFksnkxgEvnK9Xk8zCCj+eCy4nzyg4m+JnVrCE59IoKdJxvbjgmkojvpBJRcfgVuSTN46jdQXcUC6YjrwQ2fGH8UUWHEsIbC23GPbE8ev3MtoabVw3Lri6wkDGowV9L8OIxgW4xxZxttvPTZQzJJIrYgyNbTiwhR3TRN3nK8QCufU0gLloBsklATL1AgrtISM2kRRwo1P+dYq7Ywq227ToOlOKqdAS+l+FqYorHyfiuHRvkvgu4/4Vp2Iryh4StLh6+wMMRs/Y3DkbCKfgJs8/HElh9Ftc7IAmclxe7ywDnWJKIgs+dtCMF3dqWT/brKvu70aieD30ByWFWrQ0WMVCctWYlHjMrqIDe/f1lt2PbVzIVvU2cnfuS0IsU/otk2/5B95lQovbaXqOAAAAAElFTkSuQmCC"
                            },
                            "saveAsImage": {
                                "title": "下载",
                                "icon": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAa5JREFUSA1jvHTz6X+GAQAsIDt11aToavXlW88YmOhqI5JloxYjBQZtmWQHddvcpwzLd7wh23XgVE2O7qevfjFwsJHt7tFUTU6gk6eH/Egizz64rsFn8Z3HPxjuAjEMbD70nuH9pz8wLsN/tKrl3cc/DFuAamAAXT9MHEbj9PGqXW8ZVgIxDGw78p6hoOcBw/vPf2FCcPrNhz8M+d0PGLYf+wAXQ9cPl4AycFr8D+gjEIaBznx5BlZmRoYioOUfgJYzMkJk3rz/w1AAtJSbg4mhM08ephysF1k/XALKwGkxukI+bmaGvmIFsIVFvQ8YPn/7y/Dy3W+gT+8z8HIzMfQC5Xi4iDaOtAKEjwdiOSh+H7/4yXDqymcGAV4Whp5CBQZuTuItBXmKNNVADQK8QMtLFBjkJdkZtJW5GLoL5Um2FGQxWWW1INDy/lJFYFnNyMDJTrLbQfaSZzFII8hySgB5zqXERqhevEG9//RHhkNnP5FlzV9gXnI05cepF6fFIS5CDHZGfDg1EiMhJoTTeNxxrKHAyaChQIzx5KkZsDgetZi8CCNDFzjZgfoy9AYAA6N4DVkhRHgAAAAASUVORK5CYII=",
                                "backgroundColor": "#232528"
                            },
                            "myFull": {
                                "title": "全屏",
                                "icon": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA7JJREFUSA3lVklrU1EU/l6mphKiSUuDA9oo1gEEUUQX0jqA3TjVjT+gojjt1IULNy7ElSgiqFs3VttiC11o66wIokjFFLVWDFUJZLCxQ5I3XM+56atJehMUpCKewHsv955zv3Pu+c65V+t/+1ngL4iLMVc1zJtR6NfvvsAxo4gFYP8fsMxxwQ7IT8sCPn7JIuh3QkxSj18BvwsOrVQ7/98iheFYDr7q/CZqpJfJCYRq3EobJXAsqePImSHohgADCkJ3OzWcOxbGyiXVSuTBaBZHz7INeU2oDrL0uB04fyKMpQu902yUwF6PhhyBWhRGy9YaNK3xk/cmltWrQXnVxQs8uHC8Hhld4MmrNG72JpGl75rZSojKrN7eGETPoxTefcpg7QofnM5pjk8NuGhHllBkQ8MZdD1MYe+2WjnHW64StTuTmpvX+bF4fhUud8RohKLfEgQDqMQwBbrup3ClM4b9LSE01HvR1htXqcoxJfDouEUAgNulYUdTQCrmwaEEZzLeItCrBHpgT0javIiMwUVMtMk5zQNumaVimkJEhsZFTrfklGEI0Xk3IZoPRcT12/EidZNUrvXE5VxHX0IQueQ8274ZHBc8XyqMqYzYQRWxIvyTSJzbHZRvjX59z0ck2bhMWJIjBp71p7GvpU5GaqeCd6tcBUhDVcSlHtr/OZr4N13wjhTKyHdD8K78qpSNWHqkeHA0qvLw+yrQXbEOD/0bvdo0gfQoPQqEGZ2gPHM5/Y78csQM2vUgiZMXo4injCkMyjlOXx1G94PUb4ErgbnhRz5MyF7NCAzaTd2Ia3n9Kh+CBW2wLujGxtV+XG6PFYFznx/4OEFtd8rH4g8VqxPE3OaDb8TjV2lZl7KGD0dEG9VwKaOZycz2m735Om+nN/8foD6wjeo++jU7jexlWc39VSdPfV6HjIIjbd1VJ7sW13ipMNt3bQpQlUO2TN6xZYuqQCUG3yyFAekpG4hcmIyf9o9SK0yidXeIQANl+zTrM/hOBid0drR5wxx5pMq1FA+1O5OKN+4ksH1jAA2LvHhPJ1Ql5jIPXg6M0fHoxc7GgOQE70C5Xq2MOP7NkIe4nrPQSRF33EvARS3wwvEwlhe00sJA+Og8dSkqz3GOWqNHlVvDWMYiMhZq5r81TnTp9ZZzFEvo4AuB7fHohIUFIY/yGsNLsQ33bftqxODJtIkwHav2mA3P11tlxKw4tzZ/CNjKKq/tOX6zTe2c4uX4jlZOKua4nNGfGP//gGUSONkzLT8ALX1y3+2WwNYAAAAASUVORK5CYII=",
                                onclick: function (e) {
                                    document.getElementById("relation").style.width = "100%";
                                    document.getElementById("relation").style.height =
                                        window.innerHeight + "px";
                                    var el = document.getElementById("fullScreen");
                                    var rfs =
                                        el.requestFullScreen ||
                                        el.webkitRequestFullScreen ||
                                        el.mozRequestFullScreen ||
                                        el.msRequestFullScreen;
                                    if (rfs) {
                                        rfs.call(el);
                                    } else if (typeof window.ActiveXObject !== "undefined") {
                                        var wscript = new ActiveXObject("WScript.Shell");
                                        if (wscript != null) {
                                            wscript.SendKeys("{F11}");
                                        }
                                    }
                                }
                            },
                            "myRestore": {
                                "title": "恢复",
                                "icon": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAj5JREFUSA1jvHTz6X+GAQAsIDt11aToavXlW88YmOhqI5JloxYjBQZlzN9//jO8+/gHpyE0CWqQpcu3v2Eo6X/I8PLdb6yWU2zx378MDAfOfGL4+QuSK8GW7njDsHznG4YAR2EGcSFW2lj88csfhta5TxjOXv/KALJ0GdCny3e8ZSiIlmTwsRPAailIEJyPccoSIcHIyMDw7x8DAxcHE8OSbW8YVu0CWSrB4GouwMAElMMFKLYYZDAjw3+GjQfeMZy4/AVhKYFIJCCNy72o4v+BVh8485HB3VKAgZWZkeHweUSco6pE8Cj2MSjLiAiwMPz9+x9sIchSJsb/DJIibAxq8hwIm9BYFFusLMvBMLVSiYGNFRGh33/8YxDDkZph9lNsMcggkI+RAR83MzIXK5sqcYzVZAKCqE5FUwwqHJ69/sXAzQlxHyjr/AAWFJIi2AsFNO14uXgtPnv9C0PllEcM//+BSiVGcL4U4mdh6C1SYJCVYMNrMCFJvBYbqHMzTC5TBJdIG/a/A2cZUOrl5yEch4QsxhvHoJSqKsfBcOHmV3DhEOYmAvQ4IvUSMhyfPF6LQWXvUmDZu3InpBjUUuSEmEUFu3FaDLIUXPaCLI2BlL3ffv5jYGb6z/CfCs1DrHH8BxiPc9a/Yth88D1DIdBSZ2iB72TKz6AoxU67OH4FrLzPAau5/CiEpaAwZmdjZNCABTe+CCRCDquPpUTZGGbXKRGhnXwlOOOYfCOJ0zlqMXHhRAVV4MQF6svQGwAAEfix8fdV+JkAAAAASUVORK5CYII=",
                                onclick: function (e) {
                                    document.getElementById("relation").style.width = 1170 + "px";
                                    document.getElementById("relation").style.height = 700 + "px";
                                    if (document.exitFullScreen) {
                                        document.exitFullScreen();
                                    } else if (document.mozCancelFullScreen) {
                                        document.mozCancelFullScreen();
                                    } else if (document.webkitExitFullscreen) {
                                        document.webkitExitFullscreen();
                                    } else if (document.msExitFullscreen) {
                                        document.msExitFullscreen();
                                    }
                                }
                            }
                        }
                    } else {
                        color = ['#233434', '#333440', '#342829', '#382E2C', '#38342E', '#27313C', '#243037', '#373632', '#282B3B',
                            '#303630', '#372B31', '#263140', '#2B3432'
                        ]
                    }
                    arrName.forEach((item, inx) => {
                        legend.push({
                            name: typeList[inx].name,
                            itemStyle: {
                                color: color[inx],
                            }
                        })
                        if (typeList[inx].borderColor) {

                            item.push({
                                name: typeList[inx].name,
                                symbolSize: 20,
                                itemStyle: {
                                    color: color[inx],
                                    borderColor: this.flag === 'light' ? color[inx] : typeList[inx].borderColor
                                },
                                position: true,
                                en_name: en_name[inx]
                            })
                        }

                    })

                    Object.keys(res.data).map((item, index) => {
                        if (item === arrName[index][0].en_name) {
                            let list = [];
                            if (item != 'shareholder') {
                                list = res.data[item].length > 0 ? this.getLimitTen(res.data[item]) : []
                            } else {
                                list = res.data[item]
                            }
                            let symbolData = [];
                            if (item === 'exSh' || item === 'shareholder') {
                                symbolData = ['none', 'arrow'];
                            }
                            arrName[index] = arrName[index].concat(list.map(i => {
                                return {
                                    name: item === 'legal' ? i.name + '        ' : i.name,
                                    symbolSize: 10,
                                    symbol: symbolData,
                                    solidType: item === 'exSh' ? 'dashed' : 'solid',
                                    borderColor: this.flag === 'light' ? arrName[index][0].itemStyle.color : arrName[index][0].itemStyle.borderColor,
                                    itemStyle: {
                                        color: arrName[index][0].itemStyle.color,
                                        borderColor: arrName[index][0].itemStyle.borderColor
                                    },
                                    en_name: item,
                                    post: item === 'member' ? i.post : ''
                                }
                            }))
                            this.setData(arrName[index], index);
                            this.setLinkData(arrName[index], arrName[index][0].name)
                        }
                    })
                    this.setData([{
                        name: this.$route.query.companyName,
                        borderColor: this.flag === 'light' ? '#36C2CF' : '#297D70 ',
                        symbolSize: 20,
                        itemStyle: {
                            color: this.flag === 'light' ? '#36C2CF' : '#233434',
                            borderColor: this.flag === 'light' ? '#36C2CF' : '#297D70 '
                        },
                        position: true
                    }], 13)

                    this.setLinkData(typeList, this.$route.query.companyName)
                    data.legend.data = typeList
                    data.series[0].data = listData
                    data.series[0].links = linkData
                    this.opt = data
                });
        },
        setData(arr, n) {
            for (var i = 0; i < arr.length; i++) {
                let isName = listData.map(i => i.name)
                if (!isName.includes(arr[i].name)) {
                    listData.push({
                        en_name: arr[i].en_name,
                        name: arr[i].name,
                        symbolSize: arr[i].symbolSize,
                        symbol: 'circle',
                        category: n,
                        draggable: "true",
                        itemStyle: arr[i].itemStyle,
                        label: {
                            position: arr[i].position ? 'inside' : 'bottom'
                        }
                    })
                }
            }
        },
        setLinkData(arr, title) {
            for (var i = 0; i < arr.length; i++) {
                linkData.push({
                    "source": arr[i].name,
                    "target": title,
                    symbol: arr[i].symbol,
                    post: title === '成员' ? arr[i].post : "",

                    lineStyle: {
                        normal: {
                            color: arr[i].borderColor,
                            type: arr[i].solidType
                        }
                    },

                })
            }
        },
        showDialog(data) {
            this.childRelation = data
            this.drawer = true
            this.$nextTick(() => {
                this.$refs.key_dot.style.backgroundColor = this.childRelation.borderColor
            })
            let arr = this.allRelation[relationLabel(this.childRelation.name)]
            this.number = arr ? arr.length : 0
        },
        getLimitTen(list) {
            let arr = []
            for (var i = 0; i < 10; i++) {
                list[i] ? arr.push({ name: list[i] && list[i].name, post: list[i].position }) : ''
            }
            return arr
        },
    },

    filters: {
        percentage: function (value) {
            let percentageNum = +value
            return (percentageNum * 100).toFixed(2) + '%'
        }
    }
};
</script>
<style lang="scss" scoped>
    .echart-desc {
        position: absolute;
        right: 20px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a0a3a8;
    }
    .drawer-nav {
        position: relative;
        display: flex;
        margin: 20px;
        align-items: center;
        .title {
            text-indent: 10px;
            margin-right: 20px;
            span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                position: absolute;
                left: -2px;
                top: 6px;
            }
        }
    }
    /* 遮罩 */
    .drawer-title {
        height: 50px;
        line-height: 50px;
        text-indent: 20px;
        font-size: 16px;
    }
    .dialog-title {
        text-indent: 10px;
        margin-right: 20px;
        color: #a0a3a8;
        font-family: PingFangSC-Light;
        font-size: 12px;
    }
    .dialog-box-wrap {
        display: block;
    }
    .key_dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-left: -10px;
        margin-right: 7px;
    }
    .number {
        font-family: PingFangSC-Light;
        font-size: 12px;
        padding: 2px 4px;
        margin-left: 20px;
    }
    .dark {
        .number {
            color: #43a1ac;
            background: #2d393c;
        }
        .post {
            color: #d3d3d4;
        }
        .drawer-title {
            border-bottom: 1px solid #3d3f43;
        }
    }
    .light {
        .number {
            color: #4064d4;
            background: #dce6f9;
        }
        .post {
            color: #999;
        }
        .drawer-title {
            border-bottom: 1px solid #eee;
        }
    }
</style>

