import {
    login,
    getInfo
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    resetRouter
} from '@/router'

const state = {
    token: getToken(),
    nickName: '',
    name: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, nickName) => {
        // console.log(nickName, 'nickName')
        state.nickName = nickName.loginName
        state.name = nickName.nickName
    },
    
}

const actions = {
    // user login
    login({
        commit
    }, userInfo) {
        // console.log(userInfo, 'userInfo')
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const {
                    access_token
                } = response
                commit('SET_TOKEN', access_token)
                setToken(response)
                resolve(access_token)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({
        commit,
    }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                // if (!data) {
                //     reject('Verification failed, please Login again.')
                // }
                // let nickName = response.data.loginName
                // console.log(response.data.loginName, 'response.data.loginName')
                commit('SET_NAME', response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({
        commit,
    }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            removeToken()
            resetRouter()
            resolve()
        })
    },

    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
