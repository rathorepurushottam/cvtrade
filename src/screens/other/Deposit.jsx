// import React, {useState,useEffect} from 'react';
// import {

//   AppText,
//   BLACK,
//   BOLD,
//   FOURTEEN,
//   SECOND,
//   SEMI_BOLD,
//   TWELVE,
//   YELLOW,
// } from '../../common';
// import AppSafeAreaView from '../../common/AppSafeAreaView';
// import ToolBar from '../../common/ToolBar';
// import {useAppDispatch, useAppSelector} from '../../store/hooks';
// import {useRoute} from '@react-navigation/native';
// import {generateAddress} from '../../actions/walletActions';
// import {StyleSheet, View} from 'react-native';
// import KeyBoardAware from '../../common/KeyboardAware';
// import {colors} from '../../theme/colors';
// import {
//   borderWidth,
//   inputHeight,
//   universalPaddingHorizontal,
//   universalPaddingTop,
// } from '../../theme/dimens';
// import {SpinnerSecond} from '../../common/SpinnerSecond';
// import {commonStyles} from '../../theme/commonStyles';
// import QRCode from 'react-native-qrcode-svg';
// import TouchableOpacityView from '../../common/TouchableOpacityView';
// import FastImage from 'react-native-fast-image';
// import {Copy_Icon} from '../../helper/ImageAssets';
// import {copyText} from '../../helper/utility';

// const Deposit = () => {
//   const dispatch = useAppDispatch();
//   const route = useRoute();
//   const walletDetail = route?.params?.walletDetail;
//   const {chain} = walletDetail ?? '';
//   const walletAddress = useAppSelector(state => state.wallet.walletAddress);
//   const isLoading = useAppSelector(state => state.auth.isLoading);
//   const [coinChain, setCoinChain] = useState(chain[0]);

//   useEffect(() => {
//     let data = {
//       currency_id: walletDetail?._id,
//       chain: coinChain,
//     };
//     dispatch(generateAddress(data));
//   }, [coinChain]);


//   console.log(walletDetail, "walletdetails");

//   return (
//     <AppSafeAreaView>
//       <ToolBar />
//       {!isLoading && walletAddress && (
//         <KeyBoardAware>
//           <View style={styles.container}>
//             <AppText style={commonStyles.centerText} color={SECOND}>
//               Scan this QR code from mobile
//             </AppText>
//             <View
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
//             <View style={styles.qrCodeContainer}>
//               {walletAddress && (
//                 <QRCode
//                   value={walletAddress}
//                   size={220}
//                   logoBackgroundColor="white"
//                 />
//               )}
//             </View>
//             <View style={styles.addressContainer}>
//               <AppText
//                 ellipsizeMode="middle"
//                 numberOfLines={1}
//                 style={styles.address}>
//                 {walletAddress}
//               </AppText>
//               <View style={styles.divider} />
//               <TouchableOpacityView
//                 onPress={() => copyText(walletAddress)}
//                 style={styles.copyIconContainer}>
//                 <FastImage
//                   source={copyIcon}
//                   resizeMode="contain"
//                   style={styles.copyIcon}
//                 />
//               </TouchableOpacityView>
//             </View>
//             <AppText style={styles.copyText} color={SECOND}>
//               Click above to copy the code
//             </AppText>
//           </View>
//           <View style={styles.container}>
//             <AppText color={SECOND} weight={SEMI_BOLD} type={FOURTEEN}>
//               Disclaimer:
//             </AppText>
//             <AppText style={styles.disclaimerText} color={SECOND}>
//               • Minimum deposit of {walletDetail?.min_deposit} {walletDetail?.short_name}, deposit below that cannot be
//               recovered.
//             </AppText>
//             <AppText style={styles.disclaimerText} color={SECOND}>
//               • Please deposit only {walletDetail?.short_name} on this address. If you deposit
//               any other coin, it will be lost forever.
//             </AppText>
//             <AppText style={styles.disclaimerText} color={SECOND}>
//               • This is {coinChain} deposit address type. Transferring to an
//               unsupported network could result in loss of deposit.
//             </AppText>
//           </View>
//         </KeyBoardAware>
//       )}
//       <SpinnerSecond />
//     </AppSafeAreaView>
//   );
// };
// export default Deposit;
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white_fifteen,
//     marginTop: universalPaddingTop,
//     padding: universalPaddingHorizontal,
//     borderWidth: borderWidth,
//     borderColor: colors.inputBorder,
//     borderRadius: 10,
//   },
//   qrCodeContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   addressContainer: {
//     marginTop: 10,
//     height: inputHeight,
//     borderWidth: borderWidth,
//     borderColor: colors.inputBorder,
//     borderRadius: 25,
//     paddingHorizontal: universalPaddingHorizontal,
//     backgroundColor: colors.inputBackground,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   divider: {
//     width: 1,
//     height: inputHeight - 10,
//     backgroundColor: colors.secondaryText,
//     marginHorizontal: 5,
//   },
//   copyIcon: {
//     height: 20,
//     width: 20,
//   },
//   address: {
//     flex: 1,
//   },
//   copyIconContainer: {
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   copyText: {
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   disclaimerText: {
//     marginVertical: 5,
//   },
// });
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import AppBackground from "../../common/AppBackground";
import ToolBar from "../../common/ToolBar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { colors } from "../../theme/colors";
import Icon from "../../common/Icon";
import { qr_Code } from "../../helper/ImageAssets";
import { AppText, BOLD, FIFTEEN, Input, WHITE } from "../../common";
import { Screen } from "../../theme/dimens";
import CommonInput from "../../common/CommonInput";
import {useRoute} from '@react-navigation/native';
import {generateAddress} from '../../actions/walletActions';

const Deposit = ({ navigation }) => {
    const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const {chain} = walletDetail ?? '';
  const walletAddress = useAppSelector(state => state.wallet.walletAddress);
  const [coinChain, setCoinChain] = useState(chain[0]);

  useEffect(() => {
    let data = {
      currency_id: walletDetail?._id,
      chain: coinChain,
    };
    dispatch(generateAddress(data));
  }, [coinChain]);

  console.log(walletDetail, "wallet");

  return (
    <AppBackground>
      <ToolBar isLogo={false} isSecond title={"Deposit"} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.networkSelection}>
          {chain?.length > 0 ? (
              chain?.map(item => (
                <TouchableOpacity
            onPress={() => setCoinChain("BEP20")}
            style={[
              styles.networkButton,
              coinChain === "BEP20" && styles.selectedNetwork,
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
        <Icon
          source={qr_Code}
          size={130}
          imageStyle={{ alignSelf: "center", marginVertical: 10 }}
          tintColor={colors.white}
        />
        <View
          style={{
            width: Screen.Width - 30,
            padding: 10,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <CommonInput
            isOtp
            Label=""
            labelStyle={{ marginHorizontal: 0 }}
            placeholderText={walletAddress}
            otpText="Copy"
          />

        </View>
        <View style={{ width: "90%", alignSelf: "center", padding: 5 }}>
          <AppText type={FIFTEEN} color={WHITE} weight={BOLD}>
            Disclaimer
          </AppText>
          <AppText style={{ lineHeight: 16, marginTop: 5 }}>
            * Minimum deosit of 0.001,deposit below that cannot be recovered.
          </AppText>
          <AppText style={{ lineHeight: 16, marginTop: 5 }}>
            * Minimum deosit of 0.001,deposit below that cannot be recovered.
          </AppText>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  networkSelection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    // flex: 1
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
    marginEnd: 5,
  },
  selectedNetwork: {
    backgroundColor: colors.purple,
  },
});
