const state = {
    flag: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
}

const mutations = {
    'THEME': (state, flag) => {
        state.flag = flag;
    }
}

export default {
    state,
    mutations,
}
