<template>
    <div class="mt20">
        <list :channel="['中国交建物资采购管理系统']" title="中国交建中标数据" />
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