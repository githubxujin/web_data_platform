import Vue from 'vue';
const bus = new Vue({
    data() {
        return {
            searchParams: {}
        }
    },
    created() {
        this.$on('setParams', val => {
            // this.searchParams[type] = val
            // this.$set(this.searchParams, val.type, val)
        })
        this.$on('clearParams', val => {
            this.searchParams[val] = {}
        })
    },
    methods: {
        getParams(type) {
            return this.searchParams[type] || {}
        },
        saveParams(type, val) {
            this.searchParams[type] = val
        },
        clearParams(type) {
            this.searchParams[type] = {}
        }
    }
});
export default bus;