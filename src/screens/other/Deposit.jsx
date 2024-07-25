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

  return (
    <AppBackground>
      <ToolBar isLogo={false} isSecond title={"Deposit"} />
      <ScrollView style={{ flex: 1 }}>
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
            placeholderText={walletAddress?.slice(0,7)+'**************'+walletAddress?.slice(35)}
            otpText="Copy"
          />

        </View>
        <View style={{ width: "90%", alignSelf: "center", padding: 5 }}>
          <AppText type={FIFTEEN} color={WHITE} weight={BOLD}>
            Disclaimer
          </AppText>
          <AppText style={{marginTop: 10 }} numberOfLines={16}>
            * Minimum deposit of {walletDetail?.min_deposit} {walletDetail?.short_name}, deposit below that cannot be
              recovered.
          </AppText>
          <AppText style={{marginTop: 10 }} numberOfLines={16}>
            * Please deposit only {walletDetail?.short_name} on this address. If you deposit
              any other coin, it will be lost forever.
          </AppText>
          <AppText style={{marginTop: 10 }} numberOfLines={16}>
            * This is {coinChain} deposit address type. Transferring to an
              unsupported network could result in loss of deposit.
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
