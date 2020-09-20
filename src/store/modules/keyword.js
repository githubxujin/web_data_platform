import $message from "element-ui/lib/message"
import {
    getInKeyWordList
} from "@/api/invoice";
const state = {
    industryNormal: [],
    industryException: [],
    customerNormal: [],
    customerException: []
}

const mutations = {
    // SET_INKEYWORD: (state, key) => {
    //     state.industryNormal = key.split(',')
    // },
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
    SET_INKEYWORD: (state, list) => {
        console.log(list, 'list')
        state.industryNormal = list.industryNormal && list.industryNormal.split(',') || []
        state.industryException = list.industryException && list.industryException.split(',') || []
    },
    CLEAN_CUSTOMERNORMAL: (state) => {
        state.customerNormal = []
        state.industryException = []
    }
}



const actions = {
    getInKeyWordList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            console.log(params, 'params')
            getInKeyWordList(params).then(response => {
                commit('SET_INKEYWORD', response.data)
                console.log(response, 'response')
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

}


export default {
    namespaced: true,
    actions,
    state,
    mutations,
}
