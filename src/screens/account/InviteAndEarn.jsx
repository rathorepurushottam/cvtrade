import React, { useState, useEffect } from "react";
import {
  FB,
  REFER,
  TELEGRAM,
  TWITTER,
  WHATSAPP,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import {
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppBackground from "../../common/AppBackground";
import Icon from "../../common/Icon";
// import Typography, { FULL_WIDTH } from "../../Common/Typography";
// import Font from "../../Common/Font";
import { colors } from "../../theme/colors";
import CommonInput from "../../common/CommonInput";
import { AppText, BLACK, BLUE, FIFTEEN, THIRTEEN, WHITE, BOLD } from "../../common";
import { Screen } from "../../theme/dimens";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserReferCode } from "../../actions/accountActions";
import CommonButton from "../../common/CommonButton";
import { shareToAny } from "../../helper/utility";

const ReferAndEarn = () => {
  const referCode = useAppSelector(state => state.home.referCode);
  const dispatch = useAppDispatch();
  const [shareData, setShareData] = useState([
    { id: 0, icon: FB, url: "https://www.facebook.com/" },
    { id: 1, icon: WHATSAPP, url: "https://www.whatsapp.com/" },
    { id: 2, icon: TWITTER, url: "https://x.com/" },
    { id: 1, icon: TELEGRAM, url: "https://telegram.org/" },
  ]);
  useEffect(() => {
    dispatch(getUserReferCode());
    // dispatch());
  }, []);
  const message = `https://cvtrade.io/signup?reffcode=${referCode}`;
  const onSubmit = () => {
    shareToAny(message);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item?.url);
        }}
        activeOpacity={0.8}
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: colors.inputBorderColor,
          marginLeft: 20,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon source={item?.icon} tintColor={colors.white} size={25} />
      </TouchableOpacity>
    );
  };
  return (
    <AppBackground>
      <ScrollView style={{ flex: 1 }}>
        <ToolBar isLogo={false} isSecond title={"Refer & Earn"} />

        <Icon source={REFER} size={270} imageStyle={{ alignSelf: "center" }} />
        <View
          style={{ width: Screen.Width - 20, padding: 10, alignSelf: "center" }}
        >
          <View
            style={{
              width: "70%",
              backgroundColor: "#afd9aa",
              padding: 5,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20
            }}
          >
            <AppText type={FIFTEEN} color={BLACK} weight={BOLD}>
              Total Referal commission
            </AppText>
            <AppText type={FIFTEEN} color={BLACK} weight={BOLD}>
            10000 SHIB
            </AppText>
            
          </View>
          <AppText
            type={FIFTEEN}
            color={BLUE}
            weight={BOLD}
            textStyle={{ marginVertical: 5 }}
          >
            Earn 5000 SHIB{" "}
            <AppText type={FIFTEEN} color={WHITE} weight={BOLD}>
              for each friend you refer.
            </AppText>{" "}
          </AppText>

          <AppText
            type={THIRTEEN}
            style={{ lineHeight: 18 }}
            color={WHITE}
          >
            Invite a friend to CV trade and Earn 5000 SHIB after completing
            their KYC.
          </AppText>

          <CommonInput
            isOtp
            Label="REFERRAL CODE"
            labelStyle={{ marginHorizontal: 0 }}
            mainContainer={{ marginVertical: 10 }}
            value={referCode}
            otpText="Copy"
            editable={false}
          />
          <CommonButton title="Invite a friend" onPress={() => onSubmit()}></CommonButton>
          <AppText
            type={THIRTEEN}
            style={{ lineHeight: 18 }}
            color={WHITE}
          >
            Or share via
          </AppText>
        </View>
        <FlatList horizontal data={shareData} renderItem={_renderItem} />
      </ScrollView>
    </AppBackground>
  );
};


export default ReferAndEarn;
