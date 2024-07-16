import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeCoinTabs from "./HomeCoinTabs";
import {
  universalPaddingVertical,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import MarketCoinList from "./MarketCoinList";
import { AppText, TWELVE } from "../../common";
import { colors } from "../../theme/colors";

const CoinList = () => {
  return (
    <View style={[styles?.Main_Container, { marginBottom: 50 }]}>
      <HomeCoinTabs />
      <View style={styles?.Heading}>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Asset</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Last Price</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>24H Change</AppText>
      </View>
      <View style={styles?.MarketCoinList}>
        <MarketCoinList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    marginVertical: 10,
    paddingHorizontal: universalPaddingHorizontalHigh,
    paddingVertical: universalPaddingVertical,
    // backgroundColor: "#0C0C0C",
  },
  Heading: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 30
  },
  MarketCoinList: {
    marginTop: 10,
  },
});

export default CoinList;
