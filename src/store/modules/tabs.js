const state = {
    activeName: 'first',
    tabName: 'a',
    dropName: '',
    dropName2: '',
    dropKernelName: '',
    dropProprietorName: '',
    dropBankIdName: '',
}

const mutations = {
    SET_TABS: (state, activeName) => {
        state.activeName = activeName
    },
    SET_NAMES: (state, activeName) => {
        state.tabName = activeName
    },
    SET_DROPNAME: (state, activeName) => {
        state.dropName = activeName
    },
    SET_DROPNAME2: (state, activeName) => {
        state.dropName2 = activeName
    },
    SET_DROPKERNELNAME: (state, activeName) => {
        state.dropKernelName = activeName
    },
    SET_DROPPROPRIETORNAME: (state, activeName) => {
        state.dropProprietorName = activeName
    },
    SET_DROPBANKIDNAME: (state, activeName) => {
        state.dropBankIdName = activeName
    }
}



export default {
    namespaced: true,
    state,
    mutations,
}
