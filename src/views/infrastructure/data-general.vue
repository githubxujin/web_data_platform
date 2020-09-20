<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="数据概况" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <data-general></data-general>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import DataGeneral from "@/components/DataGeneral/index.vue";
export default {
  components: {
    DataGeneral
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
