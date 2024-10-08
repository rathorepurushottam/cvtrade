import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Keyboard } from "react-native";
import AppBackground from "../../common/AppBackground";
// import Typography, { FULL_WIDTH } from "../../Common/Typography";
import ToolBar from "../../common/ToolBar";
// import { Languages } from "../../Helper/Languages";
import { colors } from "../../theme/colors";
import CommonInput from "../../common/CommonInput";
import SpaceBetweenView from "../../common/SpaceBetween";
import CommonButton from "../../common/CommonButton";
import { AppText, Input, SIXTEEN } from "../../common";
import { Screen } from "../../theme/dimens";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRoute } from "@react-navigation/native";
import { errorText, placeHolderText, titleText } from "../../helper/Constants";
import { checkValidAmount, toFixedThree, twoFixedTwo } from "../../helper/utility";
import { sendOtp } from "../../actions/authActions";
import { showError } from "../../helper/logger";
import { withdrawCoin } from "../../actions/walletActions";

const Withdraw = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const balance = route?.params?.balance;
  const userData = useAppSelector(state => state.auth.userData);
  const {chain, currency} = walletDetail ?? '';
  const {emailId} = userData ?? '';
  const [otp, setOtp] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [coinChain, setCoinChain] = useState(chain[0]);
  const [otpText, setOtpText] = useState('Get OTP');
  const [focusCode, setFocusCode] = useState(false);
  const [focusAddr, setFocusAddr] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const addressInput = useRef(null);
  const amountInput = useRef(null);
  const onGetOtp = () => {
    let data = {
      email_or_phone: emailId,
      resend: true,
      type: false,
    };
    dispatch(sendOtp(data));
    setOtpText('Resend OTP');
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!otp) {
      showError(errorText.otp);
      return;
    }
    if (!address) {
      showError(errorText.wallet);
      return;
    }
    if (!amount) {
      showError(errorText.amount);
      return;
    }
    if (!checkValidAmount(amount) || (parseInt(amount) < 0)) {
        showError("Please Enter Valid Amount");
        return;
    }

    if(parseInt(amount) > balance) {
      showError('You do not have sufficent balance!');
      return;
    }
    if(walletDetail?.min_withdrawal < amount) {
      showError(`Minimum withdrawal amount should be ${walletDetail?.min_withdrawal} USDT`);
      return;
    }
    
    let data = {
      otp: otp,
      address: address,
      amount: parseFloat(amount),
      email_or_phone: emailId,
      chain: coinChain,
      currency_id: walletDetail?._id
    };
    Keyboard.dismiss();
    dispatch(withdrawCoin(data));
  };

  const handleMaxAmount = () => {
    const bal = String(balance);
    setAmount(bal);
  };
  return (
    <AppBackground>
      <ScrollView style={styles.scrollView}>
        <ToolBar isLogo={false} isSecond title={'Withdraw'} />
        <View style={styles.container}>
           <AppText type={SIXTEEN}>Select Network :</AppText>
          <View style={styles.networkSelection}>
          {chain?.length > 0 ? (
              chain?.map(item => (
                <TouchableOpacity
            onPress={() => setCoinChain(item)}
            style={[
              styles.networkButton,
              coinChain === item && styles.selectedNetwork,
            ]}
          >
            <AppText>
              {item}
            </AppText>
          </TouchableOpacity>
              ))
            ) : (
              <AppText>No chain Availbale</AppText>
            )}
          </View>

          <Input
            title={titleText.code}
            placeholder={placeHolderText.code}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => addressInput?.current?.focus()}
            isOtp
            onfocus={() => setFocusCode(true)}
              onBlur={() => setFocusCode(false)}
            onSendOtp={() => onGetOtp()}
            otpText={otpText}
            containerStyle={{
              borderColor: !focusCode
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          <Input
            title={titleText.wallet}
            placeholder={placeHolderText.wallet}
            value={address}
            onChangeText={text => setAddress(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            assignRef={input => {
              addressInput.current = input;
            }}
            onSubmitEditing={() => amountInput?.current?.focus()}
            onfocus={() => setFocusAddr(true)}
            onBlur={() => setFocusAddr(false)}
            containerStyle={{
              borderColor: !focusAddr
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          <Input
            title={titleText.amount}
            placeholder={placeHolderText.amount}
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            assignRef={input => {
              amountInput.current = input;
            }}
            isMax
            onMaxAmount={handleMaxAmount}
            onfocus={() => setFocusAmount(true)}
            onBlur={() => setFocusAmount(false)}
            containerStyle={{
              borderColor: !focusAmount
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
        </View>

        <SpaceBetweenView
          firstText={"Withdraw fee :"}
          secondText={walletDetail?.withdrawal_fee}
        />
        <SpaceBetweenView
          firstText={"Min. withdraw amount"}
          secondText={walletDetail?.min_withdrawal}
          containerStyle={{ marginTop: 0 }}
        />
        <SpaceBetweenView
          firstText={"You will get :"}
          secondText={`${amount === 0 ? 0 : parseFloat(amount - walletDetail?.withdrawal_fee)} ${walletDetail?.short_name}`}
          containerStyle={{ marginTop: 0 }}
          Firststyle={{fontWeight: 'bold'}}
        />
        <View
          style={{
            width: Screen.Width - 55,
            marginTop: 5,
            height: 2,
            backgroundColor: colors.inputBgColor,
            alignSelf: "center",
          }}
        ></View>
        <SpaceBetweenView
          firstText={"Available Balance :"}
          secondText={toFixedThree(balance)}
          containerStyle={{ marginTop: 0 }}
        />
        <CommonButton title="Withdraw"  containerStyle={{marginTop:25}} onPress={onSubmit}/>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: Screen.Width - 35,
    paddingVertical: 5,
    marginTop: 30,
    alignSelf: "center",
  },
  networkSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  networkButton: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderColor: colors.inputBorderColor,
    marginTop: 5,
  },
  selectedNetwork: {
    backgroundColor: colors.purple,
  },
  marginLeft: {
    marginLeft: 5,
  },
});

export default Withdraw;
