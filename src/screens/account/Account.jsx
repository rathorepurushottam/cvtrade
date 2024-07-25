import React, {useState} from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Activity,
  Back_Icon,
  Currency,
  FA_Icon,
  Notification_Icon,
  Profile_Image,
  User_Verify,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
// import { Languages } from "../../Helper/Languages";
// import { borderWidth } from "../../Theme/Dimension";
import { useNavigation } from "@react-navigation/native";
// import Typography, { FULL_WIDTH } from "../../Common/Typography";
// import Font from "../../Common/Font";
import AppBackground from "../../common/AppBackground";
// import CommonButton from "../../Common/CommonButton";
import { colors } from "../../theme/colors";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { isAuth } from "../../Redux/action";
import { ACTIVITY_LOGS, CHANGE_PASSWORD_SCREEN, CURRENCY_PREFERENCE_SCREEN, EDIT_PROFILE_SCREEN, KYC_STATUS_SCREEN } from "../../navigation/routes";
import {logoutAction} from '../../actions/authActions';
import { Screen } from "../../theme/dimens";
import { AppText, THIRTEEN, BOLD, FOURTEEN } from "../../common";

const Profile = () => {
  const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.auth.userData);
    const {
       firstName,
      lastName,
      mobileNumber,
      profilepicture,
      emailId,
    } = userData ?? '';
  

  const Data = [
    {
      id: 2,
      image: User_Verify,
      title: 'KYC Verification',
      onPress: KYC_STATUS_SCREEN,
    },
    {
      id: 3,
      image: FA_Icon,
      title: 'Two Factor Authorization',
      onPress: "TWO_FACTOR_AUTHENTICATION",
    },
    {
      id: 4,
      image: Notification_Icon,
      title: "Notification",
      onPress: "NOTIFICATION_SCREEN",
    },
    {
      id: 5,
      image: FA_Icon,
      title: "Security",
      onPress: CHANGE_PASSWORD_SCREEN,
    },
    {
      id: 6,
      image: Currency,
      title: "Currency Preference",
      onPress: CURRENCY_PREFERENCE_SCREEN,
    },
    {
      id: 7,
      image: Activity,
      title: "Activity Logs",
      onPress: ACTIVITY_LOGS,
    },
  ];
  const onLogout = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "YES",
        onPress: () => {
                    // setIsLogout(false),
                    dispatch(logoutAction());
                  },
        style: "cancel",
      },
      { text: "NO", onPress: () => console.log("OK Pressed") },
    ]);
  return (
    <AppBackground>
      <ToolBar isLogo={false} isSecond title="Profile" />
      <View style={styles?.Header_Container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles?.Details_Container}
          onPress={() => navigation.navigate(EDIT_PROFILE_SCREEN)}
        >
          <Image
            source={profilepicture ? { uri: `${BASE_URL}${profilepicture}` } : Profile_Image}
            resizeMode="contain"
            style={styles?.Profile_Image}
          />
          <View style={{ marginHorizontal: 10 }}>
            <AppText type={THIRTEEN} weight={BOLD} style={styles.profile_one}>{`${firstName} ${lastName}`}</AppText>
            <AppText type={THIRTEEN} weight={BOLD}>{emailId}</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        //  onPress={() => navigation?.navigate("ManageAccount")}
         >
          <Image
            source={Back_Icon}
            resizeMode="contain"
            style={styles?.Back_Icon}
          />
        </TouchableOpacity>
      </View>
      {/* <Typography
        size={14}
        fontFamily={Font.semiBold}
        textStyle={styles?.profile_eleven}
      >
        {Languages?.profile_eleven}
      </Typography> */}
      <AppText type={FOURTEEN} weight={BOLD} style={styles?.profile_eleven}>{'Manage'}</AppText>
      {Data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles?.Manage_Container}
            onPress={() => navigation?.navigate(item?.onPress)}
          >
            <View style={styles?.IconDetails}>
              <Image
                source={item?.image}
                resizeMode="contain"
                style={styles?.Icon}
              />
              {/* <Typography size={13}>
                {"    "}
                {item?.title}
              </Typography> */}
              <AppText type={THIRTEEN}>{item?.title}</AppText>
            </View>
            <Image
              source={Back_Icon}
              resizeMode="contain"
              style={styles?.Back_Icon2}
            />
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.logoutBtn}
        onPress={onLogout}
      >
        {/* <Typography size={13} color={Colors.red} fontFamily={Font.bold}>
          LOGOUT
        </Typography> */}
        <AppText type={THIRTEEN} color={colors.red} weight={BOLD}>
        LOGOUT
        </AppText>
      </TouchableOpacity>
      {/* <Typography
        size={13}
        fontFamily={Font.bold}
        textStyle={styles?.profile_ten}
      >
        {Languages?.profile_ten}
      </Typography> */}
      <AppText type={THIRTEEN} weight={BOLD} style={styles?.profile_ten}>{'CV Trade V1.2323'}</AppText>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    width: Screen.Width,
    height: 45,
    backgroundColor: "#FFFFFF18",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  Profile_Image: {
    width: 50,
    height: 50,
  },
  Back_Icon: {
    width: 15,
    height: 15,
    transform: [{ rotate: "-180 deg" }],
  },
  Header_Container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF18",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 40,
  },
  Details_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile_one: {
    color: "#FFFFFF99",
  },

  profile_eleven: {
    color: "#FFFFFF99",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  Manage_Container: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    backgroundColor: "#FFFFFF10",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFFFFF07",
  },
  Icon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF99",
    marginRight: 10
  },
  IconDetails: {
    flexDirection: "row",
    // alignItems: "center",
  },
  Back_Icon2: {
    width: 12,
    height: 12,
    transform: [{ rotate: "-180 deg" }],
  },
  profile_ten: {
    marginTop: 30,
    textAlign: "center",
  },
});

export default Profile;

