const env = {
    dev: 'https://console-dev.syitservice.com',
    test: 'https://console-test.syitservice.com',
    uat: 'https://console-uat.syitservice.com',
    pro: 'https://console.shengyecapital.com'
};

export default env[process.env.VUE_APP_ENV] || env["dev"];
