<template>
    <div>
        <div class="qg-title" v-if="title">{{ title }}</div>
        <div class="qg-subtitle" v-if="subtitle">{{ subtitle }}</div>
        <div class="qg-table">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'qg-table',
    props: {
        title: String,
        subtitle: String,
    },
}

</script>
