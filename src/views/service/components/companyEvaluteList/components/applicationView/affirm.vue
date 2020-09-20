<template>
    <div style="height: 800px">
        <div class="table-title mt20">关联方认定图</div>
        <div class="box-wrap " v-if="!isObjectEmpty(obj) ">
            <div class="company-wrap">
                {{ $route.query.companyName }}
            </div>

            <!-- 公司连子公司线 -->
            <div class="child-company-line" v-if="obj.sonCompany.length >0"></div>
            <div class="child-wrap b-green" @click="openDrawer('sonCompany')" v-if="obj.sonCompany.length >0">
                <div class="qg-header">
                    <div class="title l-green">子公司</div>
                    <div class="number">{{  getCount(obj.sonCompany)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in getFive(obj.sonCompany)" :key="index">{{ item }}</div>
                    <div v-if="getCount(obj.sonCompany)>5">...</div>
                </div>
            </div>

            <!-- 联营到其他重大影响线 -->
            <div class="partner-important-line" v-if="obj.jointControl.length> 0"></div>
            <!-- 其他重大影响到联营线 -->
            <div class="important-partner-line" v-if="obj.jointControl.length> 0"></div>
            <div class="jointControl-wrap b-blue" @click="openDrawer('jointControl')" v-if="obj.jointControl.length> 0">
                <div class="qg-header">
                    <div class="title l-blue">其他重大影响/共同控制方</div>
                    <div class="number">{{ getCount(obj.jointControl)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in getFive(obj.jointControl)" :key="index">{{ item }}</div>
                    <div v-if="getCount(obj.jointControl)>5">....</div>
                </div>
            </div>
            <!-- 公司连联营 -->
            <div class="partner-company-line" v-if="obj.partnership.length>0"></div>
            <!-- 辅助线到重大影响 -->
            <div class="partner-company-line" v-if="obj.partnership.length===0 && obj.jointControl.length > 0"></div>
            <div class="partenr-important-aux-line" v-if="obj.partnership.length===0 && obj.jointControl.length > 0"></div>
            <!-- 联营线 -->
            <div class="partner-line" v-if="obj.partnership.length> 0"></div>
            <div class="partner-wrap b-green" @click="openDrawer('partnership')" v-if="obj.partnership.length> 0">
                <div class="qg-header">
                    <div class="title l-green">联营/合营公司</div>
                    <div class="number">{{ getCount(obj.partnership)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in getFive(obj.partnership)" :key="index">{{ item }}</div>
                    <div v-if="getCount(obj.partnership)>5">...</div>
                </div>
            </div>
            <!-- 公司连母公司线 -->
            <div class="mother-company-line" v-if="obj.motherCompany.length> 0"></div>
            <!-- 母公司线 -->
            <div class="mother-wrap b-orange" @click="openDrawer('motherCompany')" v-if="obj.motherCompany.length> 0">
                <div class="qg-header">
                    <div class="title l-orange">母公司</div>
                    <div class="number">{{ getCount(obj.motherCompany) }}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in (obj.motherCompany)" :key="index">{{ item }}</div>
                </div>
            </div>
            <!-- 实际控股到母公司 -->
            <div class="actual-mother-line" v-if="obj.motherCompanyShareholder.length===0 && obj.actualControl.length>0"></div>
            <!-- 实际控股线 -->
            <div class="actual-control-wrap b-orange" @click="openDrawer('actualControl')" v-if="obj.actualControl.length>0">
                <div class="qg-header">
                    <div class="title l-orange">实际控股方</div>
                    <div class="number">{{ getCount(obj.actualControl)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in (obj.actualControl)" :key="index">{{ item }}</div>
                </div>
            </div>
            <!-- 母公司及其他控股线 -->
            <div class="mother-line" v-if="obj.motherCompanyShareholder.length> 0"></div>
            <div class="mother-line-mother-shareholder" v-if="obj.motherCompanyShareholder.length> 0"></div>
            <div class="actual-line-mother-shareholder" v-if="obj.motherCompanyShareholder.length>0"></div>
            <div class="actual-line" v-if="obj.motherCompanyShareholder.length>0"></div>

            <div class="mother-shareholder-wrap b-orange" @click="openDrawer('motherCompanyShareholder')" v-if="obj.motherCompanyShareholder.length>0">
                <div class="qg-header">
                    <div class="title l-orange">母公司的其他控股股东</div>
                    <div class="number">{{ getCount(obj.motherCompanyShareholder)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for="(item,index) in (obj.motherCompanyShareholder)" :key="index">{{ item }}</div>

                </div>
            </div>
            <!-- brother线  文本 -->
            <div class="brother-line-actual" v-if="obj.brotherCompany.length> 0"></div>
            <div class="brother-line" v-if="obj.brotherCompany.length> 0"></div>

            <div class="brother-wrap b-lightblue" @click="openDrawer('brotherCompany')" v-if="obj.brotherCompany.length> 0">
                <div class="qg-header">
                    <div class="title l-lightblue">兄弟公司</div>
                    <div class="number">{{ getCount(obj.brotherCompany)}}</div>
                </div>
                <div class="content">
                    <div class="company-name" v-for=" (item,index) in getFive(obj.brotherCompany)" :key="index">{{ item }}</div>
                    <div v-if="getCount(obj.brotherCompany)>5">....</div>
                </div>
            </div>

        </div>
        <el-drawer title="详情" class="el_drawer_content" :visible.sync="drawer" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="drawer=false"></i>
            <div class="drawer-title">详情</div>
            <div class="content_box">
                <div class="drawer-nav">
                    <div class="title"><span :class="key"></span>{{ translation(key)}}</div>
                    <div class="number">{{ getCount(obj[key])}}</div>
                </div>
                <div class="drawer-company-list-wrap mr20">
                    <div v-for="(item,index) in obj[key]" :key="index" class="dialog-box-wrap">
                        <span class="mb15">{{item}}</span>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drawer: false,
            key: 'brotherCompany',
            obj: {
                "brotherCompany": [],// 兄弟公司
                "followedNum": "",// 关联方存在已关注企业数
                "sonCompany": [],// 子公司
                "actualControl": [],// 实际控制方
                "motherCompany": [],// 母公司
                "motherCompanyShareholder": [],// 母公司的其他控股股东
                "partnership": [],// 联营/合营公司
                "jointControl": []// 重大影响/共同控制
            }
        }
    },
    created () {
        this.getChart()
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        translation (key) {
            switch (key) {
                case "brotherCompany":
                    return "兄弟公司"
                case "sonCompany":
                    return "子公司"
                case "actualControl":
                    return "实际控制方"
                case "motherCompany":
                    return "母公司"
                case "motherCompanyShareholder":
                    return "母公司的其他控股股东"
                case "partnership":
                    return "联营/合营公司"
                case "jointControl":
                    return "重大影响/共同控制"


            }
        },
        //只获取五条
        getFive (arr) {
            let newArr = []
            if (arr.length > 5) {
                for (let i = 0; i < 5; i++) {
                    newArr.push(arr[i])
                }
                return newArr
            } else {
                return arr
            }

        },
        getCount (list) {
            if (list === null)
                return 0
            else
                return list.length
        },
        openDrawer (key) {
            this.key = key
            this.drawer = true
        },
        getChart () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json(`/dcp/query/enterprise/relation/square/${evaluateId}`, {}, { type: 'get' })
                .then(res => {
                    this.obj = res.data === '' ? {} : res.data
                });
        },
    },
}
</script>
<style lang="scss" scoped>
.drawer-nav {
    position: relative;
    display: flex;
    margin: 20px;
    align-items: center;
    .title {
        text-indent: 10px;
        margin-right: 20px;
        span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: absolute;
            left: -2px;
            top: 6px;
        }
    }
}
/* 遮罩 */

.drawer-company {
    text-indent: 10px;
    color: #d3d3d4;
    &:first-child {
        margin-top: 10px;
    }
    margin-bottom: 10px;
}
.dark {
    .drawer-title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #3d3f43;
        text-indent: 20px;
        color: #fff;
        font-size: 16px;
    }
    $blue: #4f77a8;
    $green: #728a4f;
    $orange: #a15d41;
    $ligntblue: #43a1ac;
    $border: #2b4a4d;
    $color: #43a1ac;
    .brotherCompany {
        background-color: $ligntblue;
    }
    .sonCompany,
    .partnership {
        background-color: $green;
    }
    .jointControl {
        background-color: $blue;
    }

    .motherCompany,
    .motherCompanyShareholder,
    .actualControl {
        background-color: $orange;
    }

    .box-wrap {
        position: relative;
    }
    .line-h {
        font-size: 12px;
        height: 1px;
        background-color: $border;
    }
    .line-w {
        font-size: 12px;
        width: 1px;
        background-color: $border;
    }
    .partenr-important-aux-line {
        @extend .line-h;
        width: 262px;
        position: absolute;
        top: 519px;
        left: 560px;
    }
    //实际控股连母公司线
    .actual-mother-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 185px;
        left: 197px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 20px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }

    //重大影响到联营
    .important-partner-line {
        @extend .line-w;
        height: 315px;
        position: absolute;
        top: 205px;
        right: 108px;
    }
    .partner-important-line {
        @extend .line-h;
        width: 240px;
        position: absolute;
        top: 519px;
        right: 108px;
        &::after {
            content: '影响';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        /* ▶ */
        &::before {
            content: '◀';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //兄弟线
    .brother-line {
        width: 100px;
        position: absolute;
        top: 450px;
        left: 58px;
        @extend .line-h;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .brother-line-actual {
        height: 222px;
        @extend .line-w;
        position: absolute;
        top: 229px;
        left: 58px;
    }
    //实际控股方线
    .actual-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 46px;
        left: 62px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .actual-line-mother-shareholder {
        @extend .line-w;
        height: 100px;
        position: absolute;
        top: 46px;
        left: 62px;
    }
    //公司连母公司线
    .mother-company-line {
        @extend .line-h;
        width: 73px;
        position: absolute;
        top: 200px;
        left: 456px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //公司连子公司线

    .child-company-line {
        @extend .line-h;
        width: 84px;
        position: absolute;
        top: 200px;
        left: 710px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //公司连联营
    .partner-company-line {
        @extend .line-w;
        height: 300px;
        position: absolute;
        top: 220px;
        left: 560px;
    }
    //联营线
    .partner-line {
        @extend .line-h;
        width: 90px;
        position: absolute;
        top: 519px;
        left: 560px;
        &::after {
            content: '影响';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //母公司线
    .mother-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 46px;
        left: 331px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .mother-line-mother-shareholder {
        @extend .line-w;
        height: 100px;
        position: absolute;
        top: 46px;
        left: 410px;
    }

    .company-wrap {
        display: flex;
        justify-items: center;
        align-items: center;
        height: 30px;
        /* line-height: 30px; */
        width: 169px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #ffffff;
        background: #2b4a4d;
        text-align: left;
        padding: 10px 6px;
        position: absolute;
        top: 170px;
        left: 530px;
    }
    .special-wrap {
        width: 170px;
        padding: 10px 5px 28px 17px;
        background: #2d3034;
        z-index: 999;
    }

    .content-wrap {
        width: 150px;
        padding: 10px 5px 28px 17px;
        background: #2d3034;
    }
    .jointControl-wrap {
        @extend .special-wrap;
        position: absolute;
        top: 144px;
        right: -10px;
        z-index: 999;
    }
    .child-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 152px;
        right: 200px;
    }
    .mother-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 138px;
        left: 280px;
        z-index: 999;
    }
    .actual-control-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 138px;
        left: 20px;
        z-index: 999;
    }
    .partner-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 475px;
        right: 343px;
        z-index: 999;
    }
    .mother-shareholder-wrap {
        @extend .special-wrap;
        position: absolute;
        top: 6px;
        left: 144px;
        z-index: 999;
    }
    .brother-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 390px;
        left: 160px;
        z-index: 999;
    }
    .number {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: $color;
        background: #2d393c;
        padding: 2px 4px;
    }
    .qg-header {
        display: flex;
        justify-content: space-between;
    }
    .l-green {
        color: $green;
    }
    .l-blue {
        color: $blue;
    }
    .l-orange {
        color: $orange;
    }
    .l-lightblue {
        color: $ligntblue;
    }
    .b-lightblue {
        border-left: 5px solid $ligntblue;
    }
    .b-orange {
        border-left: 5px solid $orange;
    }
    .b-green {
        border-left: 5px solid $green;
    }
    .b-blue {
        border-left: 5px solid $blue;
    }
    .content {
        margin-top: 10px;
    }
    .company-name {
        text-indent: 12px;
        position: relative;
        font-family: PingFangSC-Light;
        font-size: 12px;
        line-height: 16px;
        color: #d3d3d4;
        margin-bottom: 10px;
        word-spacing: 10px;
        &:before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #696f76;
            position: absolute;
            left: -2px;
            top: 4px;
        }
    }
}
.light {
    .drawer-title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #3d3f43;
        text-indent: 20px;
        color: #666;
        font-size: 16px;
    }
    $blue: #4064d4;
    $green: #acdc7c;
    $orange: #ff8136;
    $ligntblue: #43a1ac;
    $border: #4064d4;
    $color: #4064d4;
    .brotherCompany {
        background-color: $ligntblue;
    }
    .sonCompany,
    .partnership {
        background-color: $green;
    }
    .jointControl {
        background-color: $blue;
    }

    .motherCompany,
    .motherCompanyShareholder,
    .actualControl {
        background-color: $orange;
    }

    .box-wrap {
        position: relative;
    }
    .line-h {
        font-size: 12px;
        height: 1px;
        background-color: $border;
    }
    .line-w {
        font-size: 12px;
        width: 1px;
        background-color: $border;
    }
    .partenr-important-aux-line {
        @extend .line-h;
        width: 262px;
        position: absolute;
        top: 519px;
        left: 560px;
    }
    //实际控股连母公司线
    .actual-mother-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 185px;
        left: 197px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 20px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }

    //重大影响到联营
    .important-partner-line {
        @extend .line-w;
        height: 315px;
        position: absolute;
        top: 205px;
        right: 108px;
    }
    .partner-important-line {
        @extend .line-h;
        width: 240px;
        position: absolute;
        top: 519px;
        right: 108px;
        &::after {
            content: '影响';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        /* ▶ */
        &::before {
            content: '◀';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //兄弟线
    .brother-line {
        width: 100px;
        position: absolute;
        top: 450px;
        left: 58px;
        @extend .line-h;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .brother-line-actual {
        height: 222px;
        @extend .line-w;
        position: absolute;
        top: 229px;
        left: 58px;
    }
    //实际控股方线
    .actual-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 46px;
        left: 62px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .actual-line-mother-shareholder {
        @extend .line-w;
        height: 100px;
        position: absolute;
        top: 46px;
        left: 62px;
    }
    //公司连母公司线
    .mother-company-line {
        @extend .line-h;
        width: 73px;
        position: absolute;
        top: 200px;
        left: 456px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //公司连子公司线

    .child-company-line {
        @extend .line-h;
        width: 84px;
        position: absolute;
        top: 200px;
        left: 710px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //公司连联营
    .partner-company-line {
        @extend .line-w;
        height: 300px;
        position: absolute;
        top: 220px;
        left: 560px;
    }
    //联营线
    .partner-line {
        @extend .line-h;
        width: 90px;
        position: absolute;
        top: 519px;
        left: 560px;
        &::after {
            content: '影响';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    //母公司线
    .mother-line {
        @extend .line-h;
        width: 80px;
        position: absolute;
        top: 46px;
        left: 331px;
        &::after {
            content: '控制';
            color: $color;
            position: absolute;
            top: -20px;
            left: 39px;
        }
        &::before {
            content: '▶';
            color: $color;
            position: absolute;
            top: -5px;
            left: 39px;
        }
    }
    .mother-line-mother-shareholder {
        @extend .line-w;
        height: 100px;
        position: absolute;
        top: 46px;
        left: 410px;
    }

    .company-wrap {
        display: flex;
        justify-items: center;
        align-items: center;
        height: 30px;
        width: 169px;
        font-size: 14px;
        color: #ffffff;
        background: #4064d4;
        text-align: left;
        padding: 10px 6px;
        position: absolute;
        top: 170px;
        left: 530px;
    }
    .special-wrap {
        width: 170px;
        padding: 10px 5px 28px 17px;
        background: #2d3034;
        z-index: 999;
    }

    .content-wrap {
        width: 150px;
        padding: 10px 5px 28px 17px;
        background: #fff;
        border-top: 1px solid #d2d9e5;
        border-right: 1px solid #d2d9e5;
        border-bottom: 1px solid #d2d9e5;
    }
    .jointControl-wrap {
        @extend .special-wrap;
        position: absolute;
        top: 144px;
        right: -10px;
        z-index: 999;
    }
    .child-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 152px;
        right: 200px;
    }
    .mother-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 138px;
        left: 280px;
        z-index: 999;
    }
    .actual-control-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 138px;
        left: 20px;
        z-index: 999;
    }
    .partner-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 475px;
        right: 343px;
        z-index: 999;
    }
    .mother-shareholder-wrap {
        @extend .special-wrap;
        position: absolute;
        top: 6px;
        left: 144px;
        z-index: 999;
    }
    .brother-wrap {
        @extend .content-wrap;
        position: absolute;
        top: 390px;
        left: 160px;
        z-index: 999;
    }
    .number {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #4064d4;
        background: #dce6f9;
        padding: 2px 4px;
    }
    .qg-header {
        display: flex;
        justify-content: space-between;
    }
    .l-green {
        color: $green;
    }
    .l-blue {
        color: $blue;
    }
    .l-orange {
        color: $orange;
    }
    .l-lightblue {
        color: $ligntblue;
    }
    .b-lightblue {
        border-left: 5px solid $ligntblue;
    }
    .b-orange {
        border-left: 5px solid $orange;
    }
    .b-green {
        border-left: 5px solid $green;
    }
    .b-blue {
        border-left: 5px solid $blue;
    }
    .content {
        margin-top: 10px;
    }
    .company-name {
        text-indent: 12px;
        position: relative;
        font-size: 12px;
        line-height: 16px;
        color: #666;
        margin-bottom: 10px;
        word-spacing: 10px;
        &:before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #dcdfe6;
            position: absolute;
            left: -2px;
            top: 4px;
        }
    }
}

.dark {
    .number {
        color: #43a1ac;
        background: #2d393c;
    }
    .post {
        color: #d3d3d4;
    }
    .drawer-title {
        border-bottom: 1px solid #3d3f43;
    }
}
.light {
    .number {
        color: #4064d4;
        background: #dce6f9;
    }
    .post {
        color: #999;
    }
    .drawer-title {
        border-bottom: 1px solid #eee;
    }
}
</style>
