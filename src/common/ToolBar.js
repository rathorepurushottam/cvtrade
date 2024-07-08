import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Arrow_Icon,
  Logo,
  Notification_Icon,
  Refresh_Icon,
} from "../helper/ImageAssets";
import { AppText, TWENTY, BOLD, EIGHTEEN } from "./AppText";
import { useNavigation } from "@react-navigation/native";
import { NOTIFICATION_SCREEN } from "../navigation/routes";

const ToolBar = ({
  isLogo = true,
  isSecond,
  title,
  isThird = true,
  isfourth,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.Container,
        { justifyContent: isLogo || isSecond ? "center" : "flex-start" },
      ]}
    >
      <TouchableOpacity
        style={
          isLogo || isSecond ? styles.BackContainer : styles.backContainer2
        }
        onPress={() => navigation?.goBack()}
      >
        <Image
          source={Arrow_Icon}
          resizeMode="contain"
          style={styles.BackIcon}
        />
      </TouchableOpacity>
      {isLogo && !isSecond && (
        <View style={styles.Logo_Container}>
          <Image source={Logo} resizeMode="contain" style={styles.Logo} />
          <AppText type={TWENTY} weight={BOLD}>Trade</AppText>
        </View>
      )}
      {isSecond && (
        <AppText type={EIGHTEEN} weight={BOLD} style={styles.title}>{title}</AppText>
      )}
      {isThird && (
        <TouchableOpacity
          style={styles.NotificationContainer}
          onPress={() => {
            navigation.navigate(NOTIFICATION_SCREEN);
          }}
        >
          <Image
            source={Notification_Icon}
            resizeMode="contain"
            style={styles.NotificationIcon}
          />
        </TouchableOpacity>
      )}
      {isfourth && (
        <TouchableOpacity
          style={styles.NotificationContainer}
        //   onPress={() => navigation?.navigate("ConvertHistory")}
        >
          <Image
            source={Refresh_Icon}
            resizeMode="contain"
            style={styles.NotificationIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  BackIcon: {
    height: 16,
    width: 16,
  },
  Logo: {
    height: 30,
    width: 30,
  },
  Container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 35 : 40,
  },
  BackContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 45,
    padding: 20,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#415841",
    alignItems: "center",
    justifyContent: "center",
  },
  Logo_Container: {
    flexDirection: "row",
    height: 50,
    width: 120,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
  },
  backContainer2: {
    padding: 20,
  },
  NotificationContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 45,
    padding: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#415841",
    alignItems: "center",
    justifyContent: "center",
  },
  NotificationIcon: {
    height: 18,
    width: 18,
  },
});

export default ToolBar;
