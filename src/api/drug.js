import request from '@/utils/request'


export function getCompanyNameList() {
    return request('/dcp/drug/company/list', {}, {
        type: 'get'
    })
}
