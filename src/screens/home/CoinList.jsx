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
  const [activeTab, setActiveTab] = useState('spot');
  // const [activeTabList, setActiveTabList] = useState(0);
  return (
    <View style={[styles?.Main_Container, { marginBottom: 10 }]}>
      <HomeCoinTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
      <View style={styles?.Heading}>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%', marginLeft: 20}}>Asset</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%', marginLeft: 15}}>Last Price</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%', marginLeft: 10}}>24H Change</AppText>
      </View>
      <View style={styles?.MarketCoinList}>
        <MarketCoinList start={0} end={5} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    // marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: universalPaddingHorizontalHigh,
    // paddingVertical: universalPaddingVertical,
    // backgroundColor: "#0C0C0C",
  },
  Heading: {
    flexDirection: "row",
    marginTop: 15,
    // justifyContent: "space-between",
    marginBottom: 10,
    // marginLeft: 30
  },
  MarketCoinList: {
    marginTop: 10,
  },
});

export default CoinList;
