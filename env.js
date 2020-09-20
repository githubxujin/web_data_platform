/*
    接口环境
*/

export default (function () {
    switch (process.env.VUE_APP_ENV) {
        case 'test':
            // return '//192.168.2.158:8888'
            return '//api-test.syf.com'
        case 'uat':
            return '//112.95.173.70:60002'
        // return '//10.10.1.8:8888'
        case 'pro':
            return '//api.shengyecapital.com/'
        default:
            // return 'https://api-test.shengyecapital.com/'
            // return '//192.168.1.112:8888' // 橡皮筋
            // return '//192.168.1.158:8888' // 东江
            // return '//192.168.1.111:8886'
            // return '//192.168.1.139:8888' // 晶晶
            // return '//192.168.1.138:8888' // 小俊
            // return '//192.168.1.129:8888' // 琨哥
            // return '//192.168.2.158:8888'
            // return '//192.168.1.37:8888'   // 西施
            // return '//192.168.1.120:8888'   // 周全
            //   return '//api-dev.syitservice.com/' // 测试环境
            // return '//192.168.1.153:8888' // 测试环境
            return '//api-dev.syitservice.com' // 测试环境
        // return 'http://console-test.syitservice.com' // 测试环境
        // return 'http://api-dev.syitservice.com'  // 外网开发环境
        // return '//112.95.173.70:60002' // uat验收环境
        // return '//api-uat.sypetro.com' // uat验收环境
        // return '//api.shengyecapital.com/' // 正式环境
        // return '//api-test.syf.com'

    }
})()
