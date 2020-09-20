<template>
    <div>
        <el-dialog title="短信内容" :visible.sync="$parent.dialogVisibleLookOver" width="680px" id="lookOver">
            <div class="content mb20">尊敬的客户，{{ content }}</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        dialogVisibleLookOver: Boolean
    },
    data () {
        return {
            content: ""
        };
    },
    created () { },
    methods: {}
};
</script>
<style lang="scss" scoped>
.dark {
    #lookOver {
        .content {
            line-height: 24px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 23px;
        }
    }
}

.light {
    #lookOver {
        .content {
            line-height: 24px;
            font-size: 14px;
            color: #666;
            line-height: 23px;
        }
    }
}
</style>
