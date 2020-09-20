const state = {
    allChild: [], //所有节点
    currentChild: [], //当前节点
    dialogVisible: false, // 弹窗显示关闭

}

const mutations = {

}

const actions = {
    // _addChild({
    //     commit
    // }, userInfo) {
    //     return new Promise((resolve, reject) => {
    //         addhild(userInfo).then(response => {
    //             const {
    //                 access_token
    //             } = response
    //             commit('SET_TOKEN', access_token)
    //             setToken(response)
    //             resolve(access_token)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
