// import React, {useState} from 'react';
// import {
//   AppSafeAreaView,
//   AppText,
//   BLACK,
//   BOLD,
//   Button,
//   CommonModal,
//   FOURTEEN,
//   Header,
//   Input,
//   RED,
//   SECOND,
//   SEMI_BOLD,
//   SIXTEEN,
//   TEN,
//   TWELVE,
//   WHITE,
// } from '../../common';
// import {useAppDispatch, useAppSelector} from '../../store/hooks';
// import TouchableOpacityView from '../../common/TouchableOpacityView';
// import {ImageBackground, StyleSheet, View} from 'react-native';
// import {colors} from '../../theme/colors';
// import {
//   borderWidth,
//   universalPaddingHorizontal,
//   universalPaddingHorizontalHigh,
// } from '../../theme/dimens';
// import {
//   about_us_ic,
//   bank_ic,
//   contact_ic,
//   invite_ic,
//   kyc_ic,
//   notification_bell_ic,
//   profile_bg,
//   profile_placeholder_ic,
//   rate_ic,
//   right_ic,
//   settings_ic,
//   lock_ic
// } from '../../helper/ImageAssets';
// import FastImage from 'react-native-fast-image';
// import NavigationService from '../../navigation/NavigationService';
// import {
//   ACTIVITY_LOGS,
//   BANKING_AND_TRADE_SETTINGS_SCREEN,
//   CMS_SCREEN,
//   CONTACT_US_SCREEN,
//   EDIT_PROFILE_SCREEN,
//   INVITE_AND_EARN_SCREEN,
//   KYC_STATUS_SCREEN,
//   NOTIFICATION_SETTINGS_SCREEN,
//   SETTINGS_SCREEN,
//   TWO_FACTOR_AUTHENTICATION,
//   UPDATE_KGIN_SCREEN,
// } from '../../navigation/routes';
// import KeyBoardAware from '../../common/KeyboardAware';
// import {logoutAction} from '../../actions/authActions';
// import {BASE_URL, placeHolderText} from '../../helper/Constants';
// import ReactNativeModal from 'react-native-modal';
// import {commonStyles} from '../../theme/commonStyles';
// import StarRating from 'react-native-star-svg-rating';
// import {SpinnerSecond} from '../../common/SpinnerSecond';
// import {updateRating} from '../../actions/accountActions';
// import {LogoutModal} from '../../common/LogoutModal';
// import {checkValue} from '../../helper/utility';

// const ProfileBox = () => {
//   const languages = useAppSelector(state => {
//     return state.account.languages;
//   });
//   const userData = useAppSelector(state => state.auth.userData);
//   const {firstName, lastName, emailId, mobileNumber, profilepicture} =
//     userData ?? '';
//   return (
//     <TouchableOpacityView
//       onPress={() => NavigationService.navigate(EDIT_PROFILE_SCREEN)}
//       style={styles.profileBoxContainer}>
//       <View style={styles.profileBoxContainerSecond}>
//         <ImageBackground
//           source={profile_bg}
//           resizeMode="contain"
//           style={styles.profileBg}>
//           <FastImage
//             source={
//               profilepicture
//                 ? {uri: `${BASE_URL}${profilepicture}`}
//                 : profile_placeholder_ic
//             }
//             resizeMode="contain"
//             style={styles.profileImage}
//           />
//         </ImageBackground>
//         <View>
//           <AppText
//             color={firstName ? WHITE : SECOND}
//             type={firstName ? TWELVE : TEN}>
//             {firstName
//               ? `${firstName} ${lastName}`
//               : checkValue(languages?.profile_one)}
//           </AppText>
//           <AppText>{`${mobileNumber ?? ''}`}</AppText>
//         </View>
//       </View>
//       <FastImage
//         source={right_ic}
//         resizeMode="contain"
//         style={styles.rightIc}
//       />
//     </TouchableOpacityView>
//   );
// };

