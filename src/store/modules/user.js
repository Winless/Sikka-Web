// import {loginWal, getBalanceToken} from "../../api/user"
// import {trace} from "../../utils/tools"
// import {initTokenAddress} from "../../sdk-utils/graphql";

const getDefaultState = () => {
    return {
        chainConfig: {
            chain: "",
            chainID: 0,
        },
        showHeaderBg: false,
        isInitSDK: false,
        isLogin: 0,  //0(Not login) -1（Login error） 1（login success）
        isConnecting: false,
        account: "00",
        tokens: [],
        pools: [],



    }
}

const state = getDefaultState()

const mutations = {

    SET_isInitSDK: (state, isInitSDK) => {
        state.isInitSDK = isInitSDK
    },
    SET_HeaderBg: (state, showHeaderBg) => {
        state.showHeaderBg = showHeaderBg
    },
    SET_ACCOUNT: (state, account) => {
        state.account = account
    },
    SET_CONFIG: (state, chainConfig) => {
        state.chainConfig = chainConfig;
    },
    SET_ISLOGIN: (state, LOGINCODE) => {
        state.isLogin = LOGINCODE;
    },

    SET_POOLS: (state, pools) => {
        state.pools = pools
    },
    SET_TOKENS: (state, tokens) => {
        state.tokens = tokens
    },

    SET_CONNECT: (state, isConnecting) => {
        state.isConnecting = isConnecting
    },

    SET_RESET: (state, value) => {
        // state.globalBlur = false
        // state.GPID = "";
    }
}

const actions = {
    resetAccout({commit}) {
        // commit("SET_BLUR", false);
    },
    setIsInitSDK({commit}, isInitSDK) {
        commit("SET_isInitSDK", isInitSDK);
    },
    setHeaderBg({commit}, value) {
        commit("SET_HeaderBg", value);
    },

    // // user login
    // login({commit}, params) {
    //     let ths = this;
    //     return new Promise((resolve, reject) => {
    //
    //         let bf = (data) => {
    //             commit("SET_CONNECT", true)
    //             trace("loginWal-back-bf", data)
    //             commit('SET_ACCOUNT', data.account);
    //
    //             if (data.account) {
    //                 let {chain, chainID} = data;
    //                 commit('SET_CONFIG', {chain, chainID});
    //                 if (data.chainID == 1 || data.chainID == 4) {
    //                     data.code = 1;
    //                     commit('SET_ISLOGIN', 1);
    //                     if(data.providerInfo) actions.saveLogin({commit},{type: data.providerInfo.name})
    //
    //                 } else {
    //                     data.code = -1;
    //                     commit('SET_ISLOGIN', -1);
    //                     actions.clearLogin({commit})
    //                 }
    //             } else {
    //                 data.code = 0;
    //                 commit('SET_ISLOGIN', 0);
    //                 actions.clearLogin({commit})
    //             }
    //             commit('SET_RESET', false);
    //             trace("callback=",params)
    //             if (params&&params.callback) params.callback(data)
    //         }
    //         loginWal(bf).then(async data => {
    //             trace("loginWal-data1", data)
    //             bf(data);
    //             resolve(data)
    //
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },
    //
    // getBalance({commit}, address) {
    //     return new Promise((resolve, reject) => {
    //         getBalanceToken({address}).then(data => {
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },


    setPools({commit}, pools) {
        commit("SET_POOLS", pools)
    },
    setTokens({commit}, tokens) {
        commit("SET_TOKENS", tokens)
    },


    saveLogin({commit}, data) {
        localStorage.setItem("login", JSON.stringify(data))
    },

    getLogin({commit}) {
        let obj = localStorage.getItem("login");
        if (obj) {
            obj = JSON.parse(obj)
        }
        return obj;
    },
    clearLogin({commit}) {
        localStorage.removeItem("login");
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

