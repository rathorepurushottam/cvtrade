import React, { useState } from "react";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import { BG_Two } from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import { StyleSheet, View } from "react-native";
import MarketCoinList from "../home/MarketCoinList";
import { universalPaddingHorizontalHigh, universalPaddingVertical } from "../../theme/dimens";
import { AppText, TWELVE } from "../../common";
import { colors } from "../../theme/colors";
import HomeCoinTabs from "../home/HomeCoinTabs";

const Market = () => {
  const [activeTab, setActiveTab] = useState('spot');
  return (
    <AppSafeAreaView >
      <ToolBar isLogo={false} isSecond title={"Market"} />
      <View style={[styles?.Main_Container, { marginBottom: 290 }]}>
      <HomeCoinTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
      <View style={styles?.Heading}>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Asset</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Last Price</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>24H Change</AppText>
      </View>
      <View style={styles?.MarketCoinList}>
        <MarketCoinList activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
    </AppSafeAreaView>
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

export default Market;
