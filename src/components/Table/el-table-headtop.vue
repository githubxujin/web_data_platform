<template>
    <div id="el_table_han">
        <div class="n-title" v-if="title">{{ title }}</div>
        <div class="n-subtitle" @click="rowStyle">{{ subtitle }}</div>
        <el-table
            :class="[align === 'left' ? 'n-table-left' : '']"
            :data="tableData"
            border
            :header-cell-style="headerCellStyle"
            :row-style="rowStyle"
            :cell-style="rowStyle"
        >
            <el-table-column
                v-for="(item, index) in tableHead"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
            >
            </el-table-column>

            <!-- <el-table-column prop="shareholder" label="股东" width="226px">
      </el-table-column>
      <el-table-column prop="shareholderType" label="股东类型" width="138">
      </el-table-column>
      <el-table-column prop="pay" label="认缴额（万元）" width="184">
      </el-table-column>
      <el-table-column prop="payWay" label="认缴出资方式" width="184">
      </el-table-column>
      <el-table-column prop="payDate" label="认缴出资日期" width="184">
      </el-table-column>
      <el-table-column prop="payFinish" label="实缴额（万元）" width="184">
      </el-table-column>
      <el-table-column prop="payRatio" label="持股比" width="184">
      </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
        tableHead: Array,
        title: String,
        subtitle: String,
        align: String
    },
    data() {
        return {};
    },
    methods: {
        headerCellStyle() {
            return {
                backgroundColor: "#292B2F",
                color: "#A0A3A8",
                textAlign: this.align
            };
        },
        rowStyle() {
            let align = {
                backgroundColor: "transparent",
                color: "#D3D3D4",
                textAlign: this.align
            };
            return align;
        }
    }
};
</script>

<style lang="less" scoped>
.el-table {
    border: 1px solid #54575c;
}
.n-subtitle {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
    margin-bottom: 20px;
}
.n-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    margin-bottom: 20px;
}
</style>
