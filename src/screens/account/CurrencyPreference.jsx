import React, { useState, useRef, useEffect } from "react";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import {
  BG_Two,
  Binance_Icon,
  Bitcoin_Icon,
  CVToken_Icon,
  Ethereum_Icon,
  Solana_Icon,
  Tether_Icon,
  XRP_Icon,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {AppText, BOLD, FOURTEEN, MEDIUM, SIXTEEN, TEXTCOLOR, THIRTEEN, TWELVE } from "../../common";
import { colors } from "../../theme/colors";
import { Screen } from "../../theme/dimens";
import { changeCurrencyPreference } from "../../actions/accountActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonButton from "../../common/CommonButton";

const CurrencyPreference = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);
  const {currency_prefrence} = userData ?? '';
  const Data = [
    {
      id: 1,
      image: Tether_Icon,
      CoinName: "Tether USD",
      Currency: "USDT",
    },
    {
      id: 2,
      image: Ethereum_Icon,
      CoinName: "Ethereum",
      Currency: "ETH",
    },
    {
      id: 3,
      image: Binance_Icon,
      CoinName: "Binance",
      Currency: "BNB",
    },
  ];
  const animatedValues = useRef(Data?.map(() => new Animated.Value(0))).current;
  const [selectCurrency, setSelectCurrency] = useState(currency_prefrence);

  const handleCurrencySelection = (currency) => {
    setSelectCurrency(currency);
  };
  useEffect(() => {
    setSelectCurrency(currency_prefrence);
  }, [currency_prefrence]);

  const onSubmit = () => {
    const _data = {
      currency: selectCurrency,
    };
    
    dispatch(changeCurrencyPreference(_data));
  };
  useEffect(() => {
    const animations = Data?.map((item, index) => {
      return Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: index * 250,
      });
    });
    Animated.stagger(100, animations).start();
  }, []);

  console.log(currency_prefrence, "currency_prefrence")

  return (
    <AppSafeAreaView source={BG_Two}>
      <ToolBar isLogo={false} isSecond title={"Currency Preference"} />
      <View style={styles?.Main_Container}>
        {Data?.map((item, index) => {
          const translateX = animatedValues[index]?.interpolate({
            inputRange: [0, 1],
            outputRange: index % 2 === 0 ? [-Screen.Width, 0] : [Screen.Width, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[styles?.Data_Container, { transform: [{ translateX }] }]}
            >
              <View style={styles?.CoinDetails_Container}>
                <Image
                  source={item?.image}
                  resizeMode="contain"
                  style={styles?.image}
                />
                <View>
                  <AppText size={THIRTEEN} weight={BOLD}>
                    {"   "}
                    {item?.CoinName}
                  </AppText>
                  <AppText
                    size={TWELVE}
                    fontFamily={MEDIUM}
                    color={TEXTCOLOR}
                  >
                    {"    "}
                    {item?.Currency}
                  </AppText>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles?.Dot_Container,
                  selectCurrency === item?.Currency && {
                    borderColor: "#A7E69E",
                  },
                ]}
                onPress={() => handleCurrencySelection(item?.Currency)}
              >
                {selectCurrency === item?.Currency && (
                  <View style={styles?.Dot} />
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
        <CommonButton 
        title="Confirm"
        onPress={() => onSubmit()}
        containerStyle={{marginTop: 50}}
        />
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
  },
  Data_Container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF10",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  image: {
    width: 34,
    height: 34,
  },
  CoinDetails_Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  Dot_Container: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: colors?.white,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  Dot: {
    width: 10,
    height: 10,
    borderRadius: 12,
    backgroundColor: "#A7E69E",
  },
});

export default CurrencyPreference;
