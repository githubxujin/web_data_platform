<template>
    <!-- 操作配置之器械库主页 -->
    <div class="instrument mt20">
        <instrument-detail-set />
    </div>
</template>
<script>
// import instrumentNum from "@/views/medicalTreatment/instrumentPage/instrumentNum";
import instrumentDetailSet from "@/views/medicalTreatment/instrumentPage/instrumentDetailSet.vue";
export default {
    components: {
        // instrumentNum,
        instrumentDetailSet
    },
    data () {
        return {};
    },
    methods: {},
    computed: {
        activeName: {
            get () {
                return this.$store.state.tabs.activeName;
            },
            set () { }
        }
    }
};
</script>
