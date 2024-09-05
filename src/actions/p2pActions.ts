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
    setSellOrderList,
    setPurchasedOrder,
    setPostOrder,
    setPostsList,
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
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getSellOrdersList =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_sell_order_list(data);
      if (response.success) {
        dispatch(setSellOrderList(response?.data))
      } 
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getP2pOrders = () => async (dispatch: AppDispatch) => {
    setLoading(true);
  try {
    const response: any = await appOperation.customer.p2p_order_list();
    if (response.success) {
      dispatch(setPurchasedOrder(response?.data?.PurchedOrder));
      dispatch(setPostOrder(response?.data?.PostedOrders));
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getP2pPosts = () => async (dispatch: AppDispatch) => {
  setLoading(true);
try {
  const response: any = await appOperation.customer.p2p_posts_list();
  if (response.success) {
    dispatch(setPostsList(response?.data));
  }
} catch (e) {
  logger(e);
  showError(e?.message);
} finally {
  dispatch(setLoading(false));
}
};

