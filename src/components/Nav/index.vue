<template>
    <div class="nav-wrap">
        <div class="nav">
            <div class="el-btn-back" @click="$router.back()"><i class="iconfont icon-fanhui"></i>返回</div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="item.path">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

