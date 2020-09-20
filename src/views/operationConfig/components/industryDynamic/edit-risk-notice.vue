<template>
    <div>
        <el-dialog :title="$parent.isCopy ? '复制':'编辑'" :visible.sync="$parent.dialogVisibleEdit" width="800px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px;margin-left:50px;">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收邮箱" prop="emails">
                    <el-input v-model.trim="ruleForm.emails"></el-input>
                </el-form-item>
                <el-form-item label="接收类型" prop="templateType">
                    <el-select v-model="ruleForm.templateType" @change="typeOfReceipt" placeholder="请选择" style="width: 240px">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in receptionList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 固定公众号 -->
                <div class="isSelectAccount" v-if="isShowLabelOfAccount===2">
                    <span class="el-icon-plus plusClass" @click="addDomain"></span>
                    <div v-for="(domain, index) in ruleForm.domains" :key="'a'+index">
                        <el-form-item label="类别选择" label-width="100" :prop="'domains.' + index + '.industryType'" :rules="{ required: true, message: '请选择', trigger: ['blur', 'change']}">
                            <el-select v-model="domain.industryType" placeholder="请选择" style="width: 240px" @change="(val)=>{industryTypeChange(val,index)}">
                                <el-option :label="item.label" :value="item.value" v-for="(item, indexb) in officialTypeList" :key="indexb+'b'"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="selectSelect" label label-width="100" :prop="'domains.' + index + '.relationInfo'" :rules="{ required: true, message: '请选择', trigger: 'blur'}">
                            <el-select multiple collapse-tags v-model="domain.relationInfo" placeholder="请选择" style="width: 240px">
                                <el-option :label="item.accountName" :value="item.account" v-for="(item, indexa) in relationInfoList[index]" :key="indexa+'c'"></el-option>
                            </el-select>
                        </el-form-item>
                        <span class="el-icon-minus plusClass" @click.prevent="removeDomain(domain)"></span>
                    </div>

                    <div class="con-wrap bot-wrap">
                        <div class="tabs-title">
                            风险字段
                        </div>
                        <div class="shangc ml10 mb10">
                            <c-upload accept=".xlsx,.xls" class="upload-file" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
                                快速导入
                            </c-upload>
                            <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                        </div>
                        <el-tag :key="tag" v-for="tag in keywordsList" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm"></el-input>
                        <el-button v-else class="button-new-tag" size="mini" @click="showInput">新增 +</el-button>
                        <transition name="slide-fade">
                            <div class="tishi" ref="tishi" v-show="tishiShow">请填写</div>
                        </transition>
                    </div>
                </div>
                <!-- 固定标签 -->
                <div class="isSelectLabel" v-if="isShowLabelOfAccount===1">
                    <span class="el-icon-plus plusClass2" @click="addDomain2"></span>
                    <div v-for="(domain2, index) in ruleForm.domains2" :key="'a'+index">
                        <el-form-item label="标签选择" class="first_el_form_item" :prop="'domains2.' + index + '.industryType'" :rules="{ required: true, message: '请选择', trigger: ['blur', 'change']}">
                            <el-select v-model="domain2.industryType" placeholder="请选择" style="width: 240px" @change="(val)=>{industryTypeChange2(val,index)}">
                                <el-option :label="item.label" :value="item.value" v-for="(item, index) in officialTypeList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" label-width="100" v-for="(itemf,indexf) in domain2.fixLabelSelectList" :key="indexf+'f'" :prop="'domains2.'+index + '.idList' + ('.id'+indexf)"
                            :rules="{ required: true, message: '请选择', trigger: 'blur'}">
                            <el-select v-model="domain2.idList['id'+indexf]" placeholder="请选择" style="width: 240px" @change="((val)=>{industryTypeChange3(val,index,indexf)})">
                                <el-option :label="j.name" :value="j.id" v-for="(j, k) in itemf" :key="'j'+k"></el-option>
                            </el-select>
                        </el-form-item>
                        <span class="el-icon-minus plusClass2" @click.prevent="removeDomain2(domain2)"></span>
                    </div>
                    <div class="con-wrap bot-wrap">
                        <div class="t-title">
                            风险字段
                            <el-select v-model="isShowIntoAdd" placeholder="请选择" style="width: 66px;margin-left: 8px;">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </div>
                        <div v-if="isShowIntoAdd">
                            <div class="shangc ml10 mb10">
                                <c-upload accept=".xlsx,.xls" class="upload-file" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand2(v)}">
                                    快速导入
                                </c-upload>
                                <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                            </div>
                            <el-tag :key="tag" v-for="tag in accountlsList" closable :disable-transitions="false" @close="handleClose1(tag)">{{tag}}</el-tag>
                            <el-input class="input-new-tag input-new-tag1" size="small" v-if="inputVisible1" v-model="inputValue1" ref="saveTagInput1" @blur="handleInputConfirm1"></el-input>
                            <el-button v-else class="button-new-tag button-new-tag1" size="mini" @click="showInput1">新增 +</el-button>
                        </div>
                    </div>

                </div>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="$parent.dialogVisibleEdit = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { receptionList, officialTypeList, deepClone } from "@/utils/common"
export default {
    data() {
        return {
            receptionList,
            officialTypeList,
            relationInfoList: [],
            keywordsList: [],
            accountlsList: [],
            inputVisible: false,
            inputVisible1: false,
            inputValue: "",
            inputValue1: "",
            isShowIntoAdd: 0,
            isShowLabelOfAccount: '',
            file: [],
            file2: [],
            tishiShow: false,
            ruleForm: {
                domains: [{
                    industryType: '',
                    relationInfo: [],
                }],
                domains2: [{
                    industryType: '',
                    idList: {},
                    fixLabelSelectList: [],
                    relationInfo: ''
                }],
                name: "",
                emails: "",
                templateType: "",
                id: "",
            },
            rules: {
                name: [{ required: true, message: "请填写名称", trigger: "blur" }],
                emails: [{ type: 'email', required: true, message: "请填写正确邮箱", trigger: "blur" }],
                templateType: [{ required: true, message: "请选择", trigger: "blur" }]
            }
        }
    },
    watch: {
        keywordsList(newName, oldName) {
            if (newName) {
                this.tishiShow = false
            }
        }
    },
    methods: {
        // 删除组类
        removeDomain(item) {
            var index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains.splice(index, 1)
            }
        },
        removeDomain2(item) {
            var index = this.ruleForm.domains2.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains2.splice(index, 1)
            }
        },
        // 新增组类
        addDomain() {
            this.ruleForm.domains.push({
                industryType: '',
                relationInfo: [],
                relationInfoList: []
            });
        },
        addDomain2() {
            this.ruleForm.domains2.push({
                industryType: '',
                idList: {},
                fixLabelSelectList: [],
                relationInfo: ''
            });
        },
        // 固定标签-接收类型监听
        industryTypeChange2(industryType, index) {
            this.ruleForm.domains2[index].fixLabelSelectList = []
            this.ruleForm.domains2[index].industryType = industryType
            this.ruleForm.domains2[index].idList = {}
            this.ruleForm.domains2[index].relationInfo = ''
            this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: 0, industryType }, { type: "get" }).then(res => {
                if (res.code === '200') {
                    if (res.data && res.data.length > 0) {
                        this.$set(this.ruleForm.domains2[index].fixLabelSelectList, 0, res.data)
                    }
                }
            })
        },
        // 固定标签-子节点监听
        industryTypeChange3(industryType, index, indexf) {
            let idListLength = Object.getOwnPropertyNames(this.ruleForm.domains2[index].idList).length
            this.ruleForm.domains2[index].fixLabelSelectList.splice(indexf + 1, idListLength - 1)
            for (let i = indexf + 1; i < idListLength; i++) {
                delete this.ruleForm.domains2[index].idList['id' + i]
            }
            this.ruleForm.domains2[index].relationInfo = industryType
            var idName = 'id' + indexf
            let domains2industryType = this.ruleForm.domains2[index].industryType
            this.$set(this.ruleForm.domains2[index].idList, idName, industryType)
            this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: industryType, industryType: domains2industryType }, { type: "get" }).then(res => {
                if (res.data && res.data.length > 0) {
                    this.$set(this.ruleForm.domains2[index].fixLabelSelectList, indexf + 1, res.data)
                }
            })
        },
        // 固定标签-新增
        fixedLabel() {
            let params = deepClone(this.ruleForm.domains2)
            params.map((item, index) => {
                delete item.fixLabelSelectList
                delete item.idList
                item.id = this.$parent.id
                item.name = this.ruleForm.name
                item.emails = this.ruleForm.emails
                item.templateType = this.ruleForm.templateType
                item.keywords = this.isShowIntoAdd ? this.accountlsList.toString() : ''
            })
            params.map((item, index) => {
                if( index!==0 ){
                    delete item.id
                    item.relationInfo = item.relationInfo.toString()
                }
            })
            if(this.$parent.isCopy){
                params.map((item, index) => {
                    delete item.id
                })
            }
            
            let relationInfo = []
            params.forEach((item,index)=>{
                if(item.relationInfo) relationInfo.push(item.relationInfo+'')
            })
            
            let relationInfoSet = Array.from(new Set(relationInfo))
            let actual = [{
                relationInfo:relationInfoSet.toString(),
                name:params[0].name,
                emails:params[0].emails,
                keywords: params[0].keywords,
                templateType:params[0].templateType,
                id:this.isCopy?'':params[0].id,
                industryType:params[0].industryType
            }]
            this.ajax
                .json('/dcp/server/wx/article/notify/save', actual)
                .then(res => {
                    this.$parent.dialogVisibleEdit = false;
                    this.$parent.getList();
                });
        },
        // 固定公众号-类别监听
        industryTypeChange(industryType, index) {
            this.ruleForm.domains[index].relationInfo = []
            this.ajax.json(`/dcp/server/wx/account/select`, { industryType }, { type: "get" }).then(res => {
                this.$set(this.relationInfoList, index, res.data)
            })
        },
        // 固定公众号-新增
        fixedAccount() {
            if (this.keywordsList.length <= 0) {
                this.tishiShow = true
                return
            }
            let params = deepClone(this.ruleForm.domains)
            params.map((item, index) => {
                item.id = this.$parent.id
                item.name = this.ruleForm.name
                item.emails = this.ruleForm.emails
                item.templateType = this.ruleForm.templateType
                item.relationInfo = item.relationInfo.toString()
                item.keywords = this.keywordsList.toString()
            })
            params.map((item, index) => {
                if( index!==0 ){
                    delete item.id
                }
            })
            if(this.$parent.isCopy){
                params.map((item, index) => {
                    delete item.id
                })
            }
            let relationInfo = []
            params.forEach((item,index)=>{
                if(item.relationInfo) relationInfo.push(item.relationInfo)
            })
            let relationInfoSet = Array.from(new Set(relationInfo))
            let actual = [{
                relationInfo:relationInfoSet.toString().split(',').toString(),
                name:params[0].name,
                emails:params[0].emails,
                keywords: params[0].keywords,
                templateType:params[0].templateType,
                id:this.isCopy?'':params[0].id,
                industryType:params[0].industryType
            }]
            this.ajax
                .json('/dcp/server/wx/article/notify/save', actual)
                .then(res => {
                    this.$parent.dialogVisibleEdit = false;
                    this.$parent.getList();
                });
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                // 判断新增的industryType
                this.ruleForm.domains2.forEach((item,index)=>{
                    if(index!==0){
                        let isTrue = item.industryType!==this.ruleForm.domains2[0].industryType
                        if(isTrue){
                            this.$message.error('行业类别不一致')
                            valid = false
                            return false
                        }
                    }
                })
                this.ruleForm.domains.forEach((item,index)=>{
                    if(index!==0){
                        let isTrue = item.industryType!==this.ruleForm.domains[0].industryType
                        if(isTrue){
                            this.$message.error('行业类别不一致')
                            valid = false
                            return false
                        }
                    }
                })
                if (valid) {
                    if (this.isShowLabelOfAccount === 1) {
                        this.fixedLabel()
                    } else if (this.isShowLabelOfAccount === 2) {
                        this.fixedAccount()
                    }
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        // 接收类型-监听
        typeOfReceipt(value) {
            this.isShowLabelOfAccount = value
        },
        // 风险字段-固定标签
        handleClose1(tag) {
            this.accountlsList.splice(this.accountlsList.indexOf(tag), 1)
        },
        // 风险字段-固定公众号
        handleClose(tag) {
            this.keywordsList.splice(this.keywordsList.indexOf(tag), 1)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        showInput1() {
            this.inputVisible1 = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput1.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.keywordsList.forEach(v => {
                    if (v === inputValue) {
                        this.isIconfont = true
                        this.$confirm("风险字段标签中已存在该关键字", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消"
                        }).then(() => {
                            this.inputValue = ""
                            this.inputVisible = false
                        })
                        return
                    }
                })
                if (this.isIconfont) {
                    this.isIconfont = false
                    return
                }
                this.keywordsList.push(inputValue)
                this.inputVisible = false
                this.inputValue = ""
            }
        },
        handleInputConfirm1() {
            let inputValue1 = this.inputValue1
            if (inputValue1) {
                this.accountlsList.forEach(v => {
                    if (v === inputValue1) {
                        this.isIconfont = true
                        this.$confirm("风险字段标签中已存在该关键字", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消"
                        }).then(() => {
                            this.inputValue1 = ""
                            this.inputVisible1 = false
                        })
                        return
                    }
                })
                if (this.isIconfont) {
                    this.isIconfont = false
                    return
                }
                this.accountlsList.push(inputValue1)
                this.inputVisible1 = false
                this.inputValue1 = ""
            }
        },
        /* 上传文件 */
        async uploadHand(files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/server/wx/article/notify/import", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.$message.success("导入成功");
                        res.data.forEach((item, index) => {
                            if (item['keyword']) {
                                this.keywordsList.push(item['keyword'])
                            }
                        })
                    }
                });
            }

        },
        async uploadHand2(files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file2.push(files[i]);
            }
            let data = {
                fileList: this.file2
            };
            if (this.file2 && this.file2.length > 0) {
                this.$http("/dcp/server/wx/article/notify/import", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.$message.success("导入成功");
                        res.data.forEach((item, index) => {
                            if (item['keyword']) {
                                this.accountlsList.push(item['keyword'])
                            }
                        })
                    }
                });
            }

        },
        // 关闭弹窗后清空数据
        closeDialog() {
            this.relationInfoList = []
            this.keywordsList = []
            this.accountlsList = []
            this.inputValue = ""
            this.inputValue1 = ""
            this.isShowLabelOfAccount = ""
            this.isShowIntoAdd = 0
            this.file = []
            this.ruleForm = {
                domains: [{
                    industryType: '',
                    relationInfo: [],
                }],
                domains2: [{
                    industryType: '',
                    idList: {},
                    fixLabelSelectList: [],
                    relationInfo: ''
                }],
                name: "",
                emails: "",
                templateType: "",
                id: "",
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dark {
    .bot-wrap {
        .el-tag {
            margin-right: 10px;
            font-size: 14px;
            color: #43a1ac;
            background: #293e42;
            border-radius: 3px;
            height: 24px;
            line-height: 24px;
            border: 0;
            margin-bottom: 10px;
            /deep/ .el-icon-close {
                color: #43a1ac;
                &:hover {
                    background: transparent;
                }
            }
        }
    }
    .button-new-tag {
        margin-right: 10px;
        width: 90px;
        height: 25px;
        vertical-align: top;
        line-height: 23px;
        padding-top: 0;
        padding-bottom: 0;
        background: #1e292e;
        color: #43a1ac;
        border: 1px solid #366f71;
        letter-spacing: 0.44px;
    }
    .plusClass {
        position: absolute;
        z-index: 99;
        top: 30px;
        color: #43a1ac;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
        &.el-icon-plus {
            right: 173px;
        }
        &.el-icon-minus {
            right: 130px;
        }
    }
    .plusClass2 {
        position: absolute;
        z-index: 99;
        top: 8px;
        color: #43a1ac;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
        &.el-icon-plus {
            right: 322px;
        }
        &.el-icon-minus {
            right: 273px;
        }
    }
    .con-wrap {
        .t-title {
            color: rgba(255, 255, 255, 0.8);
        }
    }
}
.light {
    .bot-wrap {
        .el-tag {
            margin-right: 10px;
            font-size: 14px;
            color: #4064d4;
            background: #fff;
            border: 1px solid #4064d4;
            border-radius: 3px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 10px;
            /deep/ .el-icon-close {
                color: #43a1ac;
                &:hover {
                    background: transparent;
                }
            }
        }
    }
    .button-new-tag {
        width: 90px;
        height: 25px;
        vertical-align: top;
        line-height: 23px;
        padding-top: 0;
        padding-bottom: 0;
        letter-spacing: 0.44px;
        background: #ffffff;
        border: 1px solid #4064d4;
        border-radius: 3px;
        :hover {
            color: #4064d4 !important;
            border-radius: 3px;
        }
    }
    .plusClass {
        position: absolute;
        z-index: 99;
        top: 30px;
        color: #4064d4;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #4064d4;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
        &.el-icon-plus {
            right: 173px;
        }
        &.el-icon-minus {
            right: 130px;
        }
    }
    .plusClass2 {
        position: absolute;
        z-index: 99;
        top: 8px;
        color: #4064d4;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #4064d4;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
        &.el-icon-plus {
            right: 322px;
        }
        &.el-icon-minus {
            right: 273px;
        }
    }
    .con-wrap {
        .t-title {
            color: #333;
        }
    }
    .isSelectAccount {
        .tabs-title{
            color: #333;
            margin-left: 10px;
        }
    }
}
.isSelectAccount {
    width: 750px;
    padding: 0 30px 20px 53px;
    position: relative;
    .t-title {
        &::before {
            color: #53dcec;
            content: '*';
            margin-right: 1px;
        }
    }
    .tishi {
        width: 76px;
        height: 28px;
        background: #37393e;
        color: #dd5e3e;
        padding: 8px 20px 8px 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        left: 10px;
        border-radius: 2px;
        top: 30px;
        z-index: 999999999;
        font-size: 12px;
        position: absolute;
        top: 200px;
        left: 60px;
        &::before {
            content: ' ';
            border-bottom: 4px solid #37393e;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            position: absolute;
            top: -4px;
            left: 20px;
        }
    }

    /deep/ .el-form-item {
        display: inline-block;
    }
    .riskBox {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
    }
    .inputShow.el-input {
        width: 100px;
    }
}
.isSelectLabel {
    width: 750px;
    padding: 0 30px 20px 0;
    position: relative;

    /deep/ .el-form-item:nth-child(n + 2) {
        display: inline-block;
        margin-left: 139px;
        // margin-right: 20px;
    }
    .riskBox {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
    }
    .inputShow.el-input {
        width: 100px;
    }
    .childform {
        margin-left: 68px;
        /deep/ .el-form-item {
            display: inline-block;
            width: 215px;
        }
    }
    // .el-form-item:nth-child(2n){
    //     margin-left: 139px;
    //     margin-right: 20px;
    // }
    .con-wrap {
    margin-left: 62px;
    .t-title {
        font-size: 14px;
        margin-bottom: 20px;
    }
}
}
.iconfont.icon-yunpingtai-xinzeng1 {
    margin-left: -45px;
    font-size: 40px;
    color: rgba(255, 255, 255, 0.8);
}
.button-into-tag {
    width: 96px;
    height: 24px;
    line-height: 23px;
    padding-top: 0;
    padding-bottom: 0;
    color: #d3d3d4;
    letter-spacing: 0.44px;
    border-radius: 3px;
    margin-left: 16px;
    margin-bottom: 10px;
}


.bot-wrap {
    /deep/ .input-new-tag {
        width: 150px;
        height: 24px;
        color: #0486fe;
        margin-right: 10px;
        .el-input__inner {
            height: 24px;
        }
    }
}
.shangc {
    .el-button.el-button--primary.el-button--mini.is-plain {
        border-radius: 3px;
    }
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
/deep/ .el-dialog__body {
    padding-left: 0;
}
.isSelectAccount {
    /deep/ .el-form-item__label {
        width: unset !important;
    }
    /deep/ .el-form-item__content {
        margin-left: 0 !important;
    }
    /deep/ .el-form-item{
        display: block;
    }
    /deep/ .selectSelect{
        margin-left: 88px;
    }
}
</style>

