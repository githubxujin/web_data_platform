
// 企业类型
export const firmType = (val) => {
    if (!val) return
    switch (val) {
        case 1:
            return '社会组织'
        case 3:
            return '香港公司'
        case 4:
            return '政府机构'
        case 5:
            return '台湾公司'
        case 6:
            return '基金会'
        case 7:
            return '医院'
        case 8:
            return '海外公司'
        case 9:
            return '律师事务所'
        case 10:
            return '学校'
        case -1:
            return '其他'
    }
}

// 名单类型
export const rollCallType = (val) => {
    if (!val && val !== 0) return
    switch (val) {
        case 1:
            return '白名单'
        case 2:
            return '黑名单'
        case 3:
            return '灰名单'
        case 0:
            return '待定名单'
    }
}