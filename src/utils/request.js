import axios from 'axios'
import $message from "element-ui/lib/message"
import {
    Loading
} from 'element-ui'
// import Loading from '@/components/loading'
import store from '@/store'
import {
    getToken
} from '@/utils/auth'
import env from '@/config/env';

function getParams(data) {
    let dataStr = ""; // 数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += `${key}=${encodeURIComponent(data[key])}&`;
    });

    if (dataStr !== "") {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
    }
    return dataStr;
}

let loadingInstance = null;
let count = 0;
// create an axios instance
const service = axios.create({
    baseURL: env,
    method: "post", // 默认方式为post
    timeout: 60000, // 设置超时时间为60秒
    toastDuration: 3000,
    errBack: false, // 接口错误是否自动回退上一个页面,
    isLoading: true, // 接口是否需要loading
    isToken: true, // 接口是否需要token
    isLoginPage: false, //登陆页面，注册页面时应该为false，resCode为350时候不跳转到登陆页面
    isReturnMsg: false, // 是否需要抛出错误信息，
    isThird: false // 是否是第三方token
})

// request interceptor
service.interceptors.request.use(
    config => {
        count++;
        // do something before request is sent
        loadingInstance = Loading.service({
            lock: false,
            text: "加载中...",
            spinner: "icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        })
        let url = config.url;
        if (url.indexOf("/") !== 0) {
            url = `/${url}`;
        }
        // config.url = env + url
        config.url = env + url
        if (config.isToken && store.getters.token) {
            config.headers.Authorization = "bearer" + " " + getToken()
        }
        if (config.method.toUpperCase() === "POST") {
            // 统一增加客户端id区分客户端类型
            // 默认请求方式 json格式( type = 'json')
            if (config.type.toUpperCase() === "JSON") {
                config.headers["Content-Type"] = "application/json";
                config.data = JSON.stringify(config.data);
            }

            //  formdata 格式参数( type = 'formdata')
            // 写法-->  this.$http('/demoUrl',params,{type:'formdata'}).then().catch()
            if (config.type.toUpperCase() === "FORMDATA") {
                // 统一增加客户端id区分客户端类型
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                const formData = new FormData();
                for (const key in config.data) {
                    formData.append(key, config.data[key]);
                }
                config.data = formData;
            }

            //  上传文件格式参数( type = 'upload')
            // 写法-->  this.$http('/uploadFile', { params: data, file: { file: fileData // 获取的文件 }, { isReturnMsg: true, type: 'upload'}).then().catch()
            if (config.type === "upload") {
                // 统一增加客户端id区分客户端类型
                config.headers["Content-Type"] = "multipart/form-data";
                config.headers.Accept = "*/*";
                // 上传文件
                const formData = new FormData();
                const fileLists = config.data.fileList || {};
                for (const key in config.data.params) {
                    formData.append(key, config.data.params[key]);
                }
                for (let i = 0; i < fileLists.length; i++) {
                    formData.append("file", fileLists[i]);
                }
                const fileArr = config.data.fileArr || {}
                for (let i = 0; i < fileArr.length; i++) {
                    formData.append("files", fileArr[i]);
                }
                config.data = formData;
            }
        }
        //  get请求参数
        // 写法--> this.$http('/demoUrl',params,{type:'get'}).then().catch()
        if (config.method.toUpperCase() === "GET") {
            // 统一增加客户端id区分客户端类型
            const keys = Object.keys(config.data);
            // console.log(config.url, 'config.url')
            config.url =
                keys.length > 0 ? `${url}?${getParams(config.data)}` : url;
            delete config.data;
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        count--;
        if (count === 0) {
            loadingInstance.close();
        }
        if (!res) {
            return $message.error(res.message || "请求超时");
        } else {
            if (res.code === "100") {
                return $message.error(res.message);
            } else if (res.code === '401') {
                return window.location.href = "/login";
            } else if (res.code === '450') {
                return $message.error(res.message)
            } else if (res.code === '400') {
                return $message.error(res.message)
            } else if (res.code === '997' || res.code === '999') {
                return $message.error(res.message)
            } else {
                return res

            }
        }
    },
    error => {
        count--;
        count === 0 && loadingInstance.close()
        const res = error.response;
        console.log('err', res)
        if (res) {
            // 非200 的错误，有错误码
            const status = res.status;
            const data = res.data;
            let errMessage = "";
            switch (status) {
                case 500:
                    errMessage = "服务器开小差了，请稍候再试";
                    break;
                case 404:
                    errMessage = "404,接口不存在";
                    break;
                default:
                    errMessage = data.message || "接口请求失败！";
                    break;
            }

            // 全局错误提示
            return new Promise(reject => {
                if (res.config.isReturnMsg) {
                    reject(data);
                } else {
                    loadingInstance.close()
                    $message.error(errMessage || "");
                    return false;
                }
            });
        } else {
            console.log(200)
            // 非200 的错误，有错误码
            try {
                return new Promise(() => {
                    if (error.message.indexOf("timeout") != -1) {
                        $message.error("接口超时");
                    } else if (error.message.indexOf("Network Error") != -1) {
                        $message.error("网络连接错误");
                    } else {
                        $message.error(error.message);
                        return false;
                    }
                });
            } catch (e) {
                $message.error(e.message || "请求catch的错误");
            }
        }
    }
)


export default function (url, data = {}, config = {}) {
    config.method = config.type === "get" ? "get" : "post";
    config.type = config.type ? config.type : "json";
    config.url = url;
    config.data = data;
    if (config.type.toUpperCase() === "EXPORT") {
        config.data.access_token = getToken()
        window.open(env + url + (Object.keys(data).length ? '?' + getParams(data) : ''))
        return;
    } else {
        return service(config);
    }
}
