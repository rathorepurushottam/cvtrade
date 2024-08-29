import {appOperation} from '../appOperation';
import {logger, showError} from '../helper/logger';
import {
  GenerateAddressProps,
  WithdrawCurrencyProps,
  WithdrawInrProps,
} from '../helper/types';
import NavigationService from '../navigation/NavigationService';
import { DEPOSIT_SCREEN, WITHDRAW_SCREEN } from '../navigation/routes';
import {setLoading} from '../slices/authSlice';
import {
    setP2pCoinList,
    setFiatCurrencyList,
    setPaymentMethodList,
    setBuyOrderList,
} from '../slices/p2pSlice';
import {AppDispatch} from '../store/store';

export const getP2pCoinList = () => async (dispatch: AppDispatch) => {
    setLoading(true);
  try {
    const response: any = await appOperation.customer.p2p_coin_list();
    if (response.success) {
      dispatch(setP2pCoinList(response?.data));
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getFiatCurrencyList = () => async (dispatch: AppDispatch) => {
  setLoading(true);
try {
  const response: any = await appOperation.customer.get_fiat_curreny_list();
  if (response.success) {
    dispatch(setFiatCurrencyList(response?.data));
  }
} catch (e) {
  logger(e);
  showError(e?.message);
} finally {
  dispatch(setLoading(false));
}
};

export const getPaymentMethod = () => async (dispatch: AppDispatch) => {
  setLoading(true);
try {
  const response: any = await appOperation.customer.get_payment_method();
  if (response.success) {
    dispatch(setPaymentMethodList(response?.data));
  }
} catch (e) {
  logger(e);
  showError(e?.message);
} finally {
  dispatch(setLoading(false));
}
};

export const getbuyOrdersList =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_buy_order_list(data);
      if (response.success) {
        dispatch(setBuyOrderList(response?.data))
      } 
      // else {
      //   showError(response?.message);
      // }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

// export const getUserWallet = () => async (dispatch: AppDispatch) => {
//   try {
//     // dispatch(setLoading(true));
//     const response: any = await appOperation.customer.user_wallet();
//     if (response.success) {
//       dispatch(setUserWallet(response?.data));
//     }
//   } catch (e) {
//     logger(e);
//   } finally {
//     // dispatch(setLoading(false));
//   }
// };
// export const generateAddress =
//   (data: GenerateAddressProps) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       dispatch(setWalletAddress(''));
//       const response: any = await appOperation.customer.generate_address(data);
//       console.log('rs', response);

//       if (response.success) {
//         dispatch(setWalletAddress(response?.data));
//       } else {
//         showError(response?.message);
//       }
//     } catch (e) {
//       logger(e);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };



// export const getAdminBankDetails = () => async (dispatch: AppDispatch) => {
//   try {
//     const response: any = await appOperation.customer.admin_bank_details();

//     if (response.success) {
//       dispatch(setAdminBankDetails(response?.data[0]));
//     }
//   } catch (e) {
//     logger(e);
//   }
// };

// export const depositInr = (data: FormData) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const response: any = await appOperation.customer.deposit_inr(data);
//     // console.log('rs', response);

//     if (response.success) {
//       showError(response?.message);
//       NavigationService.goBack();
//     } else {
//       showError(response?.message);
//     }
//   } catch (e) {
//     logger(e);
//     showError(e?.message);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const getWalletHistory = () => async (dispatch: AppDispatch) => {
//   try {
//     // dispatch(setLoading(true));
//     const response: any = await appOperation.customer.wallet_history();
//     // console.log(response, "dispatch(getWalletHistory());")
//     if (response.success) {
//       dispatch(setWalletHistory(response?.data));
//     }
//   } catch (e) {
//     logger(e);
//   } finally {
//     // dispatch(setLoading(false));
//   }
// };
// export const getTradeHistory = (data:any) => async (dispatch: AppDispatch) => {
//   try {
//     // dispatch(setLoading(true));
//     const response: any = await appOperation.customer.trade_history(data);

//     if (response.success) {
//       dispatch(setTradeHistory(response?.data));
//     }
//   } catch (e) {
//     logger(e);
//   } finally {
//     // dispatch(setLoading(false));
//   }
// };

// export const verifyDeposit = (data: any) => async (dispatch: AppDispatch) => {
//   try {
//     // dispatch(setLoading(true));
//     const response: any = await appOperation.customer.verify_deposit(data);
//     // console.log(response, '===respo');
//     if (response.success) {
//       dispatch(setDepositHistory(response?.data));
//     }
//   } catch (e) {
//     logger(e);
//   }
// };

// export const verifyWithdraw = () => async (dispatch: AppDispatch) => {
//   try {
//     // dispatch(setLoading(true));
//     const response: any = await appOperation.customer.verify_withdraw();
//     // console.log(response, '===verifyWithdraw');
//     if (response?.success) {
//       dispatch(setWithdrawHistory(response?.data));
//     }
//   } catch (e) {
//     logger(e);
//     showError(e?.message);
//   } finally {
//     // dispatch(setLoading(false));
//   }
// };

// export const withdrawInr =
//   (data: WithdrawInrProps) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const response: any = await appOperation.customer.withdraw_inr(data);
//       // console.log('res', response);
//       showError(response?.message);
//       if (response?.success) {
//         NavigationService.goBack();
//       }
//     } catch (e) {
//       logger(e);
//       showError(e?.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

// export const getTransactionHistory =
//   (id: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const response: any = await appOperation.customer.transaction_history(id);

//       if (response.success) {
//         dispatch(setTransactionHistory(response?.data));
//       }
//     } catch (e) {
//       logger(e);
//     } finally {
//       console.log('Finally');
//     }
//   };

//   export const getCoinDetails =
//   (data: any, type: any,balance: any) => async (dispatch: AppDispatch) => {
//     console.log('Finally');
//     try {
//       dispatch(setLoading(true));
//       const response: any = await appOperation.customer.coin_details(data);
//       console.log(response, "getCoinDetails");
//       if (response?.success) {
//         dispatch(setCoinDetails(response?.data));
//         if(type == "Deposit") {
//             if (response?.data?.deposit_status === 'ACTIVE') {
//             NavigationService.navigate(DEPOSIT_SCREEN, {walletDetail: response?.data});
//         } else {
//           showError('Deposit is Disable for Now');
//         }
//         } else if (type == "Withdraw") {
//           if (response?.data?.withdrawal_status === 'ACTIVE') {

//          NavigationService.navigate(WITHDRAW_SCREEN, {walletDetail: response?.data, balance});
//     }else {
//       showError('Withdrawal is Disable for Now');
//     }
//         }
        
//       }
//     } catch (e) {
//       logger(e);
//     } finally {
//       console.log('Finally');
//       dispatch(setLoading(false));
//     }
//   };
