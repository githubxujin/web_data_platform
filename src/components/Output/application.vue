<template>
    <div class="table-wrap qg-menu">
        <div class="content-wrap ">
            <div class="content-left">

                <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false" :show-timeout="600" :hide-timeout="600">
                    <el-menu-item index="2">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-hangyequshi i-show': 'i-hide']"></i>
                        <span slot="title">行业趋势</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i :class="[isCollapse ? 'iconfont  icon-shujuzhongxinv41-kaipiaorelitu i-show': 'i-hide']"></i>
                        <span slot="title">开票热力图</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-xiayourelitu i-show': 'i-hide']"></i>
                        <span slot="title">下游热力图</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-hexinqiyefenxi i-show': 'i-hide']"></i>
                        <span slot="title">核心企业分析</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-shouzhiyujing i-show': 'i-hide']"></i>
                        <span slot="title">收支预警</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-zuofeiyujing i-show': 'i-hide']"></i>
                        <span slot="title">作废预警</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-chonghongyujing  i-show': 'i-hide']"></i>
                        <span slot="title">冲红预警</span>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-zhuanpiaofenxi i-show': 'i-hide']"></i>
                        <span slot="title">专票分析</span>
                    </el-menu-item>
                    <el-menu-item index="10">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-xinzengxiayou i-show': 'i-hide']"></i>
                        <span slot="title">新增下游</span>
                    </el-menu-item>
                    <el-menu-item index="11">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-kaipiaobeizhu i-show': 'i-hide']"></i>
                        <span slot="title">开票备注</span>
                    </el-menu-item>
                    <el-menu-item index="12">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-fapiaoneirong i-show': 'i-hide']"></i>
                        <span slot="title">发票内容</span>
                    </el-menu-item>
                    <el-menu-item index="13">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-yuedubianhua i-show': 'i-hide']"></i>
                        <span slot="title">月度变化</span>
                    </el-menu-item>
                    <el-menu-item index="14">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-kaipiaoqushi  i-show': 'i-hide']"></i>
                        <span slot="title">开票趋势</span>
                    </el-menu-item>
                    <el-menu-item index="15">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv41-huikuanyuce i-show ': 'i-hide']"></i>
                        <span slot="title">回款预测</span>
                    </el-menu-item>
                    <div class="unfold" @click="isCollapse=false" v-if="isCollapse">展开</div>
                    <div class="pick-up" v-else @click="isCollapse=true"><i class="iconfont icon-yunpingtaivzhankaishouqi"></i><span style="vertical-align: 12%;">收起</span></div>

                </el-menu>
            </div>
            <div class="content-right">
                <component :is="currentTabComponent" />
            </div>
        </div>
    </div>
</template>
<script>
// import Industry from "@/components/Output/industry.vue";
import invoiceContent from "@/components/Output/invoiceContent.vue"; // 12.发票内容
import addDownstream from "@/components/Output/addDownstream.vue"; // 10.新增下游
import specialTicket from "@/components/Output/specialTicket.vue"; // 9.专票分析
import redWarning from "@/components/Output/redWarning.vue"; // 8.冲红预警
import cancellationWarning from "@/components/Output/cancellationWarning.vue"; // 7.作废预警
import incomeWarning from "@/components/Output/incomeWarning.vue"; // 6.收支预警
import industryTrends from "@/components/Output/industryTrends.vue"; // 2.行业趋势
import monthChange from "@/components/Output/monthChange.vue"; // 13.月度变化
import hotInvoice from "@/components/Output/hot-invoice.vue"; // 3.开票热力图
import hotDownstream from "@/components/Output/hot-downstream.vue"; // 4.下游热力图
import invoiceTrends from "@/components/Output/invoiceTrends.vue"; // 14.开票趋势
import scatterDownStream from "@/components/Output/scatter-downstream.vue"; // 5.核心企业分析
import remarkInvoce from "@/components/Output/remark-invoice.vue"; // 11.开票备注
import predict from "@/components/Output/predict.vue" // 15.回款预测

export default {
    components: {
        // Industry,
        invoiceContent,
        addDownstream,
        specialTicket,
        redWarning,
        cancellationWarning,
        incomeWarning,
        industryTrends,
        monthChange,
        hotInvoice,
        hotDownstream,
        invoiceTrends,
        scatterDownStream,
        remarkInvoce,
        predict
    },
    data () {
        return {
            isCollapse: true,
            currentTabComponent: 'industryTrends',
        };
    },
    methods: {
        openMenu () {
            // conosole.log('open')
        },
        handleSelect (key, keyPath) {
            // console.log(key, keyPath);
            if (keyPath && keyPath[0] === '12') {
                this.currentTabComponent = 'invoiceContent'
            } else if (keyPath && keyPath[0] === '10') {
                this.currentTabComponent = 'addDownstream'
            } else if (keyPath && keyPath[0] === '9') {
                this.currentTabComponent = 'specialTicket'
            } else if (keyPath && keyPath[0] === '8') {
                this.currentTabComponent = 'redWarning'
            } else if (keyPath && keyPath[0] === '7') {
                this.currentTabComponent = 'cancellationWarning'
            } else if (keyPath && keyPath[0] === '6') {
                this.currentTabComponent = 'incomeWarning'
            } else if (keyPath && keyPath[0] === '2') {
                this.currentTabComponent = 'industryTrends'
            } else if (keyPath && keyPath[0] === '13') {
                this.currentTabComponent = 'monthChange'
            } else if (key === '3') {
                this.currentTabComponent = 'hotInvoice'
            } else if (key === '4') {
                this.currentTabComponent = 'hotDownstream'
            } else if (key === '14') {
                this.currentTabComponent = 'invoiceTrends'
            } else if (key === '5') {
                this.currentTabComponent = 'scatterDownStream'
            } else if (key === '11') {
                this.currentTabComponent = 'remarkInvoce'
            } else if (key === '15') {
                this.currentTabComponent = 'predict'
            }
        },
    },
    // computed() {
    //     if (this.isCollapse) {
    //         //
    //     }
    // },
};
</script>
<style lang="scss" scoped>
</style>