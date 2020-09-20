<template>
    <div class="apply-page">
        <el-container>
            <el-row style="width:400px;margin-left:18px;">
                <el-form
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-width="100px"
                    size="medium"
                >
                    <el-form-item label="所属板块" prop="industryCategory">
                        <el-select
                            v-model="form.industryCategory"
                            @change="changeHand"
                        >
                            <el-option
                                v-for="(v, k) in industryCategory"
                                :label="CATEGORY[v + '']"
                                :value="v"
                                :key="k"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="customerName">
                        <el-input
                            v-model.trim="form.customerName"
                            maxlength="50"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="业务编号" prop="batchNum">
                        <el-input
                            v-model="form.batchNum"
                            maxlength="50"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="上传附件"
                        required
                        style="text-align: left"
                    >
                        <div class="shangc">
                            <c-upload
                                accept=".xlsx,.xls"
                                class="upload-file"
                                type="primary"
                                size="mini"
                                :multiple="true"
                                v-on:changehand="
                                    v => {
                                        uploadHand(v);
                                    }
                                "
                                plain
                            >
                                <i
                                    class="iconfont icon-tongyong-daochutubiao"
                                ></i>
                                上传文件
                            </c-upload>
                        </div>
                        <span
                            class="c_C1 f12"
                            style="color: rgba(255,255,255,0.80);"
                            >文件仅支持
                            {{ isPDF ? ".pdf" : ".xls和.xlsx" }} 格式</span
                        >
                        <ul
                            class="el-upload-list el-upload-list--text"
                            v-if="form.files.length"
                        >
                            <li
                                class="el-upload-list__item is-success"
                                v-for="(v, k) in form.files"
                                :key="k"
                            >
                                <!---->
                                <a class="el-upload-list__item-name"
                                    ><i class="el-icon-document"></i
                                    >{{ v.name }}</a
                                >
                                <label
                                    class="el-upload-list__item-status-label"
                                >
                                    <i
                                        class="el-icon-upload-success el-icon-circle-check"
                                    ></i>
                                </label>
                                <i
                                    class="el-icon-close"
                                    @click="delFile(k)"
                                ></i>
                            </li>
                        </ul>
                    </el-form-item>
                </el-form>

                <!-- <div class="mt60">
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </div> -->

                <input
                    type="file"
                    v-if="isFile"
                    id="file"
                    :accept="isPDF ? '.pdf' : '.xls,.xlsx'"
                    @change="changeFile"
                    style="display:none"
                />
            </el-row>
        </el-container>

        <el-dialog :visible.sync="isDialog" width="30%">
            <span>删除已上传文件？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialog = false">取 消</el-button>
                <el-button type="primary" @click="(isDialog = false), delFile()"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isDialog4" width="30%" append-to-body>
            <span
                >上传文件中有{{
                    repeatNum
                }}张发票为重复发票,是否确认要上传?</span
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialog4 = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="(isDialog4 = false), submitFormOk()"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    props: {
        type: {
            type: Number,
            default: 1
        }
    },

    data() {
        var validateCustomer = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入公司名称"));
            } else {
                this.ajax
                    .post("/invoice/customer/name/verify", this.form)
                    .then(res => {
                        if (res.code === "200") {
                            // result: 0 不能使用， 1 可以使用
                            if (res.data.result === 0) {
                                callback(
                                    new Error("客户名称与其所属板块不匹配!")
                                );
                            } else {
                                this.isValid = true;
                                callback();
                            }
                        }
                    });
            }
        };
        return {
            repeatNum: "",
            isValid: false,
            isFile: true,
            isDialog: false,
            isDialog4: false,
            industryCategory: {},
            form: {
                files: [],
                customerName: "",
                industryCategory: 1, // 行业分类(0:其他 1:基建 2:医疗 3:能源)
                batchNum: "",
                preCheck: 1
            },
            ids: [],
            files: [],
            rules: {
                industryCategory: [
                    {
                        required: true,
                        message: "请选择所属板块",
                        trigger: "change"
                    }
                ],
                customerName: [
                    {
                        required: true,
                        validator: validateCustomer,
                        trigger: "blur"
                    }
                ],
                batchNum: [
                    {
                        required: true,
                        message: "请输入业务编号",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: mapState({
        token: state => state.user.token,
        isPDF() {
            return this.type === 1;
        }
    }),
    mounted() {
        this.getCategory();
    },
    methods: {
        /* 上传文件 */
        async uploadHand(files) {
            // console.log('files',files);
            // this.file = files
            console.log(files.length, "files");
            // console.log(fileArr, "fileArr.length");
            // let fileArr = Array.from(files);
            for (var i = 0; i < files.length; i++) {
                this.form.files.push(files[i]);
            }
            // console.log(this.file);
        },
        gotoFile(fileId) {
            return `${this.fileAPI}${fileId}?access_token=${this.token}`;
        },
        /* 切换所属板块 */
        changeHand() {
            this.form.customerName = "";
        },
        handleClick() {
            document.querySelector("#file").click();
            document.querySelector("#file").value = "";
        },
        /* 获取板块分类 */
        async getCategory() {
            let res = await this.$http(
                "/invoice/industryCategory",
                {},
                { type: "get" }
            );
            if (res.code === "200") {
                this.industryCategory = res.data;
            }
        },
        /* 上传文件 */
        async changeFile() {
            let fileDom = document.querySelector("#file");

            if (!fileDom.files[0]) return;
            if (this.form.files.lenght >= 10) {
                this.$message.error("附件最多可上传10个");
                return;
            }

            this.isFile = false; // 清空文件内容， 兼容IE10以下

            if (fileDom.files[0].size > 1048576 * 60) {
                this.$message.error("PDF文件大小不超过60M！");
                this.isFile = true;
                document.querySelector("#file").value = "";
                return;
            }

            this.form.files.push(fileDom.files[0]);
            this.isFile = true;
            document.querySelector("#file").value = "";
        },
        /* 删除文件 */
        async delFile(inx) {
            this.form.files.splice(inx, 1);
        },
        submitForm() {
            if (this.form.files.length === 0) {
                this.$message.error("至少上传一个附件");
                return;
            }
            if (!this.isValid) {
                this.$message.error("客户名称与其所属板块不匹配");
                return;
            }
            let file = new FormData();
            Object.keys(this.form).map(v => {
                if (v === "files") {
                    this.form[v].map((c, k) => {
                        file.append("files", this.form[v][k]);
                    });
                } else {
                    file.append(v, this.form[v]);
                }
            });

            console.log(this.form, file);

            // return

            this.$refs["form"].validate(valid => {
                if (valid) {
                    let url = this.isPDF
                        ? "/zuul/invoice/offlineInvoice/check/save"
                        : "/zuul/invoice/excel/import";

                    this.$http(
                        url,
                        {
                            fileArr: this.form.files
                        },
                        { type: "upload" }
                    ).then(v => {
                        this.$emit("success");
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submitFormOk() {
            if (this.form.files.length === 0) {
                this.$message.error("至少上传一个附件");
                return;
            }
            if (!this.isValid) {
                this.$message.error("客户名称与其所属板块不匹配");
                return;
            }
            let file = new FormData();
            this.form.preCheck = 0;
            Object.keys(this.form).map(v => {
                if (v === "files") {
                    this.form[v].map((c, k) => {
                        file.append("files", this.form[v][k]);
                    });
                } else {
                    file.append(v, this.form[v]);
                }
            });
            this.$refs["form"].validate(valid => {
                if (valid) {
                    // let url = this.isPDF
                    //     ? "/zuul/invoice/offlineInvoice/check/save"
                    //     : "/zuul/invoice/excel/import";
                    // this.ajax
                    //     .upload(url, file, { timeout: 1000 * 60 * 12 })
                    //     .then(v => {
                    //         this.$emit("success");
                    //         this.$message.success("导入成功");
                    //     });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.apply-page /deep/ {
    .el-select {
        width: 100%;
    }
    .el-form-item {
        margin-bottom: 26px;
    }
    .mr10 {
        border-color: #0486fe;
        color: #0486fe;
        font-size: 12px;
    }
}
</style>
