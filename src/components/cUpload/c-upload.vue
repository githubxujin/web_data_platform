<script>
export default {
    props: {
        value: [Array, Object, FileList],
        success: Function,
        beforeFileHand: Function,
        accept: {
            type: String,
            default: '.'
        },
        multiple: {
            type: [String, Boolean],
            default: 'multiple'
        },
        type: {
            type: String,
            default: 'primary'
        },
        size: String,
        plain: Boolean,
        round: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {}
    },
    methods: {
        /* 上传文件 */
        async changeFile (ev) {
            const files = ev.target.files
            if (!files) return
            this.$emit('input', files)
            this.$emit('changehand', files)
            this.success && this.success(files)
        },
        handleClick () {
            /*
                上传前事件
             */
            if (this.beforeFileHand && !this.beforeFileHand()) {
                return
            }
            if (!this.disabled) {
                this.$refs.input.value = null
                this.$refs.input.click()
            }
        }
    },
    render () {
        const data = {
            attrs: {
                type: this.type,
                disabled: this.disabled,
                plain: this.plain,
                size: this.size
            },
            class: {
                // 'is-plain': this.isPlain
            },
            on: {
                click: this.handleClick
            }
        }



        if (this.multiple) {
            return (
                <div class="c-upload">

                    <el-button {...data} type="primary">
                        <i class="iconfont icon-tongyong-daochutubiao"></i>
                        {this.$slots.default}
                    </el-button>
                    <input type="file" multiple={this.multiple} ref="input" accept={this.accept} on-change={this.changeFile} style="display:none;" />
                </div>
            )
        }

        return (
            <div class="c-upload">
                <el-button {...data} type="primary">
                    <i class="iconfont icon-tongyong-daochutubiao"></i>
                    {this.$slots.default}
                </el-button>
                <input type="file" ref="input" accept={this.accept} on-change={this.changeFile} style="display:none;" />
            </div>
        )
    }
}
</script>
<style lang="css" scoped>
.c-upload {
    display: inline-block;
}
.el-button + .c-upload {
    margin-left: 10px;
}
</style>
