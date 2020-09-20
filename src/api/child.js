import request from '@/utils/request'

export function addChild(params) {
    return request({
        url: '/dcp/add/wx/warn/rule',
        method: 'post',
        params
    })
}
