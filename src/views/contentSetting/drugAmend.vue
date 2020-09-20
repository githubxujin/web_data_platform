<template>
    <div class="stat">
        <div class="table-wrap mt15 mb30">
            <h3 class="hos-detail">药品修改</h3>
            <div class="tabs-title mb20">药品基本情况</div>
            <table class="table-public-detail">
                <tr>
                    <td>药品名称</td>
                    <td>
                        <el-input v-model="params.drugName" clearable></el-input>
                    </td>
                    <td>产品类别</td>
                    <td>
                        <el-select v-model="params.drugType" placeholder="" clearable style="width:100%;">
                            <el-option label='辅料' value='辅料'></el-option>
                            <el-option label='化学药品' value='化学药品'></el-option>
                            <el-option label='生物制药' value='生物制药'></el-option>
                            <el-option label='中药' value='中药'></el-option>
                            <el-option label='其他' value='其他'></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>英文名称</td>
                    <td>
                        <el-input v-model="params.drugEnglishName" clearable></el-input>
                    </td>
                    <td>药品本位码</td>
                    <td>
                        <el-input v-model="params.drugCode" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>医保类别</td>
                    <td>
                        <el-select v-model="params.medicineInsuranceType" placeholder="" clearable style="width:100%;">
                            <el-option label='甲' value='甲'></el-option>
                            <el-option label='乙' value='乙'></el-option>
                            <el-option label='非医保' value='非医保'></el-option>
                        </el-select>
                    </td>
                    <td>药品规格</td>
                    <td>
                        <el-input v-model="params.drugSpec" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>剂型</td>
                    <td>
                        <el-select v-model="params.drugDosageform" placeholder="" clearable style="width:100%;">
                            <el-option v-for="(v,i) in dosageList" :key="i" :label='v' :value='v'></el-option>
                        </el-select>
                    </td>
                    <td>生产国家</td>
                    <td>
                        <el-select v-model="params.productionCountry" placeholder="" clearable style="width:100%;">
                            <el-option label="中国" value="中国"></el-option>
                            <el-option label="德国" value="德国"></el-option>
                            <el-option label="美国" value="美国"></el-option>
                            <el-option label="西班牙" value="西班牙"></el-option>
                            <el-option label="日本" value="日本"></el-option>
                            <el-option label="韩国" value="韩国"></el-option>
                            <el-option label="新加坡" value="新加坡"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>批准日期/发证日期</td>
                    <td>
                        <el-input v-model="params.approveDate" clearable></el-input>
                    </td>
                    <td>批准文号/注册证号</td>
                    <td>
                        <el-input v-model="params.approveNumber" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>原批准文号/注册证号</td>
                    <td>
                        <el-input v-model="params.orgApproveNumber" clearable></el-input>
                    </td>
                    <td>生产单位</td>
                    <td>
                        <el-input v-model="params.manufacture" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>生产地址</td>
                    <td class="cospan" colspan="3">
                        <el-input v-model="params.productionAddress" maxlength="252" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">带量采购情况</div>
            <table class="table-public-detail">
                <tr>
                    <td>带量采购</td>
                    <td class="cospan" colspan="3">
                        <el-select v-model='params.quantityPurchase' multiple clearable placeholder="" style="width:100%;">
                            <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">重点监控情况</div>
            <table class="table-public-detail">
                <tr>
                    <td>重点监控</td>
                    <td class="cospan" colspan="3">
                        <el-select v-model='params.keyMonitor' multiple clearable placeholder="" style="width:100%;">
                            <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">基本药物情况</div>
            <table class="table-public-detail">
                <tr>
                    <td>基本药物</td>
                    <td class="cospan" colspan="3">
                        <el-select v-model='params.basicDrug' multiple clearable placeholder="" style="width:100%;">
                            <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">仿评药情况</div>
            <table class="table-public-detail">
                <tr>
                    <td>仿评药</td>
                    <td class="cospan" colspan="3">
                        <el-select v-model='params.imitationDrug' clearable placeholder="" style="width:100%;">
                            <el-option label='是' value='是'></el-option>
                            <el-option label='否' value='否'></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="to-submit mt30">
                <el-button type="info" size="medium" @click="$router.push('/drugData')">取消</el-button>
                <el-button type="primary" size="medium" style="margin-left:40px;" @click="toSubmit">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import city from '@/views/infrastructure/config/city.js'
export default {
    data () {
        return {
            city,
            params: {},
            dosageList: []
        }
    },
    created () {
        this.getDosage()
        this.city = [...this.city]
        this.city.unshift({ name: '否' }, { name: '全国' })
        this.params = JSON.parse(decodeURIComponent(this.$route.params.row))
        // console.log('this.params',this.params);
    },
    methods: {
        // 获取剂型
        getDosage () {
            this.$http('/dcp/drug/dosage/form/list', {}, { type: 'get' }).then(res => {
                this.dosageList = res.data
            })
        },
        // 提交
        toSubmit () {
            let params = { ...this.params }
            if (params.quantityPurchase && params.quantityPurchase.length > 0) {
                params.quantityPurchase = params.quantityPurchase.toString()
            } else {
                params.quantityPurchase = ''
            }
            if (params.keyMonitor && params.keyMonitor.length > 0) {
                params.keyMonitor = params.keyMonitor.toString()
            } else {
                params.keyMonitor = ''
            }
            if (params.basicDrug && params.basicDrug.length > 0) {
                params.basicDrug = params.basicDrug.toString()
            } else {
                params.basicDrug = ''
            }
            this.$http('/dcp/drug/update', params).then(res => {
                if (res.code === '200') {
                    this.$message.success('修改成功')
                    this.$router.push('/drugData')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.hos-detail {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: normal;
    margin: 0 0 20px;
}

.txt-aligning {
    td {
        text-align: left;
    }
}

.to-submit {
    text-align: center;
}
</style>
