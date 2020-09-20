<template>
    <div class="mt20">
        <list :channel="['中国铁建物资采购网', '铁建商城', '铁建汇采']" title="中国铁建中标数据" />
    </div>
</template>
<script>
import List from "@/components/Winning/in-winning-list.vue"
export default {
    components: {
        List
    },
    data () {
        return {
            activeName: 'second',
        };
    },

};
</script>