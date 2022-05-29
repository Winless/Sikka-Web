const getters = {
    chainConfig: state => state.user.chainConfig,        //
    showHeaderBg: state => state.user.showHeaderBg,        //
    isInitSDK: state => state.user.isInitSDK,        //
    isLogin: state => state.user.isLogin,        //
    isConnecting: state => state.user.isConnecting,        //
    account: state => state.user.account,        //
    tokens: state => state.user.tokens,        //
    pools: state => state.user.pools,        //
}
export default getters