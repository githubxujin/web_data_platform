
<template>
    <div class="address-box">
        <el-cascader :props="config" v-model="areas" :options="options" @change="v => $emit('callback',v)" clearable>
        </el-cascader>
    </div>
</template>
<script>
/*
    demo:
        <cAddress :value="areas" v-on:callback="v => areas = v"></cAddress>
*/
export default {
    props: {
        value: Array
    },
    data() {
        return {
            options: [],
            config: {
                value: "name",
                label: "name",
                children: "children",
                multiple: true
            },
            areas: []
        };
    },
    watch: {
        value(v) {
            this.areas = v;
        }
    },
    created() {
        this.getAddress();
        this.areas = this.value;
    },
    methods: {
        getAddress() {
            this.options = require("./pac-code.json");

            // 去除地区级
            this.options.map(v => {
                v.children.map(c => {
                    delete c.children;
                });
            });
        }
    }
};
</script>
