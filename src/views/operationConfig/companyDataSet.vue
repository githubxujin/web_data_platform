<template>
    <div class="drugIndustryData mt20">
        <company-data-number />
    </div>
</template>
<script>
import companyDataNumber from "./components/company-data-number.vue";
export default {
    components: {
        companyDataNumber
    },
    data () {
        return {
            params: {
                productType: ["地区"],
                money: [
                    "一般预算收入",
                    "基金预算收入",
                    "财政预算收入",
                    "人口数量(万人)",
                    "人均财政收入(元)"
                ]
            }
        };
    },
    methods: {},
    computed: {
        // 该状态数据用的其他的组件，该处不对，为了展示title临时使用
        activeName: {
            get () {
                return this.$store.state.tabs.activeName;
            },
            set () { }
        }
    }
};
</script>

<style lang="scss" scoped>
.formBox {
    display: flex;

    .doc-box {
        padding-top: 30px;
        box-sizing: border-box;
        margin-right: 10px;
    }
}
</style>
