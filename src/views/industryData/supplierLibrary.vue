<template>
    <div class="supplier-bg">
        <div class="stat">
            <el-form :inline='true' ref='form' size='medium'>
                <el-form-item>
                    <el-input v-model="companyName" placeholder="请输入供应商名称" style="with: 100%" @keyup.enter.native="toSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="to-search" @click="toSearch">搜索</div>
                </el-form-item>
            </el-form>
            <div class="advancedt">
                <p @click="$router.push('/supplierAdvancedt')">供应商库<i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="bottom-con">
                <ul>
                    <li>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/04.png" alt=""></dt>
                            <dt v-else><img src="../../assets/images/light/gongshangxinxichaxun.png" alt=""></dt>
                            <dd>工商信息查询</dd>
                        </dl>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/01.png" alt=""></dt>
                            <dt v-else><img src="../../assets/images/light/jingyingzhibiaojiance.png" alt=""></dt>
                            <dd>经营指标监测</dd>
                        </dl>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/02.png" alt="" /></dt>
                            <dt v-else><img src="../../assets/images/light/xinyongzhuangkuanggenzhang.png" alt="" /></dt>
                            <dd>信用状况跟踪</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/03.png" alt=""></dt>
                            <dt v-else><img src="../../assets/images/light/chanyexinxijiaoyan.png" alt=""></dt>
                            <dd>产业信息校验</dd>
                        </dl>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/05.png" alt=""></dt>
                            <dt v-else><img src="../../assets/images/light/rongzixingweiheshi.png" alt=""></dt>
                            <dd>融资行为核实</dd>
                        </dl>
                        <dl>
                            <dt v-if="theme==='dark'"><img src="../../assets/images/supplier/06.png" alt=""></dt>
                            <dt v-else><img src="../../assets/images/light/fanqizhafengxiangyujing.png" alt=""></dt>
                            <dd>反欺诈风险预警</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data () {
        return {
            activeName: 'first',
            companyName: '',
            imageList: [],
        }
    },
    computed: mapState({
        theme: state => state.echart.flag
    }),

    methods: {

        toSearch () {
            if (this.companyName.trim()) {
                this.$router.push({
                    name: 'supplierList',
                    query: { companyName: this.companyName }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
    padding-top: 133px;
}

/deep/ .el-form {
    text-align: center;
    font-size: 0;
    .el-form-item {
        margin-right: 0;
        .el-form-item__content {
            width: 100%;
            .el-input {
                width: 730px;
                height: 50px;
                .el-input__inner {
                    height: 50px;
                    border-radius: 0;
                    background-color: #fff;
                    color: #999999;
                    border: 1px solid #fff;
                }
            }
        }
    }
}
.dark {
    .advancedt {
        color: rgb(140, 141, 141);
        font-size: 16px;
        line-height: 18px;
        margin-top: 0;
        p {
            width: 85px;
            margin: 0 auto;
            cursor: pointer;
        }
        .el-icon-arrow-right {
            line-height: 18px;
            margin-left: 5px;
        }
    }
    .supplier-bg {
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/bg/01.png') no-repeat;
        background-size: 100% 100%;
    }
    .to-search {
        margin-left: -1px;
        width: 126px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 1.43px;
        cursor: pointer;
        background: linear-gradient(-90deg, #2e4143 0%, #31333a 100%);
        &:hover {
            background: linear-gradient(-90deg, #395d61 0%, #3d4661 100%);
            cursor: pointer;
        }
    }
}
.light {
    .advancedt {
        color: #333;
        font-size: 16px;
        line-height: 18px;
        margin-top: 0;
        p {
            width: 85px;
            margin: 0 auto;
            cursor: pointer;
        }
        .el-icon-arrow-right {
            line-height: 18px;
            margin-left: 5px;
        }
    }
    .supplier-bg {
        margin-top: -10px;
        width: 100%;
        height: 100vh;
        background: url('~@/assets/images/light/bg.png') no-repeat;
        background-size: 100% 100%;
    }
    .to-search {
        margin-left: -1px;
        width: 126px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #fff;
        letter-spacing: 1.43px;
        cursor: pointer;
        background-image: linear-gradient(270deg, #4064d4 0%, #3b97d2 100%);
        &:hover {
            background: linear-gradient(-90deg, #547eff 0%, #55bcff 100%);
            cursor: pointer;
        }
    }
}

.bottom-con {
    width: 900px;
    margin: 70px auto 0;
    ul {
        padding-left: 0;
    }
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 84px;
        dl {
            flex: 1;
            dt {
                margin: 0;
                img {
                    display: block;
                    width: 72px;
                    margin: 0 auto 22px;
                }
            }
            dd {
                font-family: PingFang-SC-Regular;
                margin-left: 0;
                text-align: center;
                color: #333;
                font-size: 16px;
                letter-spacing: 3px;
            }
        }
    }
}
/deep/ .select-year {
    border-color: none;
}
</style>
