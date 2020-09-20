const env = {
    // dev: '//192.168.1.87:8888', // 东江
    // dev: '//192.168.1.138:8888', // 小俊
    dev: 'https://api-dev.syitservice.com',
    // dev: '//192.168.1.107:8080',
    // dev: 'https://api-test.syitservice.com',
    // dev: 'https://api-dev.syitservice.com', 
    test: 'https://api-test.syitservice.com',
    uat: 'https://api-uat.syitservice.com',
    pro: 'https://api.shengyecapital.com/'
};

export default env[process.env.VUE_APP_ENV] || env['dev'];
