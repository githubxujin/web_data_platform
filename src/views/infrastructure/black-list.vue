<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="承建单位黑白灰名单" name="first">
                <black-list></black-list>
            </el-tab-pane>
            <el-tab-pane label="承建单位账号黑白名单" name="second">
                2
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import BlackList from "@/components/BlackList/black-list";
export default {
  components: {
    BlackList
  }
};
</script>
