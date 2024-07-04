import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
import { AppText, SIXTEEN, BOLD, THIRTEEN, MEDIUM, TWELVE } from "../../common";

const CoinSlider = () => {
  const CoinData = [
    {
      id: 1,
      Coin_Logo: Bitcoin_Icon,
      Coin_Name: "Bitcoin",
      Coin_ShortName: "BTC",
      Coin_Currency: "2.0234584 BTC",
      Coin_CrrencyChange: up_Icon,
      Coin_GraphChange: UpGraph_Icon,
      Coin_Logo_Bg: Bitcoin_Icon_2,
    },
    {
      id: 2,
      Coin_Logo: Ethereum_Icon,
      Coin_Name: "Ethereum",
      Coin_ShortName: "ETH",
      Coin_Currency: "1.254775 ETH",
      Coin_CrrencyChange: Down_Icon,
      Coin_GraphChange: DownGraph_Icon,
      Coin_Logo_Bg: Ethereum_Icon_2,
    },
    {
      id: 3,
      Coin_Logo: Bitcoin_Icon,
      Coin_Name: "Bitcoin",
      Coin_ShortName: "BTC",
      Coin_Currency: "2.0234584 BTC",
      Coin_CrrencyChange: up_Icon,
      Coin_GraphChange: UpGraph_Icon,
      Coin_Logo_Bg: Bitcoin_Icon_2,
    },
    {
      id: 4,
      Coin_Logo: Ethereum_Icon,
      Coin_Name: "Ethereum",
      Coin_ShortName: "ETH",
      Coin_Currency: "1.254775 ETH",
      Coin_CrrencyChange: Down_Icon,
      Coin_GraphChange: DownGraph_Icon,
      Coin_Logo_Bg: Ethereum_Icon_2,
    },
  ];

  return (
    <View>
      <AppText
        color={colors.white}
        type={SIXTEEN}
        weight={BOLD}
        style={{ marginLeft: 15 }}
      >
        Markets
      </AppText>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginVertical: 15 }}
      >
        {CoinData?.map((item, index) => {
          return (
            <View
              style={[
                styles?.Main_Container,
                {
                  marginLeft: CoinData?.length + 1 == index ? 0 : 15,
                  marginRight: CoinData?.length - 1 == index ? 15 : 0,
                },
              ]}
              key={index}
            >
              <View style={styles?.ImageBackground_View}>
                <ImageBackground
                  source={item?.Coin_Logo_Bg}
                  resizeMode="contain"
                  style={styles?.CoinBg}
                />
              </View>
              <View style={styles?.CoinMain_Container}>
                <View style={styles?.CoinCommon_Container}>
                  <AppText type={THIRTEEN} weight={BOLD}>
                    {item?.Coin_Name}
                    {"\n"}
                    <AppText
                      type={TWELVE}
                      weight={MEDIUM}
                      color={colors.secondaryText}
                    >
                      {item?.Coin_ShortName}
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
                    {item?.Coin_Currency}
                  </AppText>
                  <Image
                    source={item?.Coin_CrrencyChange}
                    resizeMode="contain"
                    style={styles?.Coin_CrrencyChange}
                  />
                </View>
              </View>
              <Image
                source={item?.Coin_GraphChange}
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
    width: 150,
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
    height: 20,
    top: 5,
  },
  Currency_Continer: {
    alignItems: "center",
    marginTop: 20,
  },
  CoinBg: {
    width: 150,
    height: 150,
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
