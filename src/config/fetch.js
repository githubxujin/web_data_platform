// import Mock from 'mockjs'
import {
    getStore,
    delStore
} from './utils'
import $message from 'element-ui/lib/message'
import $loading from 'element-ui/lib/loading'

import {
    getToken
} from '@/utils/auth'

export function getParams(data) {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + encodeURIComponent(data[key]) + '&'
    })

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
    }
    return dataStr
}

class Fetch {
    constructor(api, type, tokenName) {
        this.api = getStore('API') || api
        this.type = type
        this.tokenName = tokenName || 'token'
        this.requestCount = 0, // 接口请求数量
            this.loading = null
    }

    get(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'get'
            },
            ...opt
        })
    }

    post(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'post'
            },
            ...opt
        })
    }

    json(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'json'
            },
            ...opt
        })
    }

    upload(url, params, opt) {
        // 如果上传文件，自动转换为FormDate类型
        // vm.ajax.upload('files/upload', {
        //     data: {
        //         id: vm.id,
        //         typeId: typeId
        //     },
        //     file: {
        //         'files': file
        //     }
        // })

        if (typeof (params) === 'object' && (params.file || params.data)) {
            let formData = new FormData()

            if (params.data) {
                for (const key in params.data) {
                    formData.append(key, params.data[key])
                }
            }

            for (const key in params.file) {
                if (params.file.hasOwnProperty(key)) {
                    if (params.file[key].length > 1) {
                        for (let i = 0; i < params.file[key].length; i++) {
                            formData.append(key, params.file[key][i])
                        }
                    } else {
                        formData.append(key, params.file[key][0])
                    }
                }
            }
            console.log(params)
            params = formData
        }
        return this.openFetch(url, params, {
            ...{
                type: 'upload',
                timeout: 60 * 1000
            },
            ...opt
        })
    }

    exportFile(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'export'
            },
            ...opt
        })
    }

    delete(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'delete'
            },
            ...opt
        })
    }

    getJson(url, params, opt) {
        return this.openFetch(url, params, {
            ...{
                type: 'get',
                noCredentials: true
            },
            ...opt
        })
    }
    /*
      @url 请求地址
      @opt 配置参数
          -type 默认JSON请求， JSON|POST|UPLOAD
          -isLoading 是否进行loading动画
          -isReturnMsg 是否需要自行捕获错误操作(默认直接提示错误信息)
          -isToken 请求是否需要token(默认需要)
      @data 请求数据

      update: 2018年8月3日16:12:42

      注：项目里如需统一请求方式(默认为JSON)，在构造函数里进行设置， 例: new Fetch(env, 'post')
   */
    async openFetch(url = '', data = {}, opt) {
        let _opt = {
            type: 'JSON',
            isLoading: true,
            isReturnMsg: false,
            isToken: true,
            isLogin: true,
            timeout: 1000 * 30
        }

        opt = {
            ..._opt,
            ...opt
        }

        data = data || {}

        opt.type = opt.type || this.type || 'JSON'

        opt.type = opt.type.toUpperCase()

        if (!url.includes('http')) {
            url = this.api + '/' + url;
            url = url.replace(/([^:])[/]{2,}/g, '$1/');
        }


        // 去掉数据中的undefined、 null
        Object.keys(data).forEach(v => {
            if (data[v] === undefined || data[v] === null) {
                data[v] = ''
            }
        })

        // mock数据
        // if (process.env.VUE_APP_MOCK) {
        //     let json = require('../mock/' + url)
        //     return Mock.mock(json)
        // }

        this.requestCount++

        if (opt.isLoading) {
            this.loading = $loading.service({
                lock: false,
                text: "加载中...",
                spinner: "icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
        }

        if (opt.type === 'EXPORT') {
            if (opt.isToken) {
                data.access_token = (opt.token || getToken(this.tokenName) || '')
            }
            window.open(url + (Object.keys(data).length ? '?' + getParams(data) : ''))

            this.requestCount--;
            if (this.requestCount === 0) {
                this.loading && this.loading.close();
            }
            return
        }

        let res, json

        console.log('ajax:' + url, JSON.parse(JSON.stringify(data || {})))

        let raceRequest

        if (opt.timeout === -1) { // 不设置超时
            raceRequest = window.fetch ? this.setRequestConf(url, data, opt) : this.setRequestConfbyIE(url, data, opt)
        } else {
            raceRequest = Promise.race([
                window.fetch ? this.setRequestConf(url, data, opt) : this.setRequestConfbyIE(url, data, opt),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('request timeout'))
                    }, opt.timeout)
                })
            ]).catch(err => {
                this.requestCount--;
                if (this.requestCount === 0) {
                    this.loading && this.loading.close();
                }
                $message.error({
                    type: 'error',
                    message: `请求超时，[${err}]`,
                    showClose: true
                })
            })
        }

        res = await raceRequest

        /* 请求超时，返回空对象 */
        if (!res) {
            return new Promise((resolve, reject) => {
                reject(new Error('request timeout'))
            })
        }

        json = window.fetch ? await res.json() : res.response

        try {
            return new Promise((resolve, reject) => {
                this.requestCount--


                if (this.requestCount === 0) {
                    this.loading && this.loading.close();
                }
                // loading && !this.requestCount && loading.close();

                if (typeof json !== 'object') {
                    json = JSON.parse(json)
                }
                if (res.status === 200) {
                    if (opt.noCredentials) {
                        resolve(json)
                        return
                    }

                    if (json.code === '401') {
                        if (opt.isLogin) {
                            // delStore(this.tokenName)
                            // window.location.reload()
                            // window.location.href = '/common/#/login'
                        } else {
                            $message.error({
                                type: 'error',
                                message: json.message,
                                showClose: true
                            })

                        }
                        return
                    }

                    if (json.code === '200' || json.access_token) {
                        resolve(json)
                    } else {
                        opt.isReturnMsg ? reject(json) : $message.error({
                            type: 'error',
                            message: json.message,
                            showClose: true
                        })
                    }
                } else {
                    if (opt.isReturnMsg) {
                        reject(res.status)
                    }
                    $message.error({
                        type: 'error',
                        message: json.message || '服务出小差了，请稍后再试！',
                        showClose: true
                    })

                }
            })
        } catch (error) {

            $message.error({
                type: 'error',
                message: error.message,
                showClose: true
            })
            this.requestCount--;
            if (this.requestCount === 0) {
                this.loading && this.loading.close();
            }
            // loading && !this.requestCount && loading.close();
        }
    }

    async setRequestConf(url, data, opt) {
        let config = {
            credentials: 'include',
            method: opt.type,
            headers: {
                'Accept': '*/*'
            },
            mode: 'cors',
            cache: 'force-cache'
        }

        if (opt.noCredentials) delete config.credentials

        switch (opt.type) {
            case 'GET':
                url = url + (Object.keys(data).length ? '?' + getParams(data) : '')
                break
            case 'POST':
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                config.body = getParams(data)
                break
            case 'JSON':
                config.method = 'POST'
                config.headers['Content-Type'] = 'application/json'
                Object.defineProperty(config, 'body', {
                    value: JSON.stringify(data)
                })
                break
            case 'UPLOAD':
                config.method = 'POST'
                config.body = data
                break
            default:
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                config.body = getParams(data)
        }

        opt.isToken && (config.headers.Authorization = 'Bearer ' + (opt.token || getToken(this.tokenName) || ''))

        const response = await fetch(url, config)

        return response
    }

    setRequestConfbyIE(url, data, opt) {
        let requestObj
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest()
        } else {
            requestObj = new ActiveXObject()
        }

        let sendData = ''

        switch (opt.type) {
            case 'GET':
                url = url + (Object.keys(data).length ? '?' + getParams(data) : '')
                requestObj.open('GET', url, true)
                break
            case 'POST':
                requestObj.open('POST', url, true)
                requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                sendData = getParams(data)
                break
            case 'JSON':
                requestObj.open('POST', url, true)
                requestObj.setRequestHeader('Content-type', 'application/json')
                sendData = JSON.stringify(data)
                break
            case 'UPLOAD':
                requestObj.open('POST', url, true)
                sendData = data
                break
            default:
                requestObj.open(opt.type, url, true)
        }

        opt.isToken && (requestObj.setRequestHeader('Authorization', 'Bearer ' + (opt.token || getToken(this.tokenName) || '')))

        requestObj.send(sendData)

        return new Promise((resolve, reject) => {
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        resolve(requestObj)
                    }
                }
            }
        })
    }

    async open(url = '', data = {}, isUpload = false, type, method = 'fetch') {
        type = type || this.type || 'JSON'

        type = type.toUpperCase()

        if (!url.includes('http')) {
            url = this.api + (this.api.lastIndexOf('/') < 6 && url.indexOf('/') > 0 ? '/' : '') + url
        }

        let loading = $loading.service({
            lock: false,
            text: '加载中...',
            spinner: 'icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })

        // mock数据
        // if (process.env.VUE_APP_MOCK) {
        //     let json = require('../mock/' + url)
        //     return Mock.mock(json)
        // }

        if (type === 'GET' || type === 'DELETE') {
            url = url + '?' + getParams(data)
        }

        if (window.fetch && method === 'fetch') {
            let requestConfig = {
                credentials: 'include',
                method: type,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'force-cache'
            }

            if (!url.includes('token') && !url.includes('imgCode')) {
                requestConfig.headers.Authorization = 'Bearer ' + (getToken(this.tokenName) || '')
            }

            if (type === 'POST') {
                // 上传属性需设置成默认属性
                if (isUpload) {
                    delete requestConfig.headers['Content-Type']
                    requestConfig.body = data
                } else {
                    requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                    requestConfig.body = getParams(data)
                }
            }

            if (type === 'JSON') {
                requestConfig.method = 'POST'
                Object.defineProperty(requestConfig, 'body', {
                    value: JSON.stringify(data)
                })
            }

            try {
                const response = await fetch(url, requestConfig)
                if (response.status === 200) {
                    if (loading) loading.close()
                    const responseJson = await response.json()
                    return new Promise((resolve, reject) => {
                        if (responseJson.code === '401') {
                            delStore(this.tokenName)
                            window.location.reload()
                            return
                        }
                        if (responseJson.code === '200' || responseJson.access_token) {
                            resolve(responseJson)
                        } else {
                            $message.error({
                                type: 'error',
                                message: responseJson.message,
                                showClose: true
                            })

                            reject(responseJson)
                        }
                    })
                } else {
                    if (loading) loading.close()
                    $message.error({
                        type: 'error',
                        message: 'status:' + response.status + ' : ' + (response.statusText ? response.statusText : '服务出小差了，请稍后再试'),
                        showClose: true
                    })
                }
            } catch (error) {
                if (loading) loading.close()

                $message.error('error')

            }
        } else {
            return new Promise((resolve, reject) => {
                let requestObj
                if (window.XMLHttpRequest) {
                    requestObj = new XMLHttpRequest()
                } else {
                    requestObj = new ActiveXObject()
                }

                let sendData = ''

                if (type === 'JSON') {
                    requestObj.open('POST', url, true)
                } else {
                    requestObj.open(type, url, true)
                }

                if (!url.includes('token') && !url.includes('imgCode')) {
                    requestObj.setRequestHeader('Authorization', 'Bearer ' + (getToken(this.tokenName) || ''))
                }

                if (type === 'POST') {
                    if (isUpload) {
                        sendData = data
                    } else {
                        requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                        sendData = getParams(data)
                    }
                }

                if (type === 'JSON') {
                    requestObj.setRequestHeader('Content-type', 'application/json')
                    sendData = JSON.stringify(data)
                }

                requestObj.send(sendData)
                requestObj.onreadystatechange = () => {
                    if (loading) loading.close()
                    if (requestObj.readyState === 4) {
                        if (requestObj.status === 200) {
                            let obj = requestObj.response
                            if (typeof obj !== 'object') {
                                obj = JSON.parse(obj)
                            }

                            if (obj.code === '401') {
                                delStore(this.tokenName)
                                window.location.reload()
                                return
                            }
                            if (obj.code === '200' || obj.access_token) {
                                resolve(obj)
                            } else {
                                $message.error(obj.message)
                                reject(obj)
                            }
                        } else {
                            reject(requestObj)
                        }
                    }
                }
            })
        }
    }
}

export default Fetch
