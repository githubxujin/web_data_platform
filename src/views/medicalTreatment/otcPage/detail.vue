<template>
    <div class="table-wrap mt15 mb30">
        <qg-table :title="detailData.drugName" subtitle="基本信息" >
            <qg-table-column v-for="(item,index) in tablelist" :label="item.name" :key="index" :column="item.column">
              {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="药物详情" class="mt20">
            <qg-table-column v-for="(item,index) in tablelistTwo" :label="item.name" :key="index" :column="item.column">
              {{item.value}}
            </qg-table-column>
        </qg-table>        

    </div>
</template>
<script>
export default {
    mounted(){
        this.detailData = JSON.parse(this.$route.query.detail);
        this.tablelist=[
               {name:'药品名称' ,value:this.detailData.drugName,column:'qg-two'},
               {name:'公告名称',value:this.detailData.drugName,column:'qg-two'},
               {name:'现用通用名',value:this.detailData.drugName,column:'qg-two'},
               {name:'分类',value:this.detailData.classification,column:'qg-two'},
               {name:'规格/剂型',value:this.detailData.dosageForm,column:'qg-two'},
               {name:'药品类型',value:this.detailData.category,column:'qg-two'},
               {name:'治疗领域',value:this.detailData.treatmentCategories},
               {name:'是否双跨',value:this.detailData.system},
        ];
        this.tablelistTwo = [
               {name:'公告通知',value:this.detailData.approvalNumber},   
            //    {name:'公告发布时间',value:''},   
            //    {name:'发布文件链接',value:''}, 
        ]
    },
    data() {
        return {
            detailData:{},
            tablelist:[],
            tablelistTwo:[],
        }
    },
}
</script>
