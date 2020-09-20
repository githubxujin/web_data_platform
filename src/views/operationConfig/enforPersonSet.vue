<template>
    <div class="table-wrap mt20">
        <div class="table-title">失信被执行人库</div>
        <enfor-person-ele></enfor-person-ele>
    </div>
</template>
<script>
export default {
    components: {
        enforPersonEle: () => import("./components/enforPersonEle.vue")
    }
};
</script>
