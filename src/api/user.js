import request from '@/utils/request'

export function login(data) {
    return request(
        'uaa/oauth/token?' + converParam({
            'grant_type': 'ldap', //  auth 参数
            'client_id': 'ldap', //  auth 参数
            'client_secret': 'secret', //  auth 参数
            'scope': 'client-scope', //  auth 参数
            'username': data.username, // 用户名
            'userType': data.userType,
            'password': encodeURIComponent(data.password), // 密码
            'captchaCode': data.captchaCode, // 验证码
        }), {}, {
            type: "formdata",
            isReturnMsg: true,
            isToken: false,
            isLoginPage: true
        }

    )
}

export function getInfo() {
    return request(
        '/user/m/userInfo', {
            type: 'post'
        }
    )
}

/* 对象量转化为URL连接方式 */
function converParam(data) {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
    }
    return dataStr
}
