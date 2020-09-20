<template>
    <div>
        <el-input @blur="getQf" @focus="setQf" v-model="currentValue" clearable :maxlength="16" @clear="getQf" :size="size" :disabled='disabled'>
            <template slot="append" v-if="hasSlot">{{appendContent}}</template>
        </el-input>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'value',
        event: 'changeValue'
    },
    props: {
        value: [String, Number],
        size: [String],
        appendContent: {
            default: '元'
        },
        hasSlot: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
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
            return this.moneyFormat(value)
        },
        moneyFormat(val, t) {
            if (parseFloat(val) === 0) return '0.00'
            if (!val) return ''
            let num = String(val)
            if (num.includes('.')) {
                let arr = (num + '000').split('.')
                num = arr[0] + '.' + arr[1].substring(0, 2)
            } else {
                num = num + '.00'
            }
            return t === false ? num : num.toString().replace(/\d+/, function (n) {
                return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                    return $1 + ','
                })
            })
        },
        getQf() {
            let value = ''
            if (!isNaN(parseFloat(this.currentValue))) {
                value = parseFloat(this.currentValue)
            }
            this.$emit('changeValue', this.getTwoNumber(value))
            this.$emit('blur', this.getTwoNumber(value))
            this.currentValue = this.moneyFormat(value)
        },
        setQf() {
            var oldValue = String(this.currentValue).replace(/,/g, '')
            if (oldValue.indexOf('.') > 0) {
                oldValue = oldValue.replace(/0+?$/, '')
                oldValue = oldValue.replace(/[.]$/, '')
            }
            this.currentValue = oldValue
        },
        getTwoNumber(val) {
            if (val === '' || val === 0) {
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