// const RenderBox = ({title, data, onPressAction}) => {
//   return (
//     <View>
//       <View style={styles.singleContainerTitle}>
//         <AppText color={SECOND} type={FOURTEEN}>
//           {title}
//         </AppText>
//       </View>
//       {data?.map(e => {
//         return (
//           <TouchableOpacityView
//             onPress={() => onPressAction(e.id)}
//             key={e.id}
//             style={styles.singleContainerFill}>
//             <View style={styles.singleContainerFillSecond}>
//               <FastImage
//                 source={e.icon}
//                 resizeMode="contain"
//                 style={styles.icon}
//               />
//               <AppText weight={SEMI_BOLD} type={FOURTEEN}>
//                 {e.title}
//               </AppText>
//             </View>
//             <FastImage
//               source={right_ic}
//               resizeMode="contain"
//               style={styles.rightIc}
//             />
//           </TouchableOpacityView>
//         );
//       })}
//     </View>
//   );
// };

// const RatingModal = ({isVisible, setIsVisible}) => {
//   const dispatch = useAppDispatch();
//   const [rating, setRating] = useState(3);
//   const [message, setMessage] = useState('');

//   const onSend = () => {
//     let data = {rating: rating, message: message};
//     dispatch(updateRating(data));
//     setIsVisible();
//   };

//   return (
//     <ReactNativeModal
//       animationOut={'slideOutDown'}
//       isVisible={isVisible}
//       backdropOpacity={1}
//       onBackdropPress={setIsVisible}
//       onBackButtonPress={setIsVisible}>
//       <View style={styles.ratingContainer}>
//         <View style={styles.ratingHeader}>
//           <AppText color={BLACK} weight={BOLD} type={SIXTEEN}>
//             Rate cvtrade Exchange
//           </AppText>
//         </View>
//         <View style={styles.ratingBody}>
//           <AppText style={commonStyles.centerText}>
//             How much you would like to rate us from{'\n'}your experience
//           </AppText>
//           <View style={styles.starContainer}>
//             <StarRating
//               rating={rating}
//               onChange={setRating}
//               maxStars={5}
//               starSize={28}
//               emptyColor={'#A3A3A3'}
//             />
//           </View>
//           <Input
//             value={message}
//             placeholder={placeHolderText.message}
//             multiline
//             containerStyle={styles.inputMainContainer}
//             onChangeText={setMessage}
//           />
//           <View style={styles.buttonContainer}>
//             <Button
//               children="Cancel"
//               onPress={setIsVisible}
//               containerStyle={styles.noButton}
//               titleStyle={styles.buttonTitle}
//             />
//             <Button
//               children="Send"
//               onPress={() => onSend()}
//               containerStyle={styles.yesButton}
//               titleStyle={styles.buttonTitle2}
//             />
//           </View>
//         </View>
//       </View>
//     </ReactNativeModal>
//   );
// };

// const Account = () => {
//   const dispatch = useAppDispatch();
//   const [isLogout, setIsLogout] = useState(false);
//   // const [isRating, setIsRating] = useState(false);
//   const languages = useAppSelector(state => {
//     return state.account.languages;
//   });
//   const DATA_1 = [
//     // {
//     //   icon: notification_bell_ic,
//     //   title: checkValue(languages?.account_one),
//     //   id: '1',
//     // },
//     {
//       icon: rate_ic,
//       title: checkValue(languages?.account_fourteen),
//       id: '1',
//     },
//     {
//       icon: settings_ic,
//       title: checkValue(languages?.account_two),
//       id: '2',
//     },

//     {
//       icon: lock_ic,
//       title: checkValue(languages?.account_three),
//       id: '10',
//     },
//   ];
//   const DATA_2 = [
//     {
//       icon: kyc_ic,
//       title: checkValue(languages?.account_four),
//       id: '3',
//     },
//     // {
//     //   icon: bank_ic,
//     //   title: checkValue(languages?.account_five),
//     //   id: '4',
//     // },
//     {
//       icon: invite_ic,
//       title: checkValue(languages?.account_six),
//       id: '5',
//     },
//     {
//       icon: contact_ic,
//       title: checkValue(languages?.account_seven),
//       id: '6',
//     },

