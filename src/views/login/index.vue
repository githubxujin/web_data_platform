<template>
    <div class="login">
        <div class="login-wrap">
            <div class="login-logo">
                <img src="../../assets/images/login/logo.png" class="login-animate-logo" />
            </div>
            <div class="login-form">
                <div class="logo-center">
                    <div class="login-title"></div>
                </div>
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form-wrap" @submit.native.prevent>
                    <div class="form-item">
                        <div class="radio-box">
                            <div class="radio-item" :class="{act: loginForm.userType == 1}" @click="loginForm.userType=1">域账号</div>
                            <div class="radio-item" :class="{act: 2 == loginForm.userType}" @click="loginForm.userType=2">合作机构账号</div>
                        </div>
                    </div>
                    <el-form-item class="login-item" prop="username">
                        <el-input placeholder="请输入账户" v-model="loginForm.username" auto-complete="off">
                            <i slot="prefix" class="iconfont icon-shujuzhongxin-yonghu"></i>
                        </el-input>

                    </el-form-item>
                    <el-form-item class="login-item" prop="password">
                        <el-input placeholder="请输入密码" v-model="loginForm.password" type="password" show-password auto-complete="off">
                            <i slot="prefix" class="iconfont icon-shujuzhongxin-mima"></i></el-input>
                    </el-form-item>
                    <el-form-item class="login-item" prop="captchaCode">
                        <validate @success="SetToken" :siteKey="siteKeyValue"></validate>
                    </el-form-item>
                    <el-form-item class="login-item">
                        <el-button class="login-submit" native-type="submit" @click="handleLogin">登录
                        </el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>
<script>
import { validUsername } from "@/utils/validate";
import Validate from "@/components/common/NC.vue";


export default {
    name: "Login",
    components: {
        Validate,
    },
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("密码必须大于6位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "",
                password: "",
                captchaCode: "",
                userType: 1,
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword
                    }
                ],
                captchaCode: [
                    {
                        required: true,
                        message: "请先进行验证"
                    }
                ]
            },
            passwordType: "password",
            redirect: undefined,
            siteKeyValue: "",
            my_env: process.env.VUE_APP_ENV || "dev",
            isPro: process.env.NODE_ENV === "production"
        };
    },

    created () {
        this.siteKeyValue =
            this.my_env === "pro"
                ? "63b8ebed92dde660f167d95360dfc2bf"
                : "a0545dd14f1e8ce94a38cb05b027b7e6";

    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        SetToken (val) {
            this.loginForm.captchaCode = val;
        },
        showPwd () {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin () {
            if (process.env.VUE_APP_ENV === "dev") {
                this.loginForm.captchaCode = "8888";
            }
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then((res) => {
                            res && this.$router.push({ path: this.redirect || "/" });
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.logo-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
#particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
}
/deep/ .iconfont {
    color: #3facae;
}
/deep/ .el-icon-s-custom:before {
    color: #3facae;
}
/deep/ .el-icon-lock:before {
    color: #3facae;
}
/deep/ .el-input__inner {
    text-indent: 24px;
    height: 48px;
    line-height: 48px;
    border-radius: 0;
    border: none;
    background: none;
    border-bottom: 2px solid #1e4246;
    &:focus {
        border-bottom: 2px solid #3facae;
    }
}

.login {
    &-wrap-title {
        font-size: 24px;
        color: #93eeff;
        letter-spacing: 0.72px;
        text-align: center;
        line-height: 31px;
        margin-top: -50px;
    }
    &-title {
        width: 150px;
        height: 48px;
        background: url('../../assets/images/logo.png') no-repeat 40% center;
        background-size: 100px 30px;
    }
    display: flex;
    height: 100vh;
    background-image: url('../../assets/images/login/bg.png');

    background-size: cover;
    &-wrap {
        width: 1400px;
        margin: 0 auto;
        display: flex;
        /* background: red; */
        align-items: center;
        justify-content: space-between;
    }
    &-submit {
        width: 100%;
        height: 50px;
        background-image: linear-gradient(90deg, #2e4143 0%, #31333a 100%);
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 1.33px;
        text-align: center;
        border: none;
    }

    &-animate-logo {
        object-fit: cover;
        width: 520px;
        height: 428px;
        margin-left: 150px;
        position: relative;
        z-index: 99999999;
        /* margin-top: 190px; */
        /* animation: rotate 10s linear infinite; */
    }
    &-form {
        margin-right: 110px;
        width: 470px;
        height: 430px;
        margin-top: 50px;
        background-size: 470px 430px;
        position: relative;
        z-index: 99999999;
    }
    &-form-wrap {
        width: 400px;
        margin: 0 auto;

        .el-input {
            width: 360px;
        }
    }
    &-item {
        margin: 20px;
    }
}
.radio-box {
    position: relative;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    color: #a0a3a8;
    z-index: 1;
    width: 90%;
    margin: 0 auto;
    &::before {
        position: absolute;
        left: 0;
        bottom: 1px;
        width: 100%;
        border-bottom: 2px solid #1e4246;
        content: '';
    }

    .radio-item {
        position: relative;
        cursor: pointer;
        height: 45px;
        line-height: 45px;
        z-index: 2;
        width: 50%;
        text-align: center;

        &.act {
            color: #43a1ac;
            border-bottom: 2px solid #43a1ac;
            margin-bottom: 1px;
        }
    }
}
</style>