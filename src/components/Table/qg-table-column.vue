<template>
    <div :class="this.column">
        <div class="qg-label" :style="{width: `${this.width}px`}">
            <span v-if="required">*</span>
            {{ this.label }}
        </div>
        <div :class="[more && form? 'qg-form' : 'qg-value']">
            <div v-if="more" :style="`width: ${getColumnWidth}px`">
                <slot></slot>
            </div>
            <div v-else-if="!(realWidth($slots.default[0].text.length)*11 > getWidth) ">
                <div v-if="$slots.default[0].text">
                    <slot></slot>
                </div>
                <div v-else>-</div>
            </div>

            <el-tooltip :content="$slots.default[0].text" placement="top" v-else>
                <el-button :style="{width: `${this.realWidth()}px`}">
                    <div v-if="$slots.default[0].text">
                        <slot></slot>
                    </div>
                    <div v-else>-</div>

                </el-button>
            </el-tooltip>

        </div>
    </div>
</template>
<script>
import { parseWidth } from '@/config/utils';
export default {
    name: 'qg-table-column',
    props: {
        column: {
            type: String,
            default: 'qg-one'
        },
        width: String,
        label: String,
        more: {
            type: Boolean,
            default: false
        },
        form: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false
        }

    },

    computed: {
        getWidth () {
            switch (this.column) {
                case 'qg-one':
                    return '800';
                case 'qg-two':
                    return '360';
                case 'qg-three':
                    return '180';
                default:
                    return '800';
            }
        },

    },

    methods: {
        realWidth (width = this.getWidth) {
            return parseWidth(width);
        },
    },


};
</script>
<style lang="scss" scoped>
.dark {
    .qg-value .el-button {
        margin: 0;
        padding: 0;
        font-family: PingFangSC-Light;
        text-align: left;
        background: none;
        border: none;
        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: normal;
        }
        font-weight: normal;
        color: #d3d3d4;
        &:hover,
        &:focus {
            color: #d3d3d4;
        }
    }
}
.light {
    .qg-value .el-button {
        margin: 0;
        padding: 0;
        text-align: left;
        background: none;
        border: none;

        color: #666;
        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: normal;
        }
        &:hover,
        &:focus {
            color: #666;
        }
    }
}
.el-date-editor,
.el-select {
    width: 100% !important;
}
</style>
