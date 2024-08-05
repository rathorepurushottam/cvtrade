import React, { useRef } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  Airdrops_Icon,
  HotCoin_Icon,
  InviteEarn_Icon,
  peopleIcon,
  Launchpad_Icon,
  More_Icon,
  News_Icon,
  Staking_Icon,
  Trading_Icon,
} from "../../helper/ImageAssets";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AppText, TWELVE, MEDIUM } from "../../common";
import { Screen } from "../../theme/dimens";
import { INVITE_AND_EARN_SCREEN, TRADE, TRADE_SCREEN } from "../../navigation/routes";

const NewsSection = () => {
  const ref = useRef(null);
  const navigation = useNavigation();

  const Data = [
    {
      id: 1,
      image: Staking_Icon,
      title: "Staking",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 2,
      image: InviteEarn_Icon,
      title: "Invite Earn",
      onPress: () => navigation.navigate(INVITE_AND_EARN_SCREEN),
    },
    {
      id: 3,
      image: Airdrops_Icon,
      title: "Airdrops",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 4,
      image: peopleIcon,
      title: "Partnership",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 5,
      image: Trading_Icon,
      title: "Trading",
      onPress: () => navigation.navigate("Trades"),
    },
    {
      id: 6,
      image: HotCoin_Icon,
      title: "Hot Coin",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 7,
      image: Launchpad_Icon,
      title: "Launchpad",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 8,
      image: More_Icon,
      title: "More",
      onPress: () => navigation.navigate("ComingSoon"),
    },
  ];

  const news = [' Welome to CVTrade.io community.', 'Get 5000 SHIB coin on SignUp Check your Wallet.', 'CVTrade.io is the Gateway of the Crypto World!'];

  return (
    <View style={styles.Main_Container}>
      <View style={styles.Min_Container}>
        <Image
          source={News_Icon}
          resizeMode="contain"
          style={styles.News_Icon}
        />
        <Carousel
        ref={ref}
        data={news}
        renderItem={({item}) => {
          return (
            <AppText type={TWELVE} weight={MEDIUM} style={{ marginLeft: 15 }}>
            {item}
            </AppText>
          );
         
        }}
        vertical={true}
        sliderHeight={20}
        itemHeight={20}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={2500}
        loop={true}
      />
        
      </View>
      <View style={styles.Common_Container}>
        {Data.map((item) => (
          <TouchableOpacity
            onPress={item.onPress}
            key={item.id}
            style={styles.Data_Container}
          >
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.icon}
            />
            {/* <Typography
              size={12}
              fontFamily={Font.medium}
              textStyle={{ marginTop: 5 }}
            >
              {item.title}
            </Typography> */}
            <AppText  type={TWELVE} weight={MEDIUM} style={{ marginLeft: 15 }}>
            {item.title}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NewsSection;

const styles = StyleSheet.create({
    Min_Container: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 22,
      width: Screen.Width,
     
    },
    News_Icon: {
      width: 20,
      height: 20,
    },
    Main_Container: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    icon: {
      width: 25,
      height: 25,
      marginLeft: 10
    },
    Common_Container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    Data_Container: {
      alignItems: "center",
      paddingVertical: 10,
      width: "25%",
    },
  });
