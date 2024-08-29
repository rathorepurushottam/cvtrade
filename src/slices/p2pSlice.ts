import {createSlice} from '@reduxjs/toolkit';
import {p2pSliceProps} from '../helper/types';
export const initialState: p2pSliceProps = {
    p2pCoinList: [],
    fiatCurrencyList: [],
    paymentMethodList: [],
    buyOrderList: [],
//   walletBalance: 0,
//   userWallet: [],
//   walletAddress: '',
//   adminBankDetails: undefined,
//   walletHistory: [],
//   tradeHistory: [],
//   selectedWalletHistory: undefined,
//   selectedTradeHistory: undefined,
//   transactionHistory: [],
//   depositHistory: [],
//   withdrawHistory: [],
//   coinDetails: [],
};

export const p2pSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setP2pCoinList: (state, {payload}) => {
        state.p2pCoinList = payload;
    },
    setFiatCurrencyList: (state, {payload}) => {
      state.fiatCurrencyList = payload;
    },
    setPaymentMethodList: (state, {payload}) => {
      state.paymentMethodList = payload;
    },
    setBuyOrderList: (state, {payload}) => {
      state.buyOrderList = payload;
    },
    // setWalletAddress: (state, {payload}) => {
    //   state.walletAddress = payload;
    // },
    // setAdminBankDetails: (state, {payload}) => {
    //   state.adminBankDetails = payload;
    // },
    // setWalletHistory: (state, {payload}) => {
    //   state.walletHistory = payload;
    // },
    // setTradeHistory: (state, {payload}) => {
    //   state.tradeHistory = payload;
    // },
    // setSelectedWalletHistory: (state, {payload}) => {
    //   state.selectedWalletHistory = payload;
    // },
    // setSelectedTradeHistory: (state, {payload}) => {
    //   state.selectedTradeHistory = payload;
    // },
    // setTransactionHistory: (state, {payload}) => {
    //   state.transactionHistory = payload;
    // },
    // setDepositHistory: (state, {payload}) => {
    //   state.depositHistory = payload;
    // },
    // setWithdrawHistory: (state, {payload}) => {
    //   state.withdrawHistory = payload;
    // },
    // setCoinDetails: (state, {payload}) => {
    //   state.coinDetails = payload;
    // }
  },
});
export const {
    setP2pCoinList,
    setFiatCurrencyList,
    setPaymentMethodList,
    setBuyOrderList,
//   setWalletBalance,
//   setUserWallet,
//   setWalletAddress,
//   setAdminBankDetails,
//   setWalletHistory,
//   setTradeHistory,
//   setSelectedWalletHistory,
//   setSelectedTradeHistory,
//   setTransactionHistory,
//   setDepositHistory,
//   setWithdrawHistory,
//   setCoinDetails,
} = p2pSlice.actions;
export const p2pReducer = p2pSlice.reducer;
