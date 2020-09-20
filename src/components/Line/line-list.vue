<template>
    <div>
        <chart :height="height" :width="width" :id="id" :option="opt" />
    </div>
</template>
<script>
import Chart from "@/components/Charts/invoiceInvalid"
// import line from "@/utils/echart/line/line-list.js"
// import { deepClone } from "@/utils/common"
export default {
    props: {
        opt: {
            type: Object,

        },
        width: {
            type: String,
            default: '871px'
        },
        height: {
            type: String,
            default: '500PX'
        },
        id: {
            type: String,
            default: 'line-list'
        }
    },
    components: {
        Chart
    },
};
</script>