<template>
    <div class="mt20">
        <list :channel="['中铁鲁班商务网']" title="中国中铁中标数据" />
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