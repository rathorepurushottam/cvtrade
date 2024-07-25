import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme/colors";
import {
  BottomTab_BG,
  Convert_Black,
  Convert_Icon,
  Home_Icon,
  Market_Icon,
  Profile_Icon,
  Shadow_Line,
  TabCenter_Icon,
  Wallet_Icon,
} from "../helper/ImageAssets";
import {AppText, MEDIUM, TWELVE } from "../common/AppText";
import NavigationService from "./NavigationService";
import {
  CONVERT_SCREEN,
  HOME_SCREEN,
  MARKET_SCREEN,
  PROFILE_SCREEN,
  WALLET_SCREEN,
} from "./Routes";
import { Screen } from "../Theme/dimens";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
// import Typography from "../Common/Typography";
// import Font from "../Common/Font";

const TabIcon = ({ focused, icon, index }) => {
  const isCenter = index === 2;

  if (isCenter) {
    return (
      <LinearGradient
        colors={["#57934E", "#AAE9A1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.tabIconContainer, styles.centerTabIconContainer]}
      >
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={colors.black}
          style={[styles.tabIcon, styles.centerTabIcon]}
        />
      </LinearGradient>
    );
  } else {
    return (
      <View style={styles.tabIconContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={focused ? colors.greenShade : colors.white}
          style={styles.tabIcon}
        />
      </View>
    );
  }
};

const CustomTabBar = ({ state }) => {
  const Data = [
    {
      id: 1,
      icon: Home_Icon,
      label: "Home",
      screen: "Home",
    },
    {
      id: 2,
      icon: Market_Icon,
      label: "Market",
      screen: "Market",
    },
    {
      id: 3,
      icon: Convert_Black,
      label: "Trades",
      screen: "Trades",
    },
    {
      id: 4,
      icon: Wallet_Icon,
      label: "Wallet",
      screen: "Wallet",
    },
    {
      id: 5,
      icon: Profile_Icon,
      label: "Profile",
      screen: "Profile",
    },
  ];
  const navigation = useNavigation();
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      // source={BottomTab_BG}
      resizeMode="cover"
      tintColor={colors.inputBgColor}
      style={styles?.BottomTab_BG}
    >
      {Data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item?.screen)}
          >
            {state?.index === index ? (
              index === 2 ? (
                <></>
              ) : (
                <Image
                  source={Shadow_Line}
                  resizeMode="contain"
                  style={styles?.Shadow_Line}
                />
              )
            ) : (
              <></>
            )}

            <View style={styles.TabCommon_Container}>
              <TabIcon
                focused={state.index === index}
                icon={item?.icon}
                index={index}
              />
              {/* <AppText
                type={TWELVE}
                weight={MEDIUM}
                style={{
                  top: 5,
                  color:
                    state.index === index ? colors.greenShade : colors.white,
                }}
              >
                {item?.label}
              </AppText> */}
              <AppText type={TWELVE} weight={MEDIUM} style={{
                top: index === 2 ? 16 : 5,
                color:
                  state.index === index ? colors.greenShade : colors.white,
              }}>{item?.label}</AppText>
            </View>
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  BottomTab_BG: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111111",
    height: 65,
    paddingHorizontal: 20,
  },
  TabIcon: {
    width: 22,
    height: 22,
  },
  Shadow_Line: {
    width: 35,
    height: 3,
    top: -8,
    right: 3,
    position: "absolute",
  },
  TabCommon_Container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  TabCenter_Icon: {
    width: 65,
    height: 65,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerTabIconContainer: {
    borderRadius: 30,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 8,
  },
  tabIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  centerTabIcon: {
    width: 22,
    height: 22,
  },
});

export default CustomTabBar;
