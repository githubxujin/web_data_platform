   <template>
    <!-- 被执行人主页 -->
    <div class="table-wrap">
        <div class="table-title">失信被执行人库</div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="被执行人" name="first">
                <enfor-person v-if="activeName==='first'" />
            </el-tab-pane>
            <el-tab-pane label="失信被执行人" name="second">
                <enfor-person-detail v-if="activeName==='second'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import enforPerson from "./enforPersonMessage/enforPerson.vue";
import enforPersonDetail from "./enforPersonMessage/enforPersonDetail.vue";
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        enforPerson,
        enforPersonDetail
    },
    data () {
        return {
            activeName: "first"
        };
    },
    created () {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        },
        // 导出（字段是export,该方法是发送请求）
        toExport () {
            this.$http("/dcp/yzw/bid/detail/export", this.params, {
                type: "export"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.formBox {
    display: flex;
    align-items: center;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
</style>
