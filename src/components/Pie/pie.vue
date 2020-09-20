<template>
    <div>
        <chart :height="height" :width="width" :option="opt" :id="id" :hover="true" :dispatchAction="true" />
    </div>
</template>
<script>
import Chart from "@/components/Charts/invoiceInvalid.vue";
// import pie from "@/utils/echart/pie/pie";
// import { deepClone } from "@/utils/common"
export default {
    props: {
        opt: {
            type: Object,
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
        },
        id: {
            type: String,
            default: 'pie'
        },

    },
    components: {
        Chart
    },
};
</script>