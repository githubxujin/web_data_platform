<template>
    <div class="table-wrap mt10">
        <div class="table-title">钢材价格-价格数据明细-网价</div>
        <el-tabs type="border-card">
            <el-tab-pane label="入库">
                <invertory-list />
            </el-tab-pane>
            <el-tab-pane label="销售">
                <sale-list />
            </el-tab-pane>
            <el-tab-pane label="库存">
                <storage-list />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import InvertoryList from "@/components/Inventory/index";
import SaleList from "@/components/Inventory/sale-list";
import StorageList from "@/components/Inventory/storage-list";
export default {
  components: {
    InvertoryList,
    SaleList,
    StorageList
  },
  data() {
    return {
      params: {},
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>


