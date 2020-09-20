import $message from "element-ui/lib/message"
import {
    getCompanyList,
    getKeyWordList
} from '@/api/invoice';
const state = {
    companyList: [],
    industryNormal: [],
    industryException: [],
    customerNormal: [],
    customerException: []
}
// this.industryNormal = res.industryNormal //行业正常
// this.industryException = res.industryException // 行业异常
// this.customerNormal = res.customerNormal //公司正常
// this.customerException = res.customerException // 公司异常
const mutations = {
    DEL_INDUSTRYNORMAL: (state, index) => {
        state.industryNormal.splice(index, 1)
    },
    DEL_INDUSTRYEXCEPTION: (state, index) => {
        state.industryException.splice(index, 1)
    },
    DEL_CUSTOMERNORMAL: (state, index) => {
        state.customerNormal.splice(index, 1)
    },
    DEL_CUSTOMEREXCEPTION: (state, index) => {
        state.customerException.splice(index, 1)
    },
    SET_COMPANYLIST: (state, list) => {
        state.companyList = list
    },
    SET_FILELIST: (state, list) => {
        console.log(list, 'list111111111111')
        state.industryNormal = list.industryNormal && list.industryNormal.split(',') || []
        state.industryException = list.industryException && list.industryException.split(',') || []
        state.customerNormal = list.customerNormal && list.customerNormal.split(',') || []
        state.customerException = list.customerException && list.customerException.split(',') || []
    },
    SET_INDUSTRYNORMAL: (state, key) => {

        let allArr = [...state.industryNormal, ...state.industryException, ...state.customerNormal, ...state.customerException]
        console.log(allArr, 'allArr')
        console.log(allArr.includes(key), 'key')
        allArr.includes(key) ? $message({
                type: "warning",
                message: "关键字已存在"
            }) :
            state.industryNormal.push(key)
    },
    SET_INDUSTRYEXCEPTION: (state, key) => {
        let allArr = [...state.industryNormal, ...state.industryException, ...state.customerNormal, ...state.customerException]
        allArr.includes(key) ? $message({
                type: "warning",
                message: "关键字已存在"
            }) :
            state.industryException.push(key)
    },
    SET_CUSTOMERNORMAL: (state, key) => {
        let allArr = [...state.industryNormal, ...state.industryException, ...state.customerNormal, ...state.customerException]
        allArr.includes(key) ? $message({
                type: "warning",
                message: "关键字已存在"
            }) :
            state.customerNormal.push(key)
    },
    SET_CUSTOMEREXCEPTION: (state, key) => {
        let allArr = [...state.industryNormal, ...state.industryException, ...state.customerNormal, ...state.customerException]
        allArr.includes(key) ? $message({
                type: "warning",
                message: "关键字已存在"
            }) :
            state.customerException.push(key)
    },
}

const actions = {
    getCompanyList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getCompanyList(params).then(response => {
                commit('SET_COMPANYLIST', response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getKeyWordList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getKeyWordList(params).then(response => {
                commit('SET_FILELIST', response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
