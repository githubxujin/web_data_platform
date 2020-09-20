import {
    getCompanyNameList,
} from '@/api/drug'

const state = {
    companyNameList: [],
}

const mutations = {
    SET_COMPANYNAMELIST: (state, list) => {
        state.companyNameList = list
    },
}

const actions = {
    // user login
    getCompanyNameList({
        commit
    }) {
        return new Promise((resolve, reject) => {
            getCompanyNameList().then(response => {
                commit('SET_COMPANYNAMELIST', response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
