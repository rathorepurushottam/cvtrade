import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Airdrops_Icon,
  HotCoin_Icon,
  InviteEarn_Icon,
  Kwizz_Icon,
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
import { INVITE_AND_EARN_SCREEN } from "../../navigation/routes";

const NewsSection = () => {
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
      image: Kwizz_Icon,
      title: "Kwizz",
      onPress: () => navigation.navigate("ComingSoon"),
    },
    {
      id: 5,
      image: Trading_Icon,
      title: "Trading",
      onPress: () => navigation.navigate("ComingSoon"),
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

  return (
    <View style={styles.Main_Container}>
      <View style={styles.Min_Container}>
        <Image
          source={News_Icon}
          resizeMode="contain"
          style={styles.News_Icon}
        />
        {/* <Typography
          size={12}
          fontFamily={Font.medium}
          textStyle={{ marginLeft: 15 }}
        >
          We’ll display the current and upcoming news here in this section.
        </Typography> */}
        <AppText type={TWELVE} weight={MEDIUM} style={{ marginLeft: 15 }}>
        We’ll display the current and upcoming news here in this section.
        </AppText>
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
      backgroundColor: colors.InputBackground,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 22,
      width: Screen.Width,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    News_Icon: {
      width: 20,
      height: 20,
    },
    Main_Container: {
      marginTop: -30,
    },
    icon: {
      width: 18,
      height: 18,
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
