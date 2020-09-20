<template>
    <div id="fullScreen" class="we-industry-dynamic">
        <div class="dialog-wrap" v-if="dialogVisible">
            <div class="dialog-header">
                <div class="dialog-title" v-if="!editChildStatus">{{ parentParams.value}} <span class="edit-pen ml10"><i class="iconfont icon-bianji" @click="editChildStatus=!editChildStatus"></i></span></div>

                <div v-else>
                    <el-input v-model="parentParams.value" @blur="editChildStatus=!editChildStatus"></el-input>
                </div>
                <i class="el-icon-close" @click=" dialogVisible = false"></i>

            </div>
            <div class="dialog-content">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="标签" name="first">
                        <div class="key-text-wrap">
                            <div>
                                <div class="label-text" v-for="(item,index) in sonChild" :key="index">{{item.name}}</div>
                            </div>
                            <el-button type="primary" icon="el-icon-plus" @click="addChild()" v-if="!childStatus">新增</el-button>
                            <el-input v-model="child" v-else class="key-input" ref="tagItem" @blur="addChildRule()"></el-input>
                        </div>
                        <div class="dialog-footer">

                            <el-button type="danger" @click="delChildRule">删除</el-button>
                            <el-button type="primary" @click="  updateChild() ">保存</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关键字" name="second">
                        <div class="key-text-wrap">
                            <div class="key-text" v-for="(item,index) in keywordList" :key="index">
                                <div v-if="!editKeyWordStatus" style="display: flex;">
                                    <v-input v-model="keywordList[index]" :canEdit="true"></v-input>
                                    <i class="el-icon-close" @click="delKeyword(index)"></i>
                                </div>

                            </div>
                            <el-button type="primary" icon="el-icon-plus" @click="addItem()" v-if="!operation">新增</el-button>
                            <el-input v-model="keyword" v-else class="key-input" ref="tagItem" @blur="updateKeyword('all')"></el-input>

                        </div>
                        <div class="dialog-footer">
                            <el-button type="primary" @click="operation ? updateKeyword('add') : updateKeyword('update')">保存</el-button>
                            <div class="shangc ml10 ">
                                <c-upload accept=".xlsx,.xls" class="upload-file" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}" plain>
                                    导入
                                </c-upload>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form pt20'>

            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.industryType' clearable placeholder='行业类别' @change=" onChangeIndustryType">
                    <el-option v-for='(s,index) in officialTypeList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateTag">更新</el-button>
            </el-form-item>

        </el-form>
        <div class="echart-relative">
            <div class="echart-desc">鼠标滚动键进行图形的↑ 放大与↓缩小</div>
            <chart height="800px" width="100%" :option="opt" id="relation" :tabClick="true" @showDialog="showDialog" />

        </div>
    </div>
</template>
<script>

import { officialTypeList, deepClone } from "@/utils/common"
import relation from "@/utils/echart/graph/dynamic"
import chart from "@/components/Charts/invoiceInvalid.vue"

