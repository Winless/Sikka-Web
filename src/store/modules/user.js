const getDefaultState = () => {
    return {
        networkF: false,
        account: "",
        chain: "",
        isLogin: "1002",//'1000':成功 '1001':网络错误  '1002':失败
        loginType: "login",
        refresh: 0,
        tokenlist: false,
        balance: [],
        borrowInfo: null,
        btnshow: true,
        iswidth:0,
    }
}
const state = getDefaultState()

const mutations = {
    SET_ACCOUNT: (state, account) => {
        state.account = account;
    },
    SET_CHAIN: (state, chain) => {
        state.chain = chain;
    },
    SET_LOGIN_TYPE: (state, type) => {
        state.loginType = type;
    },
    SET_REFRESH: (state) => {
        state.refresh = state.refresh + 1;
    },
    SET_TOKENLIST: (state) => {
        state.tokenlist = !state.tokenlist;
    },
    SET_NETWORKF: (state, b) => {
        state.networkF = b;
    },
    SET_BTNSHOW: (state) => {
        state.btnshow = !state.btnshow;
    },
    SET_ISWITHD: (state,a) => {
        state.iswidth =a;
    },
    SET_LOGIN: (state, b) => {
        state.isLogin = b;
    },
    SET_ITLISTTOKEN: (state, itlisttoken) => {
        state.itlisttoken = itlisttoken;
    },
    SET_BALANCE: (state, balance) => {
        state.balance = balance;
    },
    SET_BORROWINFO: (state, borrowInfo) => {
        state.borrowInfo = borrowInfo;
    },
}

const actions = {
    setAccount({ commit }, account) {
        commit("SET_ACCOUNT", account);
    },
    setChain({ commit }, chain) {
        commit("SET_CHAIN", chain);
    },
    setLoginType({ commit }, type) {
        commit("SET_LOGIN_TYPE", type);
    },
    setRefresh({ commit }) {
        commit('SET_REFRESH');
    },
    settokenlist({ commit }) {
        commit('SET_TOKENLIST');
    },
    setnetworkf({ commit }, b) {
        commit('SET_NETWORKF', b);
    },
    setbtnshow({ commit }) {
        commit('SET_BTNSHOW');
    },
    setwidth({ commit },type) {
        commit('SET_ISWITHD',type);
    },
    setlogin({ commit }, b) {
        commit('SET_LOGIN', b);
    },
    setISlisttoken({ commit }, itlisttoken) {
        commit('SET_ITLISTTOKEN', itlisttoken);
    },
    setISbalance({ commit }, balance) {
        commit('SET_BALANCE', balance);
    },
    setBorroeInfo({ commit }, borrowInfo) {
        commit('SET_BORROWINFO', borrowInfo);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

