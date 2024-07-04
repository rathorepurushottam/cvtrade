import React, { useEffect } from 'react';
import {
  AppSafeAreaView,
  AppText,
  BLACK,
  BOLD,
  Button,
  FOURTEEN,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWENTY_SIX,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import { useDispatch } from 'react-redux';
import KeyBoardAware from '../../common/KeyboardAware';
import FastImage from 'react-native-fast-image';
import {copyIcon, giftIc, inviteIcon} from '../../helper/ImageAssets';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../theme/colors';
import {borderWidth, universalPaddingHorizontal} from '../../theme/dimens';
import {commonStyles} from '../../theme/commonStyles';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {useAppSelector} from '../../store/hooks';
import {copyText, shareToAny, twoFixedTwo} from '../../helper/utility';
import {getUserReferCode, getUserReferCount} from "../../actions/accountActions";
import NavigationService from '../../navigation/NavigationService';
import {REFERRAL_LIST} from "../../navigation/routes";

const InviteAndEarn = () => {
  const dispatch = useDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const coinData = useAppSelector(state => state.home.coinPairs);
  const referCode = useAppSelector(state => state.home.referCode);
  const referralList = useAppSelector(state => state.home.referralList);
  let cvtradePrice = coinData?.filter((pair) => pair?.base_currency === 'USDT' && pair?.quote_currency === 'cvtrade')[0]?.buy_price;
  let totalReward = coinData?.filter((item) => item?.cvtrade_reward == "true")?.length;
  useEffect(() => {
    dispatch(getUserReferCode());
    // dispatch());
  }, [])
  const message = `https://cvtradeexchange.com/signup?reffcode=${referCode}`;
  const onSubmit = () => {
    shareToAny(message);
  };

  console.log(totalReward, "totalReward");
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Invite & Earn'} />
      <KeyBoardAware>
        <FastImage
          source={inviteIcon}
          resizeMode="contain"
          style={styles.image}
        />
        <AppText type={TWENTY_SIX} color={YELLOW} weight={BOLD}>
          Refer Friends.{'\n'}Earn Crypto Together{' '}
        </AppText>
        <AppText>
          Earn up to 40% commission on every trade across cvtradeExchange.
        </AppText>
        <View style={{flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
        <AppText type={TWENTY_SIX} color={YELLOW} weight={BOLD}>
        {twoFixedTwo(cvtradePrice * 0.25)} cvtrade
        </AppText>
        <AppText color={WHITE} weight={BOLD}>You have earned</AppText>
        </View>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <AppText type={FOURTEEN}>Total Reward</AppText>
            <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {twoFixedTwo(totalReward * cvtradePrice * 2)} cvtrade
            </AppText>
          </View>
          <View style={styles.divider} />
          <View style={[styles.balanceContainer]}>
            <AppText type={FOURTEEN}>Total Referral</AppText>
            <AppText weight={SEMI_BOLD} type={FOURTEEN}>
              {referralList?.length}
            </AppText>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={[styles.listContainer]} onPress={() => NavigationService.navigate(REFERRAL_LIST, {referCode:referCode})}>
          <AppText type={FOURTEEN} color={YELLOW}>View Referral List</AppText>
          </TouchableOpacity>
          
          <FastImage
            source={giftIc}
            resizeMode="contain"
            style={styles.giftIcon}
          />

        </View>
        <View style={styles.container2}>
          <AppText type={FOURTEEN} style={commonStyles.centerText}>
            Referral
          </AppText>
          {/* <View style={styles.commissionBox}>
            <View style={styles.commissionBoxSecond}>
              <AppText type={TEN}>You Receive</AppText>
              <AppText type={SIXTEEN}>15%</AppText>
            </View>
            <View style={styles.commissionBoxSecond}>
              <AppText type={TEN}>Friend Receive</AppText>
              <AppText type={SIXTEEN}>0%</AppText>
            </View>
          </View> */}
          <View style={[styles.commissionBox]}>
            <AppText type={TEN}>
              Referral Code: <AppText weight={SEMI_BOLD}>{referCode}</AppText>
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                copyText(message);
              }}>
              <FastImage
                source={copyIcon}
                resizeMode="contain"
                style={styles.copy}
              />
            </TouchableOpacityView>
          </View>
          <Button
            children="Invite Friends"
            onPress={() => onSubmit()}
            containerStyle={styles.button}
          />
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default InviteAndEarn;
const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 300,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: 50,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  container2: {
    backgroundColor: colors.white_fifteen,
    marginTop: 20,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent:"center",
    alignItems: 'center',
  },
  divider: {
    height: 0.4,
    backgroundColor: colors.thirdBg,
    marginVertical: 5,
  },
  giftIcon: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    top: -45,
  },
  commissionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.buttonBgDisabled,
    padding: universalPaddingHorizontal,
    borderRadius: 10,
    marginTop: 10,
  },
  commissionBoxSecond: {
    flex: 1,
  },
  copy: {
    height: 18,
    width: 18,
  },
  button: {marginTop: 20},
});
