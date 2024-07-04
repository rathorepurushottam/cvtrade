// import React, {useRef, useState} from 'react';
// import {
//   AppText,
//   BLACK,
//   Button,
//   FOURTEEN,
//   Input,
//   SECOND,
//   SEMI_BOLD,
//   TEN,
//   TWELVE,
// } from '../../common';
// import AppSafeAreaView from '../../common/AppSafeAreaView';
// import ToolBar from '../../common/ToolBar';
// import {useAppDispatch, useAppSelector} from '../../store/hooks';
// import {useRoute} from '@react-navigation/native';
// import {sendOtp} from '../../actions/authActions';
// import {Keyboard, StyleSheet, View} from 'react-native';
// import {showError} from '../../helper/logger';
// import {errorText, placeHolderText, titleText} from '../../helper/Constants';
// import KeyBoardAware from '../../common/KeyboardAware';
// import {colors} from '../../theme/colors';
// import {
//   borderWidth,
//   universalPaddingHorizontal,
//   universalPaddingTop,
// } from '../../theme/dimens';
// import {withdrawCoin} from '../../actions/walletActions';
// import TouchableOpacityView from '../../common/TouchableOpacityView';
// import { checkValidAmount } from '../../helper/utility';

// const Withdraw = () => {
//   const dispatch = useAppDispatch();
//   const route = useRoute();
//   const walletDetail = route?.params?.walletDetail;
//   const balance = route?.params?.balance;
//   const userData = useAppSelector(state => state.auth.userData);
//   const {chain, currency} = walletDetail ?? '';
//   const {emailId} = userData ?? '';
//   const [otp, setOtp] = useState<string>('');
//   const [address, setAddress] = useState('');
//   const [amount, setAmount] = useState('');
//   const [coinChain, setCoinChain] = useState(chain[0]);
//   const [otpText, setOtpText] = useState('Get OTP');
//   const addressInput = useRef(null);
//   const amountInput = useRef(null);
//   const onGetOtp = () => {
//     let data = {
//       email_or_phone: emailId,
//       resend: true,
//       type: false,
//     };
//     dispatch(sendOtp(data));
//     setOtpText('Resend OTP');
//     Keyboard.dismiss();
//   };

//   const onSubmit = () => {
//     if (!otp) {
//       showError(errorText.otp);
//       return;
//     }
//     if (!address) {
//       showError(errorText.wallet);
//       return;
//     }
//     if (!amount) {
//       showError(errorText.amount);
//       return;
//     }
//     if (!checkValidAmount(amount) || (parseInt(amount) < 0)) {
//         showError("Please Enter Valid Amount");
//         return;
//     }
//     if(parseInt(amount) > balance) {
//       showError('You do not have sufficent balance!');
//       return;
//     }
    
//     let data = {
//       otp: otp,
//       address: address,
//       amount: amount,
//       email_or_phone: emailId,
//       chain: coinChain,
//       currency_id: walletDetail?._id
//     };
//     Keyboard.dismiss();
//     dispatch(withdrawCoin(data));
//   };

//   // console.log(walletDetail, 'walletDetail');
//   return (
//     <AppSafeAreaView>
//       <ToolBar isSecond title={`Withdraw ${walletDetail?.short_name}`} />
//       <KeyBoardAware>
//         <View style={styles.container}>
//         <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 10,
//               justifyContent: 'space-evenly',
//             }}>
//             {chain?.length > 0 ? (
//               chain?.map(item => (
//                 <TouchableOpacityView
//                   style={{
//                     backgroundColor: coinChain === item ? colors.buttonBg :colors.textGray,
//                     padding: 10,
//                     alignItems: 'center',
//                     borderRadius: 10
//                   }}
//                   onPress={() => setCoinChain(item)}
//                   >
//                   <AppText color={BLACK} type={TWELVE} weight={SEMI_BOLD}>
//                     {item}
//                   </AppText>
//                 </TouchableOpacityView>
//               ))
//             ) : (
//               <AppText>No chain Availbale</AppText>
//             )}
//           </View>
//           <Input
//             title={titleText.code}
//             placeholder={placeHolderText.code}
//             value={otp}
//             onChangeText={text => setOtp(text)}
//             keyboardType="numeric"
//             autoCapitalize="none"
//             returnKeyType="next"
//             onSubmitEditing={() => addressInput?.current?.focus()}
//             isOtp
//             onSendOtp={() => onGetOtp()}
//             otpText={otpText}
//           />
//           <Input
//             title={titleText.wallet}
//             placeholder={placeHolderText.wallet}
//             value={address}
//             onChangeText={text => setAddress(text)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             returnKeyType="next"
//             assignRef={input => {
//               addressInput.current = input;
//             }}
//             onSubmitEditing={() => amountInput?.current?.focus()}
//           />
//           <Input
//             title={titleText.amount}
//             placeholder={placeHolderText.amount}
//             value={amount}
//             onChangeText={text => setAmount(text)}
//             keyboardType="numeric"
//             returnKeyType="done"
//             onSubmitEditing={() => onSubmit()}
//             assignRef={input => {
//               amountInput.current = input;
//             }}
//           />
          