//     {
//       icon: about_us_ic,
//       title: checkValue(languages?.account_eight),
//       id: '8',
//     },
//   ];
//   const onPressAction = (id: string) => {
//     switch (id) {
//       // case '1':
//       //   NavigationService.navigate(NOTIFICATION_SETTINGS_SCREEN);
//       //   break;
//       case '1':
//         NavigationService.navigate(ACTIVITY_LOGS);
//         break;
//       case '2':
//         NavigationService.navigate(SETTINGS_SCREEN);
//         break;
//       case '3':
//         NavigationService.navigate(KYC_STATUS_SCREEN);
//         break;
//       case '4':
//         NavigationService.navigate(BANKING_AND_TRADE_SETTINGS_SCREEN);
//         break;
//       case '5':
//         NavigationService.navigate(INVITE_AND_EARN_SCREEN);
//         break;
//       case '6':
//         NavigationService.navigate(CONTACT_US_SCREEN);
//         break;
//       // case '7':
//       //   setIsRating(true);
//       //   break;
//       case '8':
//         NavigationService.navigate(CMS_SCREEN, {
//           id: 'https://cvtradeexchange.com/mobAboutUs',
//         });
//         break;
//       case '9':
//         NavigationService.navigate(UPDATE_KGIN_SCREEN);
//         break;
//       case '10':
//         NavigationService.navigate(TWO_FACTOR_AUTHENTICATION);
//         break;
//       default:
//         break;
//     }
//   };

//   const onLogout = () => {
//     setIsLogout(true);
//   };
//   return (
//     <AppSafeAreaView>
//       <Header />
//       <ProfileBox />
//       <KeyBoardAware style={styles.container}>
//         <RenderBox
//           onPressAction={(id: string) => onPressAction(id)}
//           title={checkValue(languages?.account_nine)}
//           data={DATA_1}
//         />
//         <RenderBox
//           onPressAction={(id: string) => onPressAction(id)}
//           title={checkValue(languages?.account_ten)}
//           data={DATA_2}
//         />
//         <TouchableOpacityView
//           onPress={() => onLogout()}
//           style={styles.logOutButton}>
//           <AppText color={RED} type={FOURTEEN}>
//             {checkValue(languages?.account_eleven)}
//           </AppText>
//         </TouchableOpacityView>
//       </KeyBoardAware>
//       <LogoutModal
//         isVisible={isLogout}
//         onBackButtonPress={() => setIsLogout(false)}
//         title={`${checkValue(languages?.account_twelve)}\n${checkValue(
//           languages?.account_thirteen,
//         )}`}
//         onPressNo={() => setIsLogout(false)}
//         onPressYes={() => {
//           setIsLogout(false);
//           dispatch(logoutAction());
//         }}
//       />
//       {/* <RatingModal
//         isVisible={isRating}
//         setIsVisible={() => setIsRating(false)}
//       /> */}
//     </AppSafeAreaView>
//   );
// };

