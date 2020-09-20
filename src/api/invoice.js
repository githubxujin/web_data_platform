import request from '@/utils/request'

export function getCompanyList(data) {
    return request(
        '/dcp/company/list', data, {
            type: "formdata",
        }
    )
}


export function getKeyWordList({
    id,
    industryCategory
}) {
    return request(
        '/dcp/invoice/content/keyword/detail', {
            id,
            industryCategory
        }, {
            type: "get"
        }
    )
}



export function getInKeyWordList(
    industryCategory
) {
    return request(
        '/dcp/invoice/industry/keyword/detail', {
            industryCategory
        }, {
            type: "get"
        }
    )
}
