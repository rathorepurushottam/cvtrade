import {accountReducer} from './../slices/accountSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from '../slices/authSlice';
import {homeReducer} from '../slices/homeSlice';
import {walletReducer} from '../slices/walletSlice';
import { p2pReducer } from '../slices/p2pSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  account: accountReducer,
  wallet: walletReducer,
  p2p: p2pReducer,
});

export default rootReducer;