//         </View>
//         <View style={styles.container}>
//           <AppText color={SECOND} weight={SEMI_BOLD} type={FOURTEEN}>
//             Disclaimer:
//           </AppText>
//           <AppText style={styles.disclaimerText} color={SECOND}>
//             •  Minimum Withdrawal should be of {walletDetail?.min_withdrawal}
//           </AppText>
//           <AppText style={styles.disclaimerText} color={SECOND}>
//             • Maximum Withdrawal should be of : {walletDetail?.max_withdrawal}
//           </AppText>
//           <AppText style={styles.disclaimerText} color={SECOND}>
//             • Withdrawal Fee will be: {walletDetail?.withdrawal_fee}
//           </AppText>
//         </View>
//         <Button
//           children="Withdraw"
//           onPress={() => onSubmit()}
//           containerStyle={styles.button}
//         />
//       </KeyBoardAware>
//     </AppSafeAreaView>
//   );
// };
// export default Withdraw;
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white_fifteen,
//     marginTop: universalPaddingTop,
//     padding: universalPaddingHorizontal,
//     borderWidth: borderWidth,
//     borderColor: colors.inputBorder,
//     borderRadius: 10,
//   },
//   button: {marginTop: 50},
//   disclaimerText: {
//     marginVertical: 5,
//   },
// });
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AppBackground from "../../common/AppBackground";
// import Typography, { FULL_WIDTH } from "../../Common/Typography";
import ToolBar from "../../common/ToolBar";
// import { Languages } from "../../Helper/Languages";
import { colors } from "../../theme/colors";
import CommonInput from "../../common/CommonInput";
import SpaceBetweenView from "../../common/SpaceBetween";
import CommonButton from "../../common/CommonButton";
import { AppText, SIXTEEN } from "../../common";
import { Screen } from "../../theme/dimens";

const Withdraw = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("BEP20");

  const handleNetworkSelection = (network) => {
    setSelectedNetwork(network);
  };

  return (
    <AppBackground>
      <ScrollView style={styles.scrollView}>
        <ToolBar isLogo={false} isSecond title={'Withdraw'} />
        <View style={styles.container}>
           <AppText type={SIXTEEN}>Select Network :</AppText>
          <View style={styles.networkSelection}>
            <TouchableOpacity
              onPress={() => handleNetworkSelection("BEP20")}
              style={[
                styles.networkButton,
                selectedNetwork === "BEP20" && styles.selectedNetwork,
              ]}
            >
              {/* <Typography>BEP20</Typography> */}
              <AppText>BEP20</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNetworkSelection("TRC20")}
              style={[
                styles.networkButton,
                selectedNetwork === "TRC20" && styles.selectedNetwork,
                styles.marginLeft,
              ]}
            >
              {/* <Typography>TRC20</Typography> */}
              <AppText>TRC20</AppText>
            </TouchableOpacity>
          </View>

          <CommonInput
            Label="Address"
            placeholderText="Wallet Address"
            labelStyle={{ marginHorizontal: 0 }}
            mainContainer={{ marginTop: 10 }}
          />
          <CommonInput
            Label=""
            isOtp
            otpText="Max"
            placeholderText="Amount"
            labelStyle={{ marginHorizontal: 0 }}
          />

          <CommonInput
            Label=""
            isOtp
            placeholderText="Enter verification Code"
            labelStyle={{ marginHorizontal: 0 }}
          />
        </View>

        <SpaceBetweenView
          firstText={"Withdraw fee :"}
          secondText={"0.00038 BTC"}
        />
        <SpaceBetweenView
          firstText={"Min. withdraw amount"}
          secondText={"0.1 BTC"}
          containerStyle={{ marginTop: 0 }}
        />
        <SpaceBetweenView
          firstText={"You will get :"}
          secondText={"0 BTC"}
          containerStyle={{ marginTop: 0 }}
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
          secondText={"0 BTC"}
          containerStyle={{ marginTop: 0 }}
        />
        <CommonButton title="Withdraw"  containerStyle={{marginTop:25}}/>
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
