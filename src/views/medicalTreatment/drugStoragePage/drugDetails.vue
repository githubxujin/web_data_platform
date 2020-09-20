<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">
                {{params.drugName || '-'}}
            </div>
            <qg-table>
                <qg-table-column v-for="(item,index) in getRows()" :key="index" subtitle="药品基本情况" title="药品详情" width="160" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
            </qg-table>
            <div class="tabs-title mt20 mb20">带量采购情况</div>
            <qg-table>
                <qg-table-column width="157" label="带量采购">{{params.quantityPurchase }}</qg-table-column>
            </qg-table>
            <div class="tabs-title mt20 mb20">重点监控情况</div>
            <qg-table>
                <qg-table-column width="157" label="重点监控">{{params.keyMonitor }}</qg-table-column>
            </qg-table>

            <div class="tabs-title mt20 mb20">基本药物情况</div>
            <qg-table>
                <qg-table-column width="157" label="基本药物">{{params.basicDrug}}</qg-table-column>
            </qg-table>
            <div class="tabs-title mt20 mb20">仿评药情况</div>
            <qg-table>
                <qg-table-column width="157" label="仿评药">{{params.imitationDrug}}</qg-table-column>
            </qg-table>

            <div class="mt20" style="text-align:center;" v-if="$route.name === 'drugDataDetail'">
                <el-button type="primary" @click="toAmend">编辑</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            params: {
                id: "", //id
                drugType: "", //产品类型
                drugName: "", //药品名称
                drugEnglishName: "", //药品英文名称
                drugCode: "", //药品本位码
                medicineInsuranceType: "", //医保类型
                drugSpec: "", //药品规格
                drugDosageform: "", //剂型
                quantityPurchase: "", //带量采购
                keyMonitor: "", //重点监控
                basicDrug: "", //基本药物
                imitationDrug: "", //仿评药
                approveDate: "", //审批日期
                approveNumber: "", //批准文号
                orgApproveNumber: "", //原批准文号/注册
                manufacture: "", //制造商
                productionAddress: "", //生产地址
                productionCountry: "", //生产国家
                medicineLocalType: "",
                medicineLocal: "",
                monitorProvince: '',
                postingTime: '',
                regulatoryLevel: '',
                policyDoc: '',
                monitorArea: '',
            }
        };
    },
    created () {
        this.params = JSON.parse(decodeURIComponent(this.$route.params.row));
    },
    methods: {
        getRows () {
            return [
                { key: '药品名称', value: this.params.drugName, column: 'qg-two' },
                { key: '英文名称', value: this.params.drugEnglishName, column: 'qg-two' },
                { key: '产品类别', value: this.params.drugType, column: 'qg-two' },
                { key: '治疗领域', value: this.params.treatmentCategories, column: 'qg-two' },
                { key: '医保类别', value: this.params.medicineInsuranceType, column: 'qg-two' },
                { key: '医保范围', value: this.params.medicineInsuranceRange, column: 'qg-two' },
                { key: '药品规格', value: this.params.drugSpec, column: 'qg-two' },
                { key: '剂型', value: this.params.drugDosageform, column: 'qg-two' },
                { key: '批准日期', value: this.params.approveDate, column: 'qg-two' },
                { key: '批准文号', value: this.params.approveNumber, column: 'qg-two' },
                { key: '原批准文号', value: this.params.orgApproveNumber, column: 'qg-two' },
                { key: '药品本位码', value: this.params.drugCode, column: 'qg-two' },
                { key: '生产单位', value: this.params.manufacture, column: 'qg-two' },
                { key: '生产地址', value: this.params.productionAddress, column: 'qg-two' },
                { key: '生产国家', value: this.params.productionCountry, column: 'qg-two' },
                { key: '已上市品种数量', value: this.params.marketTypeNum, column: 'qg-two' },
                { key: '市占率前5药企(%)', value: this.params.topFive, },
                { key: "", value: " " }
            ];
        },
        getRows2 () {
            return [
                { key: '重点监控', value: this.params.keyMonitor, column: 'qg-two' },
                { key: '发文时间', value: this.params.postingTime, column: 'qg-two' },
                { key: '监管级别', value: this.params.regulatoryLevel, column: 'qg-two' },
                { key: '政策文件', value: this.params.policyDoc, column: 'qg-two' },
                { key: '省份', value: this.params.monitorProvince, column: 'qg-two' },
                { key: '地区或机构', value: this.params.monitorArea, column: 'qg-two' },
            ];
        },
        toAmend () {
            let params = { ...this.params };
            if (params.quantityPurchase.indexOf(",") === -1) {
                params.quantityPurchase = [params.quantityPurchase];
            } else {
                params.quantityPurchase = params.quantityPurchase.split(",");
            }
            if (params.keyMonitor.indexOf(",") === -1) {
                params.keyMonitor = [params.keyMonitor];
            } else {
                params.keyMonitor = params.keyMonitor.split(",");
            }
            if (params.basicDrug.indexOf(",") === -1) {
                params.basicDrug = [params.basicDrug];
            } else {
                params.basicDrug = params.basicDrug.split(",");
            }
            let row = encodeURIComponent(JSON.stringify(params));
            this.$router.push({ name: "drugDataAmend", params: { row } });
        }
    }
};
</script>
