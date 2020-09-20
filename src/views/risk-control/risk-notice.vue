<template>
    <div class="table-wrap">
        <risk-otification @passData="getData" v-if="isRisk === 0"></risk-otification>
        <new-temlate v-if="isRisk === 1" @toBack="getBack"></new-temlate>
        <redact-template :id="id" :isCode="isCode" v-if="isRisk === 2" @toBack="getBack"></redact-template>
    </div>
</template>
<script>
export default {
    components: {
        'risk-otification': () => import('@/views/industryTrends/riskNotification.vue'),
        'new-temlate': () => import('@/views/industryTrends/newTemplate.vue'),
        'redact-template': () => import('@/views/industryTrends/redactTemplate.vue')
    },
    data() {
        return {
            isRisk: 0,
            id: '',
            isCode: ''
        }
    },
    methods: {
        getData(v, id, isCode) {
            // console.log(v,id,num);
            this.isRisk = v
            this.id = id
            this.isCode = isCode
        },
        getBack(data) {
            // console.log('isRisk',data);
            this.isRisk = data
        }
    }
};
</script>