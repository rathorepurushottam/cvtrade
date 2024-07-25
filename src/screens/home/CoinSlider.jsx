import React, { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  Bitcoin_Icon,
  Bitcoin_Icon_2,
  DownGraph_Icon,
  Down_Icon,
  Ethereum_Icon,
  Ethereum_Icon_2,
  UpGraph_Icon,
  up_Icon,
} from "../../helper/ImageAssets";

import { colors } from "../../theme/colors";
import {
  AppText,
  SIXTEEN,
  BOLD,
  THIRTEEN,
  MEDIUM,
  TWELVE,
  GREEN,
  RED,
} from "../../common";
import { useAppSelector } from "../../store/hooks";
import { twoFixedTwo } from "../../helper/utility";
import { BASE_URL } from "../../helper/Constants";
import { Screen } from "../../theme/dimens";

const CoinSlider = () => {
  const ref = useRef(null);
  const coinData = useAppSelector((state) => state.home.coinPairs);
  return (
    <View style={{ marginVertical: 10, paddingRight: 30, paddingLeft: 10 }}>
      <AppText
        color={colors.white}
        type={SIXTEEN}
        weight={BOLD}
        style={{ marginLeft: 15 }}
      >
        Markets
      </AppText>
      {/* <Carousel
        ref={ref}
        data={coinData?.slice(0,10)}
        renderItem={renderItem}
        sliderWidth={Screen?.Width}
        itemWidth={Screen?.Width /2.1}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={2500}
        loop={true}
        // onSnapToItem={(index) => {
        //   setActiveIndex(index);
        // }}
      /> */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginVertical: 15 }}
      >
        {coinData?.map((item, index) => {
          return (
            <View
              style={[
                styles?.Main_Container,
                {
                  marginLeft: coinData?.length + 1 == index ? 0 : 15,
                  marginRight: coinData?.length - 1 == index ? 15 : 0,
                },
              ]}
              key={index}
            >
              <View style={styles?.ImageBackground_View}>
                <ImageBackground
                  source={{ uri: `${BASE_URL}${item?.icon_path}` }}
                  resizeMode="contain"
                  style={styles?.CoinBg}
                />
              </View>
              <View style={styles?.CoinMain_Container}>
                <View style={styles?.CoinCommon_Container}>
                  <AppText type={THIRTEEN} weight={BOLD}>
                    {item?.base_currency_fullname}
                    {"\n"}
                    <AppText
                      type={TWELVE}
                      weight={MEDIUM}
                      color={colors.secondaryText}
                    >
                      {item?.base_currency}
                    </AppText>
                  </AppText>
                  <Image
                    source={item?.Coin_Logo}
                    resizeMode="contain"
                    style={styles?.Coin_Logo}
                  />
                </View>
                <View style={styles?.Currency_Continer}>
                  <AppText
                    type={THIRTEEN}
                    weight={BOLD}
                    style={{ textAlign: "center" }}
                  >
                    {twoFixedTwo(item?.buy_price)} {item?.base_currency}
                  </AppText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={item?.change > 0 ? Down_Icon : up_Icon}
                    resizeMode="contain"
                    style={styles?.Coin_CrrencyChange}
                  />
                  <AppText color={item?.change > 0 ? RED : GREEN}>
                    {twoFixedTwo(item?.change)}%
                  </AppText>
                </View>
              </View>
              <Image
                source={item?.change > 0 ? DownGraph_Icon : UpGraph_Icon}
                resizeMode="contain"
                style={styles?.Coin_GraphChange}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    width: 170,
    height: 140,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.inputBgColor,
    backgroundColor: "#0C0C0C",
    alignItems: "center",
  },
  Coin_Logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  Coin_GraphChange: {
    width: 150,
    height: 84,
    bottom: 0,
    position: "absolute",
  },
  CoinCommon_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Coin_CrrencyChange: {
    width: 60,
    height: 10,
    top: 5,
  },
  Currency_Continer: {
    alignItems: "center",
    marginTop: 20,
  },
  CoinBg: {
    width: 40,
    height: 40,
    bottom: 35,
    left: 40,
  },
  CoinMain_Container: {
    position: "absolute",
    marginTop: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  ImageBackground_View: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default CoinSlider;
