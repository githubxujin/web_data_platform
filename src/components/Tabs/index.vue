<template>
    <div>
        <ul>
            <li v-for="(item, index) in  tabs" :key="index" @click="changeTab(index)" :class="{active: item.active}">
                <div class="c-tag-db"> {{ item.value}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        tabList: Array,
        default: [],
        tabIndex: Number
    },
    data() {
        return {
            tabs: []
        };
    },
    mounted() {
        this.tabs = this.tabList.map((tab, index) => {
            if (index === this.tabIndex) {
                return {
                    active: true,
                    value: tab
                };
            } else {
                return {
                    active: false,
                    value: tab
                };
            }
        });
    },
    methods: {
        changeTab(i) {
            this.tabs.forEach((tab, index) => {
                if (index === i) {
                    this.$emit("success", tab.value);
                    //     return {
                    //         active: true,
                    //         value: tab.value
                    //     };
                    // } else {
                    //     return {
                    //         active: false,
                    //         value: tab.value
                    //     };
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
ul {
    margin: 0;
    padding: 0;
    text-align: left;
    display: flex;
    border-bottom: 2px solid #253e9a;
    margin-bottom: 20px;
    height: 35px;
}

ul li {
    cursor: pointer;
    list-style: none;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-left: -16px;
}

li:first-child {
    background: url("~@/assets/images/tabs/tabx.png"),
        url("~@/assets/images/tabs/tabr.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
    margin-left: 0;
}

li {
    background: url("~@/assets/images/tabs/tabl.png"),
        url("~@/assets/images/tabs/tabr.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}

.c-tag-db {
    margin: 0 32px;
    padding: 0 12px;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.62px;
    text-align: center;
    height: 36px;
    line-height: 36px;
    background-image: url("~@/assets/images/tabs/tab-m.png");
    background-repeat: repeat-x;
}

li:last-child {
    background: url("~@/assets/images/tabs/tabl.png"),
        url("~@/assets/images/tabs/tab-x-r.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}

li.active:first-child {
    background: url("~@/assets/images/tabs/activex.png"),
        url("~@/assets/images/tabs/activer.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}

li:last-child {
    background: url("~@/assets/images/tabs/tabl.png"),
        url("~@/assets/images/tabs/tab-x-r.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}

li.active .c-tag-db {
    margin: 0 32px;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.62px;
    text-align: center;
    height: 36px;
    line-height: 36px;
    background-image: url("~@/assets/images/tabs/activem.png");
    background-repeat: repeat-x;
}

li.active {
    background: url("~@/assets/images/tabs/activel.png"),
        url("~@/assets/images/tabs/activer.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}

li.active:last-child {
    background: url("~@/assets/images/tabs/activel.png"),
        url("~@/assets/images/tabs/active-x-r.png");
    background-repeat: no-repeat, no-repeat;
    background-position: left top, right top;
}
</style>