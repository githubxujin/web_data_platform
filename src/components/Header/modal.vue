<template>
    <div>
        <el-dialog title="主题" width="600px" :visible.sync="$parent.dialogVisible">
            <el-table :data="list" border="">
                <el-table-column prop="title" align="center" width="160" />
                <el-table-column label="预览" align="center" width="200">
                    <template slot-scope='scope'>
                        <img :src="`${scope.row.preview}`" width="180" height="120" />
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="theme">
                    <template slot-scope="scope">
                        <el-button v-if="activeName === scope.row.theme" type="primary" icon="el-icon-check">已激活</el-button>
                        <el-button v-else @click="handleSelectTheme(scope.row.theme)" type="info">使用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>
<script>
import light from "@/assets/images/light/light.png"
import dark from "@/assets/images/light/dark.png"
export default {
    created () {

    },
    data () {
        return {
            activeName: localStorage.getItem('theme') || 'dark',
            list: [
                {
                    title: "浅色主题",
                    preview: light,
                    theme: 'light'
                },
                {
                    title: "深色主题",
                    preview: dark,
                    theme: 'dark'
                },
            ]
        }
    },
    methods: {
        handleSelectTheme (theme) {
            localStorage.setItem('theme', theme);
            this.$store.commit('THEME', theme);
            this.setSkin(theme)
        },
        toggleTheme (theme) {
            let el = document.body.classList[1];
            if (theme !== el) {
                document.body.className = theme
                this.activeName = theme
            }
            this.$parent.dialogVisible = false
        },
        setSkin (theme) {
            this.toggleTheme(theme);
        },
    },

};
</script>

<style lang="scss" scoped>
</style>