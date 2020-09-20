<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">项目数据编辑</div>
            <table class="table-public-detail">
                <tr>
                    <td>项目业主</td>
                    <td>
                        <el-input v-model="detailData.phone" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>项目类型</td>
                    <td>
                        <el-input v-model="detailData.phone" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>项目地址</td>
                    <td>
                        <el-input v-model="detailData.phone" clearable></el-input>
                    </td>
                </tr>
            </table>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="mt10 tootip-table">
                <!-- 项目基本信息 -->
                <el-tab-pane label="项目基本信息" name="first">
                    <div style="width:100%;height:30px;background-color: #232528;"></div>
                    <div class="tabs-title mb20">项目信息</div>
                    <table class="hl-table-list">
                        <tr>
                            <td>项目证照名</td>
                            <td>项目推广名</td>
                            <td>项目区位</td>
                            <td>项目业主</td>
                            <td>承建单位</td>
                            <td>承建单位组织机构代码/身份证号码</td>
                        </tr>
                        <tr>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>项目性质/类型</td>
                            <td>项目(计划)开工时间</td>
                            <td>项目(计划)竣工时间</td>
                            <td>立项批复时间</td>
                            <td>立项批复机关</td>
                            <td>建筑结构类型</td>
                        </tr>
                        <tr>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-select v-model="detailData.companyName" placeholder="" clearable style="width:100%;">
                                    <el-option label="是" value="是"></el-option>
                                    <el-option label="否" value="否"></el-option>
                                </el-select>
                            </td>
                        </tr>
                    </table>
                    <table class="table-public-detail mt20">
                        <tr>
                            <td>项目规模</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>项目用地规模</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>项目地址</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>资金来源</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                    </table>
                    <div class="tabs-title mt30 mb20">项目材料估算</div>
                    <table class="xl-table-list">
                        <tr>
                            <td></td>
                            <td>钢筋（公斤）</td>
                            <td>混凝土（方）</td>
                            <td>模板（平米）</td>
                            <td>木方（立方米）</td>
                        </tr>
                        <tr>
                            <td>项目整体</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>地下室结构</td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                            <td>
                                <el-input v-model="detailData.phone" clearable></el-input>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>

                <!-- 项目人员架构 -->
                <el-tab-pane label="项目人员架构" name="second">
                    <div style="width:100%;height:25px;background-color: #232528;"></div>
                    <div class="tabs-title mb20">
                        <span>建设单位人员信息</span>
                        <div>
                            <span class="el-icon-plus" @click="toAdd(1)"></span>
                            <span class="el-icon-minus" @click="toDel(1)"></span>
                        </div>
                    </div>
                    <el-table :data="list1" border class="tab-info">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="a" label="姓名" width="120" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.a" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="b" label="性别" width="90" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.b" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="c" label="手机号" width="160" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.c" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="d" label="所属部门" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.d" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="e" label="职位" width="180" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.e" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="f" label="办公电话" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.f" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="g" label="拜访地址" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.g" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="tabs-title mt30 mb20">
                        <span>承建单位人员信息</span>
                        <div>
                            <span class="el-icon-plus" @click="toAdd(2)"></span>
                            <span class="el-icon-minus" @click="toDel(2)"></span>
                        </div>
                    </div>
                    <el-table :data="list2" border class="tab-info">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="a" label="姓名" width="120" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.a" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="b" label="性别" width="90" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.b" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="c" label="手机号" width="160" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.c" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="d" label="所属部门" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.d" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="e" label="职位" width="180" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.e" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="f" label="办公电话" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.f" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="g" label="拜访地址" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.g" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="tabs-title mt30 mb20">
                        <span>监理人员信息</span>
                        <div>
                            <span class="el-icon-plus" @click="toAdd(3)"></span>
                            <span class="el-icon-minus" @click="toDel(3)"></span>
                        </div>
                    </div>
                    <el-table :data="list3" border class="tab-info">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="a" label="姓名" width="120" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.a" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="b" label="性别" width="90" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.b" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="c" label="手机号" width="160" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.c" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="d" label="所属部门" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.d" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="e" label="职位" width="180" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.e" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="f" label="办公电话" width="150" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.f" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="g" label="拜访地址" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.g" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <!-- 项目证照信息 -->
                <el-tab-pane label="项目证照信息" name="thrid">
                    <!-- 房建项目证照信息 -->
                    <room-compile v-if="false"></room-compile>
                    <!-- 基建项目证照信息 -->
                    <infrastructure-compile v-else></infrastructure-compile>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
    data () {
        return {
            activeName: 'first',
            companyName: '',
            detailData: {
                id: 41, // 主键id
                companyName: '', // 企业名称
                phone: '', // 企业电话
                email: '', // 企业邮箱
                address: '', // 企业地址
                companyType: '', // 企业类型
                businessNature: '', // 企业性质
                qualification: '', // 企业资质
                mainBussiness: '', // 主营材料/劳务
                customerReg: '', // 客户登记
                financeWill: '', // 融资意愿预测
                businessScope: '' // 经营范围
            },
            list: [],
            list1: [],
            list2: [],
            list3: []
        }
    },
    created () {
    },
    methods: {
        handleClick () { },
        toAdd (n) {
            if (n === 1) {
                this.list1.push(
                    {
                        a: "",
                        b: "",
                        c: "",
                        d: "",
                        e: "",
                        f: "",
                        g: "",
                    }
                )
            } else if (n === 2) {
                this.list2.push(
                    {
                        a: "",
                        b: "",
                        c: "",
                        d: "",
                        e: "",
                        f: "",
                        g: "",
                    }
                )
            } else {
                this.list3.push(
                    {
                        a: "",
                        b: "",
                        c: "",
                        d: "",
                        e: "",
                        f: "",
                        g: "",
                    }
                )
            }
        },
        toDel (n) {
            if (n === 1) {
                if (this.list1.length > 0) {
                    this.list1.splice(this.list1.length - 1, 1)
                }
            } else if (n === 2) {
                if (this.list2.length > 0) {
                    this.list2.splice(this.list2.length - 1, 1)
                }
            } else {
                if (this.list3.length > 0) {
                    this.list3.splice(this.list3.length - 1, 1)
                }
            }
        }
    },
    components: {
        'room-compile': () => import('./components/roomCompile'),
        'infrastructure-compile': () => import('./components/infrastructureCompile')
    }
}
</script>
<style lang="scss" scoped>
.tootip-table {
    // /deep/ .el-button {
    //     background: none;
    //     color: #d3d3d4;
    //     border: none;
    //     width: 128px;
    //     white-space: nowrap;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     height: auto;
    //     padding: 0;
    // }
}
.stat {
    width: 1360px;
    margin: 0 auto;
}
.tabs-title {
    color: #43a1ac;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Light;
    font-size: 14px;
    div {
        padding-right: 20px;
        span {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border: 1px solid #366f71;
            border-radius: 2px;
            font-size: 14px;
            cursor: pointer;
            &:last-child {
                margin-left: 10px;
            }
        }
    }
}
/deep/ .tab-info {
    border: 1px solid #54575c;
    // tr:last-child {
    //     td {
    //        border-bottom: 0;
    //     }
    // }
    th {
        color: #a0a3a8;
        border-right: 1px solid #54575c;
        font-weight: normal;
    }
    th.is-leaf {
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        font-weight: normal;
        border-bottom: 1px solid #54575c;
        border-right: 1px solid #54575c;
    }
}
/deep/ .el-tabs__header {
    margin-top: 30px;
}
.xl-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(1) {
            background: #292b2f;
        }
        &:last-child {
            td {
                color: #d3d3d4;
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: #d3d3d4;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
        /deep/ .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
    }
}
// 横向tab
.hl-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(odd) {
            background: #292b2f;
        }
        &:nth-child(even) {
            td {
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
            }
        }
        &:last-child {
            td {
                color: #d3d3d4;
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: #d3d3d4;
        padding: 17px 15px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
        /deep/ .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
    }
}
.active {
    color: #43a1ac;
}
</style>
