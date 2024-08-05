import React, {useEffect, useState} from 'react';
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FIFTEEN,
  FOURTEEN,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWENTY_FOUR,
  TWENTY,
  BOLD,
  TWELVE,
  ELEVEN,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  universalPaddingTop,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import { BG_Two } from '../../helper/ImageAssets';
import { dateFormatter } from '../../helper/utility';
import FastImage from 'react-native-fast-image';
import { BASE_URL } from '../../helper/Constants';
import { setSelectedWalletHistory } from '../../slices/walletSlice';
import NavigationService from '../../navigation/NavigationService';
import { WALLET_HISTORY_DETAILS_SCREEN } from '../../navigation/routes';



const WalletDetails = () => {
  const dispatch = useAppDispatch();
  const walletHistory = useAppSelector(state => {
    return state.wallet.walletHistory;
  });

  const handleWalletHistoryDetail = (item) => {
    dispatch(setSelectedWalletHistory(item));
    NavigationService?.navigate(WALLET_HISTORY_DETAILS_SCREEN);
  }
  return (
    <AppSafeAreaView>
      <ToolBar isLogo={false} isSecond title="Wallet" />
      <KeyBoardAware>
      <View style={styles?.RecentTransactions_Container}>
       {walletHistory?.slice(0, 10)?.map((item, index) => {
            let bgColor;
            switch (item.status) {
              case 'CANCELLED':
                bgColor = '#FDB64A';
                break;
              case 'REJECTED':
                bgColor = '#CF5757';
                break;
              default:
                bgColor = '#38B781';
                break;
            }
            let url = `${BASE_URL}${item?.icon_path}`;
            return (
              <View key={index}>
                <TouchableOpacity style={styles?.Map_Container} onPress={() => handleWalletHistoryDetail(item)}>
                  <View style={styles?.CoinInfo_Container}>
                  <FastImage
          source={{ uri: url }}
          resizeMode="contain"
          style={styles.icon}
        />
                    <View>
                      <AppText type={SIXTEEN} weight={BOLD}>
                        {'   '}
                        {item?.short_name}
                      </AppText>
                      <AppText
                        type={TWELVE}
                        weight={SEMI_BOLD}
                        style={{color: '#FFFFFF99'}}>
                        {'   '} {dateFormatter(item?.createdAt)}
                      </AppText>
                    </View>
                  </View>
                  <AppText type={FOURTEEN} weight={SEMI_BOLD}>
                        {'   '}
                        {item?.transaction_type}
                      </AppText>
                  <View>
                    <AppText type={EIGHTEEN} weight={BOLD}>
                      {item?.amount}
                    </AppText>
                    <View
                      style={[
                        styles?.Process_Container,
                        {backgroundColor: bgColor},
                      ]}>
                      <AppText type={ELEVEN} weight={SEMI_BOLD}>
                        {item?.status}
                      </AppText>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles?.Line} />
              </View>
            );
          })}
       </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default WalletDetails;
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: universalPaddingTop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Map_Container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF10",
    // marginVertical: 5,
    borderRadius: 10,
  },
  Line: {
    // backgroundColor: '#FFFFFF99',
    // borderWidth: 1,
    marginTop: 12,
  },
  CoinDataMain_Container: {
    // width: 180,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#FFFFFF15',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 15,
    width: '48%'
  },
  CoinIcon: {
    width: 34,
    height: 34,
    // borderRadius: 10
  },
  ThreeDots: {
    width: 18,
    height: 15,
  },
  CoinDataHeader_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CoinDataHeaderPart_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  CoinData_Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RecentText_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Process_Container: {
    width: 75,
    height: 25,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38B781',
    alignSelf: 'flex-end',
  },
  CoinInfo_Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RecentTransactions_Container: {
    marginTop: 20
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