export default {
    components: {
        chart,
        'v-input': () => import('@/components/Input/index.vue')
    },
    data() {
        return {
            isChild: false,
            editKeyWordStatus: false,
            dialogVisible: false,
            editChildStatus: false,
            sonChild: [],
            keywordList: [],
            parentParams: {

            }, // 节点参数
            allChild: [],
            child: '',
            childStatus: false,
            keyword: '',
            activeName: 'first',
            officialTypeList,
            params: {
                industryType: 1,
            },
            opt: {},
            operation: false,
            file: [],
        };
    },
    created() {
        this.getTree()
    },
    watch: {
        flag() {
            this.getTree()
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
        //导入关键字
        async uploadHand(files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/server/wx/article/notify/import", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.$message.success("导入成功");
                        res.data.forEach((item, index) => {
                            if (item['keyword']) {
                                this.keywordList.push(item['keyword'])
                            }
                        })
                    }
                });
            }

        },
        //修改节点
        updateChild() {
            let params = {
                name: this.parentParams.value,
                id: this.parentParams.id
            }
            this.updateData({ ...params, ...this.params }, 'child')
        },
        updateTag() {
            this.ajax
                .json('/dcp/update/wx/article/tag', {})
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    })
                });
        },
        //获取子节点cagetory最大值
        getMaxCategory(parentId) {
            let sonChild = this.allChild.filter(i => i.parentId === parentId)
            let arr = sonChild.map(i => {
                if (i.parentId === parentId) {
                    return i.color
                }
            })
            // debugger
            arr.length === 0 ? arr.push(1) : arr
            return Math.max.apply(null, arr) + 1
        },
        //删除关键字
        delKeyword(index) {
            this.keywordList.splice(index, 1)
        },
        getArr(arr) {
            if (arr[0] === "") {
                this.keywordList = []
            } else {
                this.keywordList = arr
            }
        },
        //调取修改接口
        updateData(params, type) {
            this.ajax
                .json('/dcp/update/wx/warn/rule', params)
                .then(res => {
                    this.dialogVisible = false
                    type === 'child' ? this.editChildStatus = false : this.childStatus = false
                    if (type === 'keyword') this.keyword = ''
                    this.operation = false
                    this.getTree()

                });
        },
        //修改关键字
        async updateKeyword(way) {
            if (way === 'add') {
                if (!this.keyword) {
                    this.$message({ type: 'warning', message: '关键字不能为空' })
                    return
                } else if (this.keywordList.includes(this.keyword)) {
                    this.$message({ type: 'warning', message: '关键字已存在' })
                    return
                }

                this.keywordList.push(this.keyword)
            } else if (way === 'all') {
                // debugger
                if (!this.keyword) {
                    this.$message({ type: 'warning', message: '关键字不能为空' })
                    return
                } else if (this.keywordList.includes(this.keyword)) {
                    this.$message({ type: 'warning', message: '关键字已存在' })
                    return
                }
                this.keywordList.push(this.keyword)
                this.keyword = ''
                this.operation = false
                return
            }

            let params = {
                id: this.parentParams.id,
                keywords: this.keywordList.join(','),
            }
            this.updateData({ ...params, ...this.params }, 'keyword')
            // this.keyword = ''
        },
        // 获取父节点下的子节点
        getSonChild() {
            this.sonChild = this.allChild.filter(i => i.parentId === this.parentParams.id)
        },
        delChildRule() {

            this.$confirm("确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            })
                .then(() => {
                    this.ajax
                        .json('/dcp/delete/wx/warn/rule', { id: this.parentParams.id }, { type: 'post' })
                        .then(res => {
                            this.dialogVisible = false
                            this.getTree()

                        });
                })
                .catch(() => { });

        },
        addChildRule() {
            if (!this.child) {
                this.$message({ type: 'warning', message: '标签不能为空' })
                return
            } else if (this.sonChild.map(i => i.name).includes(this.child)) {
                this.$message({ type: 'warning', message: '标签不能重复' })
                return
            }
            let category = this.parentParams.parentId === 0 ? this.getMaxCategory(this.parentParams.id) : this.parentParams.category
            let childParams = {
                parentId: this.parentParams.id,
                color: category,
                name: this.child
            }
            let { industryType } = this.params
            this.ajax
                .json('/dcp/add/wx/warn/rule', { ...childParams, industryType })
                .then(res => {
                    this.sonChild.push({ name: this.child })
                    this.getTree()
                    this.child = ""
                    this.childStatus = false;
                });
        },
        //
        //新增节点
        addChild() {
            this.childStatus = true;
        },
        onChangeIndustryType() {
            this.getTree()
        },
        //获取树状结构
        getTree() {
            // alert(123)
            let { industryType } = this.params
            this.ajax
                .json('/dcp/select/wx/warn/rule/tree', { industryType }, { type: 'get' })
                .then(res => {
                    let colorArr = [];
                    let centerColor = [];
                    if (this.flag === 'light') {
                        colorArr = [
                            { border: '#4064D4', color: '#4064D4' },
                            { border: '#3DBD7D', color: '#3DBD7D' },
                            { border: '#5554F0', color: '#5554F0' },
                            { border: '#4598FF', color: '#4598FF' },
                            { border: '#5AD1B9', color: '#5AD1B9' },
                            { border: '#4064D4', color: '#4064D4' },
                            { border: '#FF946A', color: '#FF946A' },
                        ];
                        centerColor = this.$medicine.industry_dynamic.centerColor;
                    } else {
                        centerColor = ['#233434', '#297D70'];
                        colorArr = [
                            { border: '#A15D41', color: '#2C2721' },
                            { border: '#4181CF', color: '#273241' },
                            { border: '#834455', color: '#372B31' },
                            { border: '#355C9C', color: '#263140' },
                            { border: '#B29E49', color: '#373632' },
                            { border: '#5A8D73', color: '#2B3432' },
                            { border: '#B28149', color: '#38342E' }
                        ]
                    }
                    this.allChild = res.data
                    let treeData = deepClone(relation)
                    //获取顶层
                    let head = res.data.find(i => i.parentId === 0)
                    //通过顶层id获取二级节点
                    // let typeList = res.data.filter(i => i.parentId === head.id)
                    let data = res.data.map(i => {
                        if (i.parentId === 0) {
                            return {
                                parentId: i.parentId,
                                id: i.id,
                                name: (i.id).toString(),
                                category: i.color,
                                value: i.name,
                                keywords: i.keywords,
                                draggable: true,
                                symbol: 'circle',
                                symbolSize: 40,
                                itemStyle: {
                                    color: centerColor[0],
                                    borderColor: centerColor[1]
                                },
                            }

                        } else if (head.id == i.parentId) {
                            return {
                                parentId: i.parentId,
                                id: i.id,
                                keywords: i.keywords,
                                draggable: true,
                                symbol: 'circle',
                                name: (i.id).toString(),
                                category: i.color,
                                value: i.name,
                                symbolSize: 30,

                            }
                        } else {

                            return {
                                parentId: i.parentId,
                                draggable: true,
                                id: i.id,
                                keywords: i.keywords,
                                symbol: 'circle',
                                name: (i.id).toString(),
                                category: i.color,
                                value: i.name,
                                symbolSize: 20,
                            }

                        }

                    })
                    let link = res.data.map(i => {
                        return {
                            source: (i.id).toString(),
                            target: (i.parentId).toString(),
                            symbol: ['arrow', 'none'],
                        }
                    })
                    // 获取category
                    let category = [...new Set(res.data.map(i => i.color))]
                    let max = Math.max.apply(null, category)
                    category = new Array(max + 1).fill(1)
                    let cagegories = colorArr.map((i, index) => {
                        let itemStyle = {
                            color: colorArr[index].color,
                            borderColor: colorArr[index].border
                        }
                        return {
                            // name: i.toString(),
                            itemStyle
                        }
                    })
                    treeData.toolbox.feature = {
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
                    treeData.series[0].data = data
                    treeData.series[0].links = link
                    treeData.series[0].categories = cagegories
                    if(this.flag === 'light'){
                        treeData.series[0].lineStyle.normal.color = '#666'
                    }
                    this.opt = treeData
                });


        },
        //点击回调
        showDialog(val) {
            this.activeName = 'first'
            this.parentParams = val.data
            this.getSonChild()
            this.getArr(this.parentParams.keywords.split(','))
            this.dialogVisible = true
        },
        //新增
        addItem() {
            this.operation = true;
            this.$nextTick(() => {
                this.$refs.tagItem.focus()

            })
        },
    }
};
</script>
<style lang="scss" >
    .light {
        .we-industry-dynamic {
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            .echart-relative {
                position: relative;
            }
            .shangc .el-button {
                padding: 12px 20px;
                font-size: 14px;
                background: #4064d4;
                color: #fff;
            }
            .edit-pen {
                margin-left: -10px;
                color: #4064d4;
            }
            .dialog-footer {
                display: flex;
                flex-direction: row;
                padding-left: 20px;
                margin-left: -20px;
                border-top: 1px solid #dcdfe6;
                margin-top: 60px;

                .el-button {
                    margin: 20px 10px 20px 0;
                    align-items: center;
                    flex-shrink: 0;
                }
            }
            .el-input__inner {
                display: inline-block;
                height: 30px;
                line-height: 30px;
            }
            .key-input {
                width: 80px;
            }
            $parimary: #fff;
            .el-tabs--card > .el-tabs__header .el-tabs__nav {
                border: none;
                border-radius: none;
                background-color: #313438;
                &::after {
                    content: "";
                    height: 20px;
                    position: absolute;
                    background: #dcdfe6;
                    left: 70px;
                    width: 1px;
                    top: 10px;
                }
            }
            .el-tabs--card
                > .el-tabs__header
                .el-tabs__nav
                .el-tabs__item:not(:first-child) {
                background-color: #f1f4fc;
            }
            .el-tabs__item.is-active {
                color: #4064d4;
                background-color: #f1f4fc;
            }
            .el-tabs--card > .el-tabs__header .el-tabs__item {
                border: none;
                background-color: #f1f4fc;
            }
            .el-tabs__item {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #666;
            }
            .el-tabs__content {
                background: $parimary;
                padding-left: 20px;
            }
            .el-tabs__nav-scroll {
                padding-left: 20px;
            }
            .label-text {
                background: #fff;
                border-radius: 3px;
                display: inline-block;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4064d4;
                border: 1px solid #4064d4;
                line-height: 14px;
                padding: 7px 10px;
                margin-right: 10px;
                margin-bottom: 5px;
            }
            .dialog-wrap {
                box-shadow: 0 7px 19px 0 rgba(0, 0, 0, 0.12);
                background-color: $parimary;
                position: absolute;
                top: 100px;
                left: -18px;
                width: 380px;
                z-index: 2000;
            }
            .dialog-header {
                padding: 0 20px;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #dcdfe6;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-icon-close {
                    font-size: 20px;
                    color: #909399;
                }
            }
            .dialog-title {
                font-size: 16px;
                color: #666;
            }
            .dialog-content {
                background: $parimary;
                height: 400px;
                overflow: auto;
            }
            .key-text-wrap {
                display: flex;
                flex-wrap: wrap;
                .tootip {
                    &:hover {
                        cursor: pointer;
                    }
                    .el-button {
                        border-radius: 3px;
                        height: 28px;
                        line-height: 22px;
                    }
                    width: 26px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    background: #fff;
                    border-radius: 3px;
                    margin-left: 6px;
                    .icon-shujuzhongxin-daoru:before {
                        font-size: 16px;
                    }
                }
                .el-button {
                    padding: 0 10px;
                    border-radius: 3px;
                    height: 28px;
                    line-height: 22px;
                    background: #fff;
                    color: #4064d4;
                }
                i {
                    color: #4064d4;
                }
                span {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #4064d4;
                    letter-spacing: 0.44px;
                    line-height: 14px;
                }
            }
            .key-text {
                .el-input__inner {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                }
                i {
                    margin-left: 4px;
                }
                background: #fff;
                border-radius: 3px;
                border: 1px solid #4064d4;

                margin-right: 10px;
                padding: 6px 10px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4064d4;
                letter-spacing: 0.44px;
                margin-bottom: 10px;
            }
        }
        .echart-desc{
            color: #999;
        }
    }
    .dark {
        .we-industry-dynamic {
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            .echart-relative {
                position: relative;
            }
            .shangc .el-button {
                padding: 12px 20px;
                font-size: 14px;
                background: #1e292e;
                color: #53dcec;
                border: 1px solid #366f71;
            }
            .edit-pen {
                margin-left: -10px;
                color: #40a0ac;
            }
            .dialog-footer {
                display: flex;
                flex-direction: row;
                padding-left: 20px;
                margin-left: -20px;
                border-top: 1px solid #3d3f43;
                margin-top: 60px;

                .el-button {
                    margin: 20px 10px 20px 0;
                    align-items: center;
                    flex-shrink: 0;
                }
            }
            .el-input__inner {
                display: inline-block;
                height: 30px;
                line-height: 30px;
            }
            .key-input {
                width: 80px;
            }
            $parimary: #2d3034;
            .el-tabs--card > .el-tabs__header .el-tabs__nav {
                border: none;
                border-radius: none;
                background-color: #313438;
                &::after {
                    content: "";
                    height: 20px;
                    position: absolute;
                    background: #3d3f43;
                    left: 70px;
                    width: 1px;
                    top: 10px;
                }
            }
            .el-tabs--card
                > .el-tabs__header
                .el-tabs__nav
                .el-tabs__item:not(:first-child) {
                background-color: #313438;
            }
            .el-tabs__item.is-active {
                color: #41a4b0;
                background-color: #313438;
            }
            .el-tabs--card > .el-tabs__header .el-tabs__item {
                border: none;
                background-color: #313438;
            }
            .el-tabs__item {
                /* margin-left: -20px; */
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #a0a3a8;
            }
            .el-tabs__content {
                background: $parimary;
                padding-left: 20px;
            }
            .el-tabs__nav-scroll {
                padding-left: 20px;
            }
            .label-text {
                background: #1e292e;
                border-radius: 3px;
                display: inline-block;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #43a1ac;
                line-height: 14px;
                padding: 7px 10px;
                margin-right: 10px;
                margin-bottom: 5px;
            }
            .dialog-wrap {
                background-color: $parimary;
                position: absolute;
                top: 100px;
                left: -18px;
                width: 380px;
                z-index: 2000;
            }
            .dialog-header {
                padding: 0 20px;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #3d3f43;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-icon-close {
                    font-size: 20px;
                    color: #366f71;
                }
            }
            .dialog-title {
                font-family: PingFangSC-Light;
                font-size: 16px;
                color: #ffffff;
            }
            .dialog-content {
                background: $parimary;
                height: 400px;
                overflow: auto;
            }
            .key-text-wrap {
                display: flex;
                flex-wrap: wrap;
                .tootip {
                    &:hover {
                        cursor: pointer;
                    }
                    .el-button {
                        border-radius: 3px;
                        height: 28px;
                        line-height: 22px;
                    }
                    width: 26px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    background: #1e292e;
                    border-radius: 3px;
                    margin-left: 6px;
                    .icon-shujuzhongxin-daoru:before {
                        font-size: 16px;
                    }
                }
                .el-button {
                    padding: 0 10px;
                    border-radius: 3px;
                    height: 28px;
                    line-height: 22px;
                }
                i {
                    color: #43a1ac;
                }
                span {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #d3d3d4;
                    letter-spacing: 0.44px;
                    line-height: 14px;
                }
            }
            .key-text {
                .el-input__inner {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                }
                i {
                    margin-left: 4px;
                }
                background: #1e292e;
                border-radius: 3px;

                margin-right: 10px;
                padding: 6px 10px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
                margin-bottom: 10px;
            }
        }
    }
    .echart-desc{
        position: absolute;
        top: -53px;
        right: 0;
    }
</style>