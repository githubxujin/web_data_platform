<template>
    <div class="table-wrap we-template mt20">
        <div class="content-top">
            <div class="template-name" v-if="edit">{{templateName}} <i class="iconfont  icon-bianji" @click="editTemplate()"></i></div>
            <div v-else class="template-name">
                <el-input v-model="templateName" @blur="blurEdit" clearable ref="templateName"></el-input>
            </div>
            <el-select v-model="value" placeholder="请选择" class="type" multiple collapse-tags style="300px" @change="addTemplate">
                <el-option v-for="(item,index) in templateList" :key="index" :label="item.desc" :value="item.name">
                </el-option>
            </el-select>
            <div class="btn-wrap">
                <el-button type="primary" @click="toSave">保存</el-button>
                <el-button type="danger" @click="toReset">清空</el-button>
            </div>
        </div>
        <div class="el-20"></div>
        <div class="content-bottom">
            <div class="content-bottom-wrap">
                <div class="content-bottom-box" v-for="(item,index) in Object.keys(templateObj)" :key="index">
                    <div class="template-box">
                        <div class="template-index">{{index+1}}</div>
                        <div class="template-text">{{translation(templateObj[item].configName)}}</div>
                    </div>
                    <el-select v-model="templateObj[item].configSymbol" placeholder="请选择" class="select-num">
                        <el-option v-for="i in configObj[item]" :key="i" :label="i" :value="i">
                        </el-option>
                    </el-select>
                    <el-select v-model="templateObj[item].configValue" placeholder="请选择" multiple collapse-tags class="select-op-count" v-if="item==='material'">
                        <el-option v-for="i in materialList" :key="i" :label="i.name" :value="i.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="templateObj[item].configValue" placeholder="请选择" multiple collapse-tags class="select-op-count" v-else-if="item==='projectType'">
                        <el-option v-for="i in projectTypeList" :key="i" :label="i.name" :value="i.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="templateObj[item].configValue" placeholder="请选择" class="select-op-count" v-else-if="item==='businessStatus'">
                        <el-option label="正常" value="正常"></el-option>
                        <el-option label="异常" value="异常"></el-option>
                    </el-select>
                    <el-select v-model="templateObj[item].configValue" placeholder="请选择" class="select-op-count" v-else-if="item==='tenderee'">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="白名单" value="白名单"></el-option>
                    </el-select>
                    <el-cascader v-model="templateObj[item].configValue" :options="city" placeholder="所在地区" collapse-tags class="select-op-city" clearable
                        :props="{ expandTrigger: 'hover', checkStrictly: false,multiple: true   }" @change="((i)=>{ handleChange(i,item )})" v-else-if="item==='projectProvince'" :show-all-levels="false">
                    </el-cascader>
                    <el-date-picker v-model="templateObj[item].configValue" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-else-if="item==='recentBidDate'" class="select-op-count">
                    </el-date-picker>
                    <el-input-number v-model="templateObj[item].configValue" :step="1" :min="0" class="select-count" v-else-if="item==='executedDishonest'"></el-input-number>
                    <el-input-number v-model="templateObj[item].configValue" :step="1" :min="1" class="select-count" v-else></el-input-number>
                    <el-tooltip class='item' effect='dark' content='删除' placement='top'>
                        <i class="iconfont icon-shujuzhongxinv41-shanchu" @click="toDel(item)"></i>
                    </el-tooltip>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="scss" >
.light {
    .we-template {
        .el-icon-minus,
        .el-icon-plus {
            color: #fff;
        }

        .el-input__inner {
            color: #666;
        }
        .iconfont {
            &:hover {
                cursor: pointer;
            }
        }
        .select-op-city {
            width: 206px;
            height: 35px;
            line-height: 35px;
            margin-top: 20px;
        }
        .select-op-count {
            width: 206px;
        }
        .el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled),
        .el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
            border: 1px solid #2d5052;
        }
        .el-input-number__decrease:hover,
        .el-input-number__increase:hover {
            color: #2d5052;
        }

        .icon-shujuzhongxinv41-shanchu {
            color: #bb4d31;
            margin-left: 20px;
            height: 20px;
            line-height: 20px;
            margin-top: 28px;
        }

        .content-top {
            height: 96px;
            display: flex;
            line-height: 96px;
        }
        .template-name {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666;
            letter-spacing: 0.5px;
            margin: 0 0 0 42px;
            .iconfont {
                color: #4064d4;
            }
        }
        .type {
            width: 220px;
            margin: 0 20px 0 40px;
        }
        .content-bottom {
            .content-bottom-box {
                border-bottom: 1px solid #d2d9e5;
                flex-basis: 50%;
                display: flex;
                height: 80px;
                line-height: 80px;
                &:nth-last-child(1),
                &:nth-last-child(2) {
                    border: none;
                }

                .template-box {
                    font-size: 14px;
                    color: #666;
                    width: 228px;
                }
                .template-text {
                    margin-left: 20px;
                    width: 200px;
                }
            }
            .content-bottom-wrap {
                width: 1300px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;

                .template-box {
                    display: flex;
                    justify-content: space-between;
                }
                .select-num {
                    width: 100px;
                    margin-right: 10px;
                }
                .select-count {
                    width: 206px;
                    margin-top: 20px;
                }
            }
        }

        .el-input-number__decrease,
        .el-input-number__increase {
            background: #4064d4;
            border: 1px solid #4064d4;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: normal;
            border-radius: inherit;
            top: 7px;
        }
        .el-input-number__decrease {
            left: 15px;
        }
        .el-input-number__increase {
            right: 15px;
        }
        .el-tag.el-tag--info .el-tag__close {
            background: #4064d4;
        }
        .el-input-number__decrease,
        .el-input-number__increase {
            background: #4064d4;
            border: 1px solid #4064d4;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: inherit;
        }
        .el-tooltip__popper.is-dark {
            top: 225px !important;
        }
    }
}
.dark {
    .we-template {
        .el-icon-minus,
        .el-icon-plus {
            color: #366f71;
        }

        .el-input__inner {
            color: #ffffff;
        }
        .iconfont {
            &:hover {
                cursor: pointer;
            }
        }
        .select-op-city {
            width: 206px;
            height: 35px;
            line-height: 35px;
            margin-top: 20px;
        }
        .select-op-count {
            width: 206px;
        }
        .el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled),
        .el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
            background: #1d1e23;
            border: 1px solid #2d5052;
        }
        .el-input-number__decrease:hover,
        .el-input-number__increase:hover {
            color: #2d5052;
        }

        .icon-shujuzhongxinv41-shanchu {
            color: #bb4d31;
            margin-left: 20px;
            height: 20px;
            line-height: 20px;
            margin-top: 28px;
        }
        .template-name {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0.5px;
            margin: 0 0 0 42px;
            .iconfont {
                color: #43a1ac;
            }
        }
        .content-top {
            height: 96px;
            display: flex;
            line-height: 96px;
        }

        .type {
            width: 220px;
            margin: 0 20px 0 40px;
        }
        .content-bottom {
            background: #232528;
            .content-bottom-box {
                border-bottom: 1px solid #2e3236;
                flex-basis: 50%;
                display: flex;
                height: 80px;
                line-height: 80px;
                &:nth-last-child(1),
                &:nth-last-child(2) {
                    border: none;
                }

                .template-box {
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #d3d3d4;
                    width: 228px;
                }
                .template-text {
                    margin-left: 20px;
                    width: 200px;
                }
            }
            .content-bottom-wrap {
                width: 1300px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;

                .template-box {
                    display: flex;
                    justify-content: space-between;
                }
                .select-num {
                    /* margin-left: 98px; */
                    width: 100px;
                    margin-right: 10px;
                }
                .select-count {
                    /* margin-left: 10px; */
                    width: 206px;
                    margin-top: 20px;
                }
            }
        }

        .el-input-number__decrease,
        .el-input-number__increase {
            background: #232528;
            border: 1px solid #366f71;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: normal;
            border-radius: inherit;
            top: 7px;
            /* left: 10px; */
        }
        .el-input-number__decrease {
            left: 15px;
        }
        .el-input-number__increase {
            right: 15px;
        }

        .el-input-number__decrease,
        .el-input-number__increase {
            background: #232528;
            border: 1px solid #366f71;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: inherit;
        }
        .el-tooltip__popper.is-dark {
            top: 225px !important;
        }
    }
}
</style>
<script>
import { materialList, projectTypeList } from "@/utils/common"
import city from '@/views/industryTrade/config/city1.js'
export default {
    components: {},
    data () {
        return {
            city,
            materialList,
            projectTypeList,
            templateList: [],
            templateName: '模板名称',
            edit: true,
            value: [],
            templateObj: {},
            configObj: {},
            selected: []

        };
    },
    created () {
        this.show()
        this.getOpt()
    },
    methods: {
        toReset () {
            Object.keys(this.templateObj).map(key => {
                this.$set(this.templateObj, key, { templateName: this.templateName, configName: this.templateObj[key].configName, configSymbol: "", configValue: "", orderNumber: this.templateObj[key].orderNumber })
            })
        },
        toDel (item) {
            this.$delete(this.templateObj, item)
            let index = this.value.findIndex((i) => i === item);
            if (index !== -1) {
                this.value.splice(index, 1)
            }
        },
        show () {
            console.log(this.$route)
            let { templateId } = this.$route.query
            console.log(templateId, 'templateId')
            this.$http(`/dcp/query/stat/template/detail/${templateId}`, {}, { type: 'get' }).then(res => {
                console.log('res', res);
                this.templateName = res.data.templateName
                this.value = res.data.configs.map(i => i.configName)
                this.selected = res.data.configs.map(i => i.configName)
                res.data.configs.map(i => {

                    if (i.configName === 'projectProvince') {
                        this.$set(this.templateObj, i.configName,
                            {
                                templateName: this.templateName,
                                configName: i.configName,
                                configSymbol: i.configSymbol,
                                configValue: i.configValue.map(item => item.split('-')),
                                orderNumber: i.orderNumber
                            })

                    } else if (i.configName === "material" || i.configName === "projectType") {
                        this.$set(this.templateObj, i.configName,
                            {
                                templateName: this.templateName,
                                configName: i.configName,
                                configSymbol: i.configSymbol,
                                configValue: i.configValue,
                                orderNumber: i.orderNumber
                            })
                    } else {
                        this.$set(this.templateObj, i.configName,
                            {
                                templateName: this.templateName,
                                configName: i.configName,
                                configSymbol: i.configSymbol,
                                configValue: i.configValue.toString(),
                                orderNumber: i.orderNumber
                            })
                    }
                })

            });
        },
        onChangeTemplateName () {

        },
        handleChange (val, label) {

            this.templateObj[label]
        },
        toSave () {
            let params = Object.values(this.templateObj)
            //检验是否通过configSymbol.el.configValue
            let isPass = params.some((el) => {
                console.log(el, 'el')
                return el.configSymbol === "" || el.configValue === "" || el.configValue.length === 0
            })
            if (isPass) {
                this.$message({ type: "warning", message: "请添写所有项" })
                return
            }

            let key
            params = params.map(i => {
                if (i.configName === 'projectProvince') {
                    key = i.configValue.map(item => {
                        console.log(item, 'item')
                        return {
                            item: item.join("-")
                        }
                    })
                    console.log(key, 'key')
                    return {
                        "templateId": this.$route.query.templateId,
                        "templateName": this.templateName, // 模板名称
                        "configName": i.configName, // 配置名称
                        "configSymbol": i.configSymbol, // 配置符号
                        "configValue": key.map(i => i.item), // 配置数据值
                        "orderNumber": i.orderNumber // 序号i.configValue
                    }
                } else {
                    return {
                        "templateId": this.$route.query.templateId,
                        "templateName": this.templateName, // 模板名称
                        "configName": i.configName, // 配置名称
                        "configSymbol": i.configSymbol, // 配置符号
                        "configValue": Array.isArray(i.configValue) ? i.configValue : [i.configValue], // 配置数据值
                        "orderNumber": i.orderNumber // 序号i.configValue
                    }
                }

            })


            console.log(params, 'params')

            this.$http('/dcp/update/stat/template', params).then(res => {
                if (res.code === "200") {
                    this.$router.push({ name: 'in-win-data' })
                }
            });
        },
        getOpt () {
            this.$http('/dcp/query/stat/template/config', {}, { type: 'get' }).then(res => {
                this.templateList = res.data
                res.data.map(i => {
                    this.$set(this.configObj, i.name, i.symbol)
                })
            });
        },
        translation (val) {
            let str = ""
            this.templateList.map(i => {
                if (i.name === val) {
                    str = i.desc
                }
            })
            return str;
        },
        editTemplate () {

            this.edit = false
            this.$nextTick(() => {
                this.$refs.templateName.focus()
            })
        },
        blurEdit () {

            this.edit = true
        },
        getArrDifference (arr1, arr2) {
            return arr1.concat(arr2).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
        },
        addTemplate (val) {
            let arr = this.getArrDifference(val, this.selected)
            if (this.selected.length > val.length) {
                arr.map(i => {
                    this.$delete(this.templateObj, i)
                })
            } else {
                val.map((i, index) => {
                    if (this.selected.length === 0) {
                        this.$set(this.templateObj, i, { templateName: this.templateName, configName: i, configSymbol: "", configValue: "", orderNumber: index + 1 })
                    } else {
                        arr.map(i => {

                            this.$set(this.templateObj, i, { templateName: this.templateName, configName: i, configSymbol: "", configValue: "", orderNumber: index + 1 })
                        })
                    }
                })
            }


            this.selected = val; // 选种植



        }
    }
};
</script>