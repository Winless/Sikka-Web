import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
Vue.use(Vuex)

const getters = {
    account: state => state.user.account,
    chain: state => state.user.chain,
    loginType: state => state.user.loginType,
    refresh: state => state.user.refresh,
    tokenlist: state => state.user.tokenlist,
    isLogin: state => state.user.isLogin,
    btnshow: state => state.user.btnshow,
    iswidth: state => state.user.iswidth,
    networkF: state => state.user.networkF,
    balance: state => state.user.balance,
    borrowInfo: state => state.user.borrowInfo,
}

const store = new Vuex.Store({
    state: {},
    modules: {
        user,
    },
    getters
})

export default store
