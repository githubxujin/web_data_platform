<template>
    <div class="row" style="overflow: hidden;">
        <!--查验结果-->
        <div id="invoiceContent" :class="{zf: form.cancellationMark == 1 }">
            <div class="tab-page">
                <h1
                    style="color:#000000;padding:0px 0px 20px 0px; text-align:center;font-family: '楷体';font-weight: bold;">
                    发票详情</h1>
                <!--代码号码开票日期-->
                <table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                    <tbody>
                        <tr height="30px">
                            <td class="align_left" style="font-size:12px;">发票代码：<span class="content_td"
                                    id="fpdm">{{ form.invoiceCode}}</span></td>
                            <td class="align_left" style="font-size:12px;">发票号码：<span class="content_td"
                                    id="fphm">{{ form.invoiceNo}}</span></td>
                            <td class="align_left" style="font-size:12px;">开票日期：<span class="content_td"
                                    id="kprq">{{ form.invoiceDate}}</span></td>
                            <td class="align_left" style="font-size:12px;">校验码：<span class="content_td"
                                    id="jym">{{ form.checkCode}}</span></td>
                            <td class="align_left" style="font-size:12px;">机器编号：<span class="content_td"
                                    id="jqbh">{{ form.machineNo}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <!--下面的表格-->
                <table cellpadding="0" cellspacing="0" style="width:100%" class="result_table">
                    <!--购买方和密码区-->
                    <tbody>
                        <tr>
                            <td rowspan="4" class="align_center" width="3%">
                                <p>购</p>
                                <p>买</p>
                                <p>方</p>
                            </td>
                            <td class="align_left noBorder" width="11%">
                                名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</td>
                            <td nowrap="true" class="align_left noBorder"><span class="content_td"
                                    id="gmf_mc">{{ form.buyerName}}</span></td>
                            <td rowspan="4" class="align_center" width="2.5%">
                                <p>密</p>
                                <p>码</p>
                                <p>区</p>
                            </td>
                            <td rowspan="4" nowrap="true" class="align_left" width="38%" id="password"></td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder">纳税人识别号：</td>
                            <td nowrap="true" class="align_left noBorder"><span class="content_td"
                                    id="gmf_nsrsbh">{{ form.buyerTaxNo}}</span></td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder" valign="top">地&nbsp;址、电&nbsp;话：</td>
                            <td class="align_left noBorder" valign="top"><span class="content_td"
                                    id="gmf_dzdh">{{ form.buyerAddressPhone}}</span></td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder" valign="top">开户行及账号：</td>
                            <td class="align_left noBorder" valign="top"><span class="content_td"
                                    id="gmf_yhzh">{{ form.buyerAccount}}</span></td>
                        </tr>
                        <!--发票明细开始-->
                        <tr>
                            <td colspan="5">
                                <table cellspacing="0" cellpadding="0" style="width:100%;" class="result_table_box">
                                    <tbody>
                                        <tr id="tab_head">
                                            <td class="align_center rightBorder" width="30%">货物或应税劳务、服务名称</td>
                                            <td class="align_center rightBorder" width="10%">规格型号</td>
                                            <td class="align_center rightBorder" width="5%">单位</td>
                                            <td class="align_center rightBorder" width="10%">数量</td>
                                            <td class="align_center rightBorder" width="10%">单价</td>
                                            <td class="align_center rightBorder" width="15%">金额</td>
                                            <td class="align_center rightBorder" width="5%">税率</td>
                                            <td class="align_center" width="15%">税额</td>
                                        </tr>
                                        <tr v-for="(v,k) in form.invoiceDetailLists" :key="k">
                                            <td class="align_left rightBorder"><span
                                                    class="content_td">{{ v.goodsName}}</span></td>
                                            <td class="align_left rightBorder" valign="top"><span
                                                    class="content_td">{{ v.specificationModel}}</span></td>
                                            <td class="align_center rightBorder" valign="top"><span
                                                    class="content_td">{{ v.unit}}</span></td>
                                            <td class="align_right rightBorder" valign="top"><span
                                                    class="content_td">{{ v.detailNumber}}</span></td>
                                            <td class="align_right rightBorder" valign="top"><span
                                                    class="content_td">{{ v.unitPrice}}</span></td>
                                            <td class="align_right rightBorder" valign="top"><span
                                                    class="content_td">{{v.detailAmount}}</span></td>
                                            <td class="align_right rightBorder" valign="top"><span
                                                    class="content_td">{{v.taxRate}}</span></td>
                                            <td class="align_right" valign="top"><span
                                                    class="content_td">{{v.taxAmount}}</span></td>
                                        </tr>
                                        <tr>
                                            <td class="align_center rightBorder" width="30%">合计</td>
                                            <td class="align_center rightBorder" width="10%">&nbsp;</td>
                                            <td class="align_center rightBorder" width="5%">&nbsp;</td>
                                            <td class="align_center rightBorder" width="10%">&nbsp;</td>
                                            <td class="align_center rightBorder" width="10%">&nbsp;</td>
                                            <td class="align_right rightBorder" width="15%"><span class="content_td"
                                                    id="kpje" style="font-family:Arial;">¥{{form.invoiceAmount}}</span>
                                            </td>
                                            <td class="align_center rightBorder" width="5%">&nbsp;</td>
                                            <td class="align_right" width="15%"><span class="content_td" id="kpse"
                                                    style="font-family:Arial;">¥{{form.taxAmount}}</span></td>
                                        </tr>
                                        <tr>
                                            <td class="align_center rightBorder topBorder">价税合计(大写)</td>
                                            <td colspan="4" class="align_left topBorder"><span
                                                    class="align_left"></span><span class="content_td"
                                                    id="jshjdx">{{NoToChinese(form.totalAmount)}}</span></td>
                                            <td colspan="3" class="align_left topBorder"><span
                                                    style="margin-left: 80px;">(小写)</span><span class="content_td"
                                                    id="jshjxx" style="font-family:Arial;">¥{{form.totalAmount}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <!--发票明细结束-->
                        <!--销售方信息-->
                        <tr>
                            <td rowspan="4" class="align_center">
                                <p>销</p>
                                <p>售</p>
                                <p>方</p>
                            </td>
                            <td class="align_left noBorder">
                                名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</td>
                            <td class="align_left noBorder"><span class="content_td"
                                    id="xsf_mc">{{ form.salerName}}</span></td>
                            <td rowspan="4" class="align_center">
                                <p>备</p>
                                <p>注</p>
                            </td>
                            <td rowspan="4" class="align_left content_td" width="38%" id="bz" valign="top">
                                <p class="warp">{{form.remark}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder">纳税人识别号：</td>
                            <td class="align_left noBorder"><span class="content_td"
                                    id="xsf_nsrsbh">{{ form.salerTaxNo}}</span></td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder">地&nbsp;址、电&nbsp;话：</td>
                            <td class="align_left noBorder"><span class="content_td"
                                    id="xsf_dzdh">{{ form.salerAddressPhone}}</span></td>
                        </tr>
                        <tr>
                            <td class="align_left noBorder">开户行及账号：</td>
                            <td class="align_left noBorder"><span class="content_td"
                                    id="xsf_yhzh">{{ form.salerAccount}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { NoToChinese } from "@/config/utils";
export default {
    props: ["id"],
    data() {
        return {
            NoToChinese,
            form: {
                id: 0,
                invoiceDetailLists: [],
                pdfPageFileId: 0,
                invoiceType: "", // 发票类型
                invoiceCode: "", // 发票代码
                invoiceNo: "", // 发票号码
                invoiceAmount: "", // 发票金额
                invoiceDate: "", // 开票日期
                checkCount: "0",
                salerTaxNo: "", // 销售方纳税人识别号
                salerName: "", // 销售方名称
                salerAddressPhone: "", // 销售方地址电话
                salerAccount: "", // 销售方开户行及账号
                buyerTaxNo: "", // 购方纳税人识别号
                buyerName: "", // 购方名称
                buyerAddressPhone: "", // 购方地址电话
                buyerAccount: "", // 购方开户行及账号
                taxAmount: "", // 开票税额
                totalAmount: "", // 价税合计
                remark: "", // 备注
                machineNo: "", // 机器编号
                drawer: "",
                payee: "",
                reviewer: "",
                checkCode: "", // 校验码
                blueInvoiceCode: "",
                blueInvoiceNo: "",
                cancellationMark: "0" // 作废标志
            }
        };
    },
    mounted() {
        if (!this.id) return;
        this.getLocationText(this.id);
    },
    methods: {
        /* 获取图片位置 */
        async getLocationText(invoiceDetailId = 338) {
            let res = await this.$http(
                "/invoice/queryDetail",
                {
                    invoiceDetailId
                },
                { type: "formdata" }
            );
            if (res.code === "200") {
                this.form = res.data;
            }
        }
    }
};
</script>
<style lang="less" scoped>
#invoiceContent {
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    &.zf {
        background: url(../../assets/images/zf-mark.png) no-repeat 50% 35%;
        background-size: cover;
    }
}
.clear {
    clear: both;
}

.row .checkResult #invoiceContent {
    width: 780px;
    padding: 0px;
    /*	box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);*/
    /*border: 1px solid #ccc;*/
    font-family: "楷体";
    /*font-weight: bold;*/
    margin-left: 40px;
    position: relative;
}
.row .checkResult .shuiyin {
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
}

.tab-page {
    display: block;
    font-family: 楷体;
    font-size: 14px;
    color: #333;
}

.content_td {
    color: #3334ff;
    font-family: "微软雅黑";
    font-size: 12px;
}

.content_date {
    color: #000000;
    font-family: "楷体";
    font-size: 12px;
}

.result_table,
.result_table td {
    border: 1px solid #aaa;
    border-collapse: collapse;
    line-height: 25px;
    margin: 0 auto;
}

.align_center {
    text-align: center !important;
}

.align_left {
    text-align: left !important;
    padding: 0 3px 0 3px;
}

.align_right {
    text-align: right !important;
    padding: 0 3px 0 3px;
}

.result_table td.noBorder {
    border: 0px;
}

table.result_table_box {
    border: 0px;
    border-collapse: collapse;
}

table.result_table_box td {
    border: 0px solid #ccc;
    border-collapse: collapse;
}

.result_table_box td.topBorder {
    border-top: 1px solid #aaa;
}

.result_table_box td.rightBorder {
    border-right: 1px solid #aaa;
}

.warp {
    word-wrap: break-word;
    word-break: break-all;
    /*	width: 38%;*/
}
.row .checkResult {
    width: 1144px;
    border: 2px solid #f3f3f3;
    border-radius: 10px;
    padding: 30px 0 30px 0;
    position: relative;
}

.row .checkResult .guijiTitle {
    position: absolute;
    right: 80px;
    top: 38px;
    color: #010101;
    font-size: 28px;
    font-family: "楷体";
    font-weight: bold;
}

.row .checkResult .subtitle {
    position: absolute;
    right: 56px;
    top: 88px;
    color: #ff5a00;
    font-size: 18px;
    font-family: "microsoft yahei";
}

.row .checkResult .ewmBg {
    // background-image: url(../img/query/erweimabg.png);
    position: absolute;
    left: 895px;
    top: 55%;
    margin-top: -105px;
    width: 210px;
    height: 210px;
    padding: 5px 5px;
    z-index: 2;
}

.continueCheckBtn {
    width: 120px;
    height: 35px;
    border: 2px solid #1b86ca;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    color: #1b86ca;
    font-size: 15px;
    float: left;
}
.continueCheckBtn:hover {
    cursor: pointer;
}

/*作废图*/
.row .zfImg,
.zfImg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: none;
    text-align: center;
}
</style>


