<!--推送图-->
<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="$parent.generateVisible" style="margin-top: -10vh;" width="92%">
            <div class="push-top">
                <div class="sales-person">业务人员</div>
                <div class="distribution-area">分配区</div>
                <div class="wait-deal">待办灰名单<span v-if="waitList.length>0">{{waitList.length}}</span></div>
            </div>
            <div class="area">
                <div class="area-sales">
                    <div class="search">
                        <el-input type="primary" v-model="nickName" class="person" placeholder="请搜索" clearable @input="searchClick"></el-input>
                        <!-- <i class="el-icon-search" @click="searchClick"></i> -->
                    </div>
                    <ul v-if="userList&&userList.length">
                        <li :class="item.checked?'active':''" v-for="(item,index) in userList" :key="index+'01'" @click="SelectName(item,index,item.checked)">
                            <span class="name" :title="item.nickName">{{item.nickName}}</span>
                            <span v-if="item.num > 0" class="num">{{item.num}}</span>
                            <i class="el-icon-check" v-if="item.checked"></i>
                        </li>
                    </ul>
                </div>
                <div :class="selectedData.length>0?'area-distribution selected':'area-distribution'">
                    <div class="tips" v-if="selectedData.length ===0">
                        <p>选择左侧业务人员至该区域</p>
                        <p>拖拽右侧待办灰名单至该区域</p>
                    </div>
                    <div class="select-wait" v-if="selectedData.length>0">
                        <el-carousel indicator-position="none" height="420px" :autoplay="false" v-if="selectedData.length > 0" @change="cardChange" ref="carousel">
                            <el-carousel-item v-for="(item,index) in selectedData" :key="index+'03'">
                                <div class="head">{{item.nickName}}</div>
                                <div class="title" v-if="item.antiFraudAccountList.length>0">
                                    <div class="title-customerName">客户名称</div>
                                    <div class="title-contractorName">承建单位</div>
                                    <div class="title-contractorAccount">账号</div>
                                    <div class="title-remark">申请原因 </div>
                                </div>
                                <Draggable class="list-group" :list="item.antiFraudAccountList" group="people">
                                    <div class="list-group-item" v-for="(child,child_index) in item.antiFraudAccountList" :key="child_index+'05'">
                                        <div class="customerName" :title="child.customerName">{{child.customerName}}</div>
                                        <div class="contractorName" :title="child.contractorName">{{child.contractorName}}</div>
                                        <div class="contractorAccount" :title="child.contractorAccount">{{child.contractorAccount}}</div>
                                        <div class="remark" :title="child.remark">{{child.remark}}</div>
                                    </div>
                                </Draggable>
                                <!-- <div class="child-item" v-for="(child,child_index) in item.antiFraudAccountList" :key="child_index+'05'">
                                    <div class="customerName" :title="child.customerName" v-if="child.customerName">{{child.customerName}}</div>
                                    <div class="contractorName" :title="child.contractorName" v-if="child.contractorName">{{child.contractorName}}</div>
                                    <div class="contractorAccount" :title="child.contractorAccount" v-if="child.contractorAccount">{{child.contractorAccount}}</div>
                                    <div class="remark" :title="child.remark" v-if="child.remark">{{child.remark}}</div>
                                </div> -->
                            </el-carousel-item>
                        </el-carousel>
                        <div class="pages" v-if="selectedData.length > 1"><span>{{activeIndex}}</span>/{{selectedData.length}}</div>
                    </div>
                </div>
                <div class="area-wait">
                    <div class="title">
                        <div class="title-customerName">客户名称</div>
                        <div class="title-contractorName">承建单位</div>
                        <div class="title-contractorAccount">账号</div>
                        <div class="title-remark">申请原因 </div>
                        <div class="close"><i class="el-icon-close"></i></div>
                    </div>
                    <div class="wait-wrap" v-if="waitList&&waitList.length">
                        <Draggable class="list-group" :list="waitList" group="people" @change="log">
                            <div class="list-group-item" v-for="(item,index) in waitList" :key="index+'02'">
                                <div class="customerName" :title="item.customerName">{{item.customerName}}</div>
                                <div class="contractorName" :title="item.contractorName">{{item.contractorName}}</div>
                                <div class="contractorAccount" :title="item.contractorAccount">{{item.contractorAccount}}</div>
                                <div class="remark" :title="item.remark">{{item.remark}}</div>
                                <div class="close"><i class="el-icon-close" @click="delClick(index)"></i></div>
                            </div>
                        </Draggable>
                        <!-- <div class="area-wait-item" v-for="(item,index) in waitList" :key="index+'02'" :draggable="selectedData.length > 0" @dragstart="onDragstart($event , index)" @dragend="onDragend($event,item,index)" @dragover="onDragover($event)" @drop="onDrop($event ,index )">
                            <div class="customerName" :title="item.customerName">{{item.customerName}}</div>
                            <div class="contractorName" :title="item.contractorName">{{item.contractorName}}</div>
                            <div class="contractorAccount" :title="item.contractorAccount">{{item.contractorAccount}}</div>
                            <div class="remark" :title="item.remark">{{item.remark}}</div>
                            <div class="close"><i class="el-icon-close" @click="delClick(index)"></i></div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div slot="footer">
                <el-button type="info" @click="$parent.generateVisible = false;" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
    name: "two-lists",
    display: "Two Lists",
    order: 1,
    components: {
        Draggable
    },
    data() {
        return {
            dialogTitle: "推送列表",
            nickName: "",  //业务人员
            ruleForm: {

            },
            userList: [],  //用户信息
            waitList: [],  //待办灰名单列表
            selectedData: [],
            activeIndex: 1,
        }
    },
    created() {
        this.getWaitList();
        this.getUserInfo();
    },
    methods: {
        //搜索
        searchClick() {
            this.getUserInfo();
        },
        //选择人员
        SelectName(item, index, checked) {
            if (!item.checked) {
                this.userList[index].checked = true;
                if (this.selectedData.length === 0) {
                    this.selectedData.push({
                        nickName: item.nickName,
                        email: item.email,
                        antiFraudAccountList: []
                    });
                } else {
                    let arr = [];
                    for (let i = 0; i < this.selectedData.length; i++) {
                        arr.push(this.selectedData[i].nickName);
                    }
                    //如果被点击的名字不在分配区，那就进行添加
                    if (!arr.includes(item.nickName)) {
                        this.selectedData.push({
                            nickName: item.nickName,
                            email: item.email,
                            antiFraudAccountList: []
                        });
                    }
                    // this.selectedData.map((e, i) => {
                    //     //根据点击的人名改变分配区轮播图激活图片的索引
                    //     if (e.nickName === item.nickName) {
                    //         this.$refs.carousel.setActiveItem(i);
                    //     }
                    // })
                }
                return;
            } else {
                this.$confirm("确定取消" + item.nickName + '信息?', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    center: true
                }).then(() => {
                    // this.selectedData.splice(this.activeIndex - 1, 1);
                    this.selectedData.map((e, i) => {
                        if (item.nickName === e.nickName) {
                            this.selectedData.splice(i, 1);
                        }
                    })
                    this.userList[index].checked = false;
                    this.userList[index].num = 0;
                }).catch(() => {

                });
                return;
            }
        },
        //轮播图切换时改变激活图片的索引
        cardChange(index1, index2) {
            this.activeIndex = index1 + 1;
        },
        //删除
        delClick(index) {
            this.waitList.splice(index, 1);
        },
        // 开始拖拽
        onDragstart(event, row) {
            event.stopPropagation();
        },
        // 拖拽中
        onDragover(event) {
            event.preventDefault();
            // console.log('拖拽中');
        },
        //  拖拽结束   onDragend
        onDragend(event, item, index) {
            this.selectedData[this.activeIndex - 1].antiFraudAccountList.push(item);
            this.waitList.splice(index, 1);
        },
        // 拖拽放置(鼠标弹起的出发)  onDrop
        onDrop(event, index) {

        },
        //拖拽
        log(evt) {
            this.selectedData.map((sitem, sindex) => {
                this.userList.map((uitem, uindex) => {
                    if (sitem.nickName === uitem.nickName) {
                        this.userList[uindex].num = sitem.antiFraudAccountList.length;
                    }
                })
            })

        },
        //确定
        submitForm() {
            let params = this.selectedData;
            this.$http(
                '/dcp/antiFraud/account/wait/notify', params, { type: 'POST' }
            ).then(res => {
                this.$message.success("推送成功");
                this.$parent.generateVisible = false;
            })

        },
        //获取用户信息
        getUserInfo() {
            this.$http(
                '/user/m/user/list', { nickName: this.nickName }, { type: 'formData' }
            ).then(res => {
                let data = res.data;
                data.map(e => {
                    if(this.selectedData&&this.selectedData.length){
                        this.selectedData.map( v => {
                            if(e.nickName === v.nickName){
                                e.checked = true;
                                e.num = v.antiFraudAccountList.length;
                            }
                        })
                    }else{
                        e.checked = false;
                        e.num = 0;
                    }   
                })
                this.userList = data;
            })
        },
        //获取待办灰名单
        getWaitList() {
            this.ajax.get(
                '/dcp/antiFraud/account/wait/list', {}
            ).then(res => {
                let data = res.data;
                this.waitList = data;
            })
        }
    },

}
</script>
<style lang="scss" scoped>
    .push-top,
    .area {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 0 10px 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        .sales-person,
        .area-sales {
            width: 13%;
        }
        .distribution-area,
        .area-distribution {
            width: 41%;
        }
        .wait-deal,
        .area-wait {
            width: 42%;
        }
        .wait-deal {
            span {
                display: inline-block;
                min-width: 24px;
                height: 15px;
                line-height: 15px;
                margin-left: 6px;
                text-align: center;
                border-radius: 2px;
            }
        }
    }
    .area {
        .area-sales {
            height: 450px;
            .search {
                position: relative;
                width: 80%;
                margin: 20px auto 0;
                .person {
                    height: 28px;
                    /deep/ .el-input__inner {
                        height: 28px;
                        line-height: 28px;
                    }
                    /deep/ .el-input__icon{
                        line-height: 28px;  
                    }
                }
                /deep/ .el-icon-search {
                    position: absolute;
                    top: 8px;
                    right: 10px;
                    cursor: pointer;
                }
            }
            ul {
                width: 70%;
                max-height: 380px;
                margin: 10px auto 0;
                padding: 0;
                list-style: none;
                overflow-y: scroll;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                li {
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    .name {
                        width: 50%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .num {
                        position: absolute;
                        min-width: 24px;
                        height: 16px;
                        line-height: 16px;
                        left: 41%;
                        text-align: center;
                        border-radius: 2px;
                        top: 10px;
                    }
                    /deep/ .el-icon-check {
                        font-size: 16px;
                        line-height: 36px;
                    }
                }
            }
        }
        .area-distribution {
            height: 450px;
            .tips {
                height: 50px;
                margin-top: 200px;
                text-align: center;
            }
            .select-wait {
                width: 100%;
                height: 100%;
                position: relative;
                /deep/ .el-carousel__container {
                    .head {
                        width: 90%;
                        margin: 20px auto 10px;
                        font-size: 16px;
                    }
                    .title{
                        box-sizing: content-box;
                        width: 90%;
                        height: 36px;
                        line-height: 36px;
                        padding: 0 15px;
                        margin: 0 auto;
                        font-size: 12px;
                        display: flex;
                        justify-content: space-between;
                        &-customerName {
                            width: 28%;
                        }
                        &-contractorName {
                            width: 28%;
                        }
                        &-contractorAccount {
                            width: 16%;
                        }
                        &-remark {
                            width: 20%;
                        }
                    }
                    .list-group-item {
                        width: 90%;
                        height: 36px;
                        line-height: 36px;
                        display: flex;
                        justify-content: space-between;
                        margin: 0 auto;
                        .customerName,
                        .contractorName,
                        .contractorAccount,
                        .remark {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 12px;
                        }
                        .customerName {
                            width: 28%;
                        }
                        .contractorName {
                            width: 28%;
                        }
                        .contractorAccount {
                            width: 16%;
                        }
                        .remark {
                            width: 20%;
                        }
                    }
                    /deep/ .el-carousel__arrow {
                        background: rgba(81, 181, 191, 0.18);
                        color: #51b5bf;
                        font-size: 14px;
                    }
                    /deep/ .el-carousel__arrow--left {
                        left: 3px;
                    }
                    /deep/ .el-carousel__arrow--right {
                        right: 3px;
                    }
                    /deep/ .el-icon-arrow-right:before {
                        content: "\E6E0";
                    }
                }
            }
            .pages {
                position: absolute;
                bottom: 10px;
                right: 10px;
                color: #d3d3d4;
                font-size: 12px;
                span {
                    font-size: 16px;
                }
            }
        }
        .area-distribution.selected {
            border: none;
            background: #313438;
        }
        .area-wait {
            height: 450px;
            padding: 20px 0;
            font-family: PingFangSC-Light;
            font-size: 12px;
            .title {
                box-sizing: content-box;
                width: 90%;
                height: 36px;
                line-height: 36px;
                padding: 0 15px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                &-customerName {
                    width: 28%;
                }
                &-contractorName {
                    width: 28%;
                }
                &-contractorAccount {
                    width: 16%;
                }
                &-remark {
                    width: 20%;
                }
                /deep/ .el-icon-close {
                        color: transparent;
                }
            }
            .list-group {
                width: 90%;
                margin: 0 auto;
                max-height: 374px;
                overflow-y: scroll;
                &-item {
                    display: flex;
                    justify-content: space-between;
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                    .customerName,
                    .contractorName,
                    .contractorAccount,
                    .remark {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .customerName {
                        width: 28%;
                    }
                    .contractorName {
                        width: 28%;
                    }
                    .contractorAccount {
                        width: 16%;
                    }
                    .remark {
                        width: 20%;
                    }
                    /deep/ .el-icon-close {
                        color: #bb4d31;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    ::-webkit-scrollbar {
        /* WebKit browsers 适配谷歌 */
        width: 0;
        height: 0;
    }
    :-moz-scrollbar {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        width: 0;
        height: 0;
    }
    ::-moz-scrollbar {
        /* Mozilla Firefox 19+ 适配火狐 */
        width: 0;
        height: 0;
    }
    :-ms-scrollbar {
        /* Internet Explorer 10+  适配ie*/
        width: 0;
        height: 0;
    }
    .dark{
        .push-top,
        .area {
            color: rgba($color: #fff, $alpha: 0.8);
        }
        .area {
            .area-sales {
                background: #313438;
                ul{
                    color: #d3d3d4;
                    li .num{
                        color: #43a1ac;
                        background: #2b4a4d;
                    }
                    li:hover,
                    li.active {
                        color: #51b5bf;
                    }
                }
            }
            .area-distribution{
                border: 1px dashed #7c7c7d;
                .select-wait{
                    /deep/ .el-carousel__container {
                        .head {
                            color: #51b5bf;
                        }
                        .title {
                            background: #393C41;
                        }
                        .list-group-item{
                            .customerName,
                            .contractorName,
                            .contractorAccount,
                            .remark {
                                color: #d3d3d4;
                            }
                        }
                    }
                }
                .pages {
                    span {
                        color: #51b5bf;
                    }
                }
            }
            .area-wait {
                color: #d3d3d4;
                background: #313438;
                .title{
                    background: #393C41;
                }
            }
        }
        .wait-deal {
            span {
                color: #43a1ac;
                background: #2b4a4d;
            }
        }
    }
    .light{
        .push-top,
        .area {
            color: #333;
        }
        .area {
            .area-sales {
                background: #F1F4FC;
                ul{
                    color: #666;
                    li .num{
                        color: #4064D4;
                        background: #DCE6F9;
                    }
                    li:hover,
                    li.active {
                        color: #4064D4;
                    }
                }
            }
            .area-distribution{
                border: 1px dashed #4064D4;
                background: #F1F4FC;
                .tips {
                    color: #999;
                }
                .select-wait{
                    /deep/ .el-carousel__container {
                        .head {
                            color: #4064D4;
                        }
                        .title {
                            background: #dbe4fc;
                            color: #666;
                        }
                        .list-group-item{
                            .customerName,
                            .contractorName,
                            .contractorAccount,
                            .remark {
                                color: #666;
                            }
                        }
                    }
                }
                .pages {
                    span {
                        color: #4064D4;
                    }
                }
            }
            .area-wait {
                color: #666;
                background: #F1F4FC;
                font-family: PingFangSC-Regular;
                .title{
                    background: #dbe4fc;
                }
            }
        }
        .wait-deal {
            span {
                color: #4064D4;
                background: #DCE6F9;
            }
        }
    }
</style>