// export default Account;
// const styles = StyleSheet.create({
//   profileBoxContainer: {
//     backgroundColor: colors.profileBox,
//     padding: universalPaddingHorizontal,
//     marginHorizontal: universalPaddingHorizontalHigh,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   profileBg: {
//     height: 80,
//     width: 80,
//     marginEnd: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 150,
//   },
//   profileBoxContainerSecond: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rightIc: {
//     height: 15,
//     width: 15,
//   },
//   profileImage: {
//     height: 55,
//     width: 55,
//     borderRadius: 100,
//   },
//   icon: {
//     height: 22,
//     width: 22,
//     marginEnd: 10,
//   },
//   singleContainerTitle: {
//     paddingHorizontal: universalPaddingHorizontalHigh,
//     marginTop: universalPaddingHorizontalHigh,
//   },
//   singleContainerFill: {
//     backgroundColor: colors.options,
//     paddingHorizontal: universalPaddingHorizontalHigh,
//     marginVertical: 5,
//     paddingVertical: universalPaddingHorizontal,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   singleContainerFillSecond: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   container: {
//     paddingHorizontal: 0,
//   },
//   logOutButton: {
//     backgroundColor: colors.options,
//     paddingHorizontal: universalPaddingHorizontalHigh,
//     marginVertical: 5,
//     paddingVertical: universalPaddingHorizontal,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: universalPaddingHorizontalHigh,
//   },
//   ratingContainer: {
//     backgroundColor: colors.secondaryText,
//     borderWidth: borderWidth,
//     borderColor: colors.inputBorder,
//     borderRadius: 10,
//   },
//   ratingHeader: {
//     backgroundColor: colors.buttonBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: universalPaddingHorizontal,
//     borderTopEndRadius: 10,
//     borderTopStartRadius: 10,
//   },
//   ratingBody: {
//     padding: universalPaddingHorizontal,
//   },
//   starContainer: {
//     alignItems: 'center',
//     marginVertical: universalPaddingHorizontal,
//   },
//   inputMainContainer: {
//     width: '100%',
//     height: 80,
//     borderRadius: 20,
//     marginTop: 0,
//     alignItems: 'flex-start',
//   },
//   noButton: {
//     flex: 1,
//     backgroundColor: colors.secondaryText,
//     borderColor: colors.buttonBg,
//     borderWidth: borderWidth,
//     marginEnd: 10,
//   },
//   yesButton: {
//     flex: 1,
//     backgroundColor: colors.buttonBg,
//     marginStart: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   buttonTitle: {
//     color: colors.white,
//     fontSize: 14,
//   },
//   buttonTitle2: {
//     color: colors.black,
//     fontSize: 14,
//   },
// });

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
import { useAppDispatch } from "../../store/hooks";
// import { isAuth } from "../../Redux/action";
import {logoutAction} from '../../actions/authActions';
import { Screen } from "../../theme/dimens";
import { AppText, THIRTEEN, BOLD, FOURTEEN } from "../../common";

const Profile = () => {
  const navigation = useNavigation();
    const dispatch = useAppDispatch();
  const [isLogout, setIsLogout] = useState(false);
  

  const Data = [
    {
      id: 2,
      image: User_Verify,
      title: 'KYC Verification',
      // onPress: "KYCProcess1",
    },
    {
      id: 3,
      image: FA_Icon,
      title: 'Two Factor Authorization',
      // onPress: "Manage2FA",
    },
    {
      id: 4,
      image: Notification_Icon,
      title: "Notification",
      // onPress: "Notification",
    },
    {
      id: 5,
      image: FA_Icon,
      title: "Security",
      // onPress: "ChangePassword",
    },
    {
      id: 6,
      image: Currency,
      title: "Currency Preference",
      // onPress: "CurrencyPreference",
    },
    {
      id: 7,
      image: Activity,
      title: "Activity Logs",
      // onPress: "Activity",
    },
  ];
  const onLogout = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "YES",
        onPress: () => {
                    setIsLogout(false),
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
          // onPress={() => navigation?.navigate("ManageAccount")}
        >
          <Image
            source={Profile_Image}
            resizeMode="contain"
            style={styles?.Profile_Image}
          />
          <View style={{ marginHorizontal: 10 }}>
            {/* <Typography
              size={13}
              fontFamily={Font.semiBold}
              textStyle={styles.profile_one}
            >
              {Languages?.profile_one}
            </Typography> */}
            <AppText type={THIRTEEN} weight={BOLD} style={styles.profile_one}>{'Sachin Baghel'}</AppText>
            {/* <Typography size={13} fontFamily={Font.bold}>
              {Languages?.profile_two}
            </Typography> */}
            <AppText type={THIRTEEN} weight={BOLD}>{'+919534343434'}</AppText>
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
            // onPress={() => navigation?.navigate(item?.onPress)}
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

