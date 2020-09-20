<template>
  <div>
    <el-input @blur="getQf" @focus="setQf" v-model="currentValue" clearable :maxlength="16" @clear="getQf" :size="size">
        <span slot="append" v-if="type === 'percent'">%</span>
        <span slot="append" v-if="type === 'money'">元</span>
    </el-input>
  </div>
</template>
<script>
export default {
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    props: {
        value: [String, Number],
        size: [String],
        type: [String]
    },
    data() {
        return {
            currentValue: '',
            first: true
        }
    },
    mounted() {
        this.currentValue = String(this.value) ? this.setFun(this.value) : ''
    },
    watch: {
        value() {
            this.currentValue = String(this.value) ? this.setFun(this.value) : ''
        }
    },
    methods: {
        setFun(val) {
            let value = parseFloat(val)
            isNaN(value) && (value = '')
            return this.numFormat(value)
        },
        getQf() {
            let value = ''
            if (!isNaN(parseFloat(this.currentValue))) {
                value = parseFloat(this.currentValue)
            }
            this.$emit('changeValue', this.getTwoNumber(value))
            this.$emit('valueChange', this.getTwoNumber(value))
            this.currentValue = this.numFormat(value)
        },
        setQf() {
            var oldValue = String(this.currentValue).replace(/,/g, '');
            if (oldValue.indexOf(".") > 0) {
                oldValue = oldValue.replace(/0+?$/, "");
                oldValue = oldValue.replace(/[.]$/, "");
            }
            this.currentValue = oldValue
        },
        getTwoNumber(val) {
            if (val === '' || val == 0) {
                return val
            } else {
                let num = String(val)
                if (num.includes('.')) {
                    num = num.substring(0, num.lastIndexOf('.') + 3)
                }
                return num
            }
        }
    }
}
</script>

