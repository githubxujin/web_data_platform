<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="统计概况" name="first">
        <inventory-list />
      </el-tab-pane>
      <el-tab-pane label="数据明细" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import inventoryList from "@/components/DrugData/inventory-list";
export default {
  components: {
    inventoryList
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>