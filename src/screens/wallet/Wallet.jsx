import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import {
  Arrow_Icon,
  BG_Two,
  Back_Icon,
  Binance_Icon,
  Bitcoin_Icon,
  Tether_Icon,
  CVToken_Icon,
  Ethereum_Icon,
  Solana_Icon,
  USDCoin_Icon,
  XRP_Icon,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import {
  AppText,
  BOLD,
  EIGHTEEN,
  ELEVEN,
  FOURTEEN,
  SEMI_BOLD,
  SIXTEEN,
  THIRTY_FOUR,
  TWELVE,
  TWENTY,
  TEXTCOLOR,
  HISTORYTEXT
} from "../../common/AppText";
// import {borderWidth} from '../../theme/Dimension';
import {
  BITCOIN_SCREEN,
  DEPOSIT_SCREEN,
  WALLET_DETAIL_SCREEN,
  WALLET_HISTORY_DETAILS_SCREEN,
  WITHDRAW_SCREEN,
} from "../../navigation/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BASE_URL } from "../../helper/Constants";
import WalletModal from "../../common/WalletModal";
import { getCoinDetails, getWalletHistory } from "../../actions/walletActions";
import NavigationService from "../../navigation/NavigationService";
import { dateFormatter, twoFixedTwo } from "../../helper/utility";
import { colors } from "../../theme/colors";
import FastImage from "react-native-fast-image";
import { setSelectedWalletHistory } from "../../slices/walletSlice";

const Wallet = () => {
  const dispatch = useAppDispatch();
  const walletBalance = useAppSelector((state) => {
    return state.wallet.walletBalance;
  });
  const userWallet = useAppSelector((state) => {
    return state.wallet.userWallet;
  });
  const walletHistory = useAppSelector((state) => {
    return state.wallet.walletHistory;
  });
  const [isVissible, setIsVissible] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getWalletHistory();
  }, []);

  const handleWalletHistoryDetail = (item) => {
    dispatch(setSelectedWalletHistory(item));
    NavigationService?.navigate(WALLET_HISTORY_DETAILS_SCREEN);
  }

  return (
    <AppSafeAreaView >
      <ToolBar isLogo={false} isSecond title="Wallet" />
      <ScrollView style={styles?.Main_Container}>
        <AppText type={EIGHTEEN}>Your Overall Balance</AppText>
        <View style={styles?.Currency_Container}>
          <AppText type={THIRTY_FOUR} style={{ fontWeight: "700" }}>
            $ {walletBalance?.dollarPrice?.toFixed(2)}
            {/* <AppText type={THIRTY_FOUR} style={{color: '#FFFFFF99'}}>
              08
            </AppText> */}
          </AppText>
          <TouchableOpacity
            onPress={() => {
              setIsVissible(!isVissible);
            }}
          >
            <Image
              source={Back_Icon}
              resizeMode="contain"
              style={[
                styles?.Back_Icon,
                { transform: [{ rotate: isVissible ? "90deg" : "-90deg" }] },
              ]}
            />
          </TouchableOpacity>
        </View>
        {isVissible ? (
          <View style={styles?.CoinData_Container}>
            {userWallet?.slice(6, 10)?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles?.CoinDataMain_Container}
                  // onPress={() => setShowModal(true)}
                >
                  <View style={styles?.CoinDataHeader_Container}>
                    {/* <View style={styles?.CoinDataHeaderPart_Container}> */}
                    <Image
                      source={{ uri: `${BASE_URL}${item?.image_path}` }}
                      resizeMode="contain"
                      style={styles?.CoinIcon}
                    />
                    <View style={{ alignItems: "center", paddingRight: 10 }}>
                      <View
                        style={[
                          {
                            backgroundColor:
                              item?.change < 0 ? colors.red : colors.green,
                          },
                          {
                            paddingHorizontal: 5,
                            // paddingVertical: 2,
                            paddingTop: 1.5,
                            borderRadius: 10,
                            justifyContent: "center"
                          },
                        ]}
                      >
                        <AppText type={FOURTEEN} color={HISTORYTEXT}>
                          {twoFixedTwo(item?.change)}%
                        </AppText>
                      </View>

                      <AppText
                       type={FOURTEEN}
                       weight={SEMI_BOLD}
                      color={TEXTCOLOR}
                      >
                        {"   "}${twoFixedTwo(item?.price)}
                      </AppText>
                    </View>

                    {/* </View> */}
                  </View>
                  <AppText
                    type={TWENTY}
                    weight={BOLD}
                    style={{ color: "#A7E69E", marginTop: 10 }}
                  >
                    {item?.balance?.toFixed(6)}
                  </AppText>
                  <AppText
                    type={FOURTEEN}
                    weight={SEMI_BOLD}
                    style={{ color: "#FFFFFF99" }}
                  >
                    {item?.currency}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
        <View style={styles?.Common_Container}>
          <TouchableOpacity
           style={[styles?.Deposit_Withdraw_Container, {backgroundColor: '#38B781'}]}
            onPress={() =>
              NavigationService?.navigate("CurrencyList", { type: "Deposit" })
            }
          >
            <Image
              source={Arrow_Icon}
              resizeMode="contain"
              style={styles?.Arrow_Icon}
            />
            <AppText type={FOURTEEN} weight={SEMI_BOLD}>
              {" "}
              Deposit
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles?.Deposit_Withdraw_Container, {backgroundColor: colors.red}]}
            onPress={() =>
              NavigationService?.navigate("CurrencyList", { type: "Withdraw" })
            }
          >
            <Image
              source={Arrow_Icon}
              resizeMode="contain"
              style={[styles?.Arrow_Icon, { transform: [{ rotate: "35deg" }] }]}
            />
            <AppText type={FOURTEEN} weight={SEMI_BOLD}>
              {" "}
              Withdraw
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles?.RecentTransactions_Container}>
          <View style={styles?.RecentText_Container}>
            <AppText type={EIGHTEEN} style={{ fontWeight: "700" }}>
              Recent Transactions
            </AppText>
            <TouchableOpacity>
              <AppText
                type={FOURTEEN}
                weight={BOLD}
                style={{ color: "#AAE9A1" }}
                onPress={() => NavigationService.navigate(WALLET_DETAIL_SCREEN)}
              >
                View All
              </AppText>
            </TouchableOpacity>
          </View>
          {walletHistory?.slice(0, 10)?.map((item, index) => {
            let bgColor;
            switch (item.status) {
              case "CANCELLED":
                bgColor = "#FDB64A";
                break;
              case "PENDING":
                bgColor = "#FDB64A";
                break;
              case "REJECTED":
                bgColor = "#CF5757";
                break;
              default:
                bgColor = "#38B781";
                break;
            }
            let url = `${BASE_URL}${item?.icon_path}`;
            return (
              <View key={index}>
                <TouchableOpacity style={styles?.Map_Container} onPress={() => handleWalletHistoryDetail(item)}>
                  <View style={styles?.CoinInfo_Container}>
                    <FastImage
                      source={{ uri: url }}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <View>
                      <AppText type={SIXTEEN} weight={BOLD}>
                        {"   "}
                        {item?.short_name}
                      </AppText>
                      <AppText
                        type={TWELVE}
                        weight={SEMI_BOLD}
                        style={{ color: "#FFFFFF99" }}
                      >
                        {"   "} {dateFormatter(item?.createdAt)}
                      </AppText>
                    </View>
                  </View>
                  <AppText type={TWELVE} weight={SEMI_BOLD} color={TEXTCOLOR}>
                    {"   "}
                    {item?.transaction_type}
                  </AppText>
                  <View>
                    <AppText type={EIGHTEEN} weight={BOLD}>
                      {item?.amount}
                    </AppText>
                    <View
                      style={[
                        styles?.Process_Container,
                        { backgroundColor: bgColor },
                      ]}
                    >
                      <AppText type={ELEVEN} weight={SEMI_BOLD}>
                        {item?.status}
                      </AppText>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles?.Line} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <WalletModal showModal={showModal} setShowModal={setShowModal} />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 25,
  },
  Back_Icon: {
    width: 20,
    height: 15,
    marginLeft: 10,
    tintColor: "#FFFFFF99",
  },
  Currency_Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  Arrow_Icon: {
    width: 15,
    height: 15,
    transform: [{ rotate: "-135deg" }],
  },
  Deposit_Withdraw_Container: {
    // width: 180,
    height: 48,
    borderRadius: 29,
    borderWidth: 1,
    // backgroundColor: "#2330237A",
    borderColor: "#FFFFFF7A",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "48%",
  },
  Common_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  RecentTransactions_Container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // backgroundColor: "#0C0C0C",
    marginTop: 20,
    marginHorizontal: -20,
  },
  image: {
    width: 38,
    height: 38,
  },
  RecentText_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  Process_Container: {
    width: 75,
    height: 25,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#38B781",
    alignSelf: "flex-end",
  },
  CoinInfo_Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  Map_Container: {
    // marginTop: ,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF10",
    // marginVertical: 5,
    borderRadius: 10,
  },
  Line: {
    // backgroundColor: "#FFFFFF99",
    // borderWidth: 1,
    marginTop: 12,
  },
  CoinDataMain_Container: {
    // width: 180,
    height: 140,
    borderRadius: 12,
    backgroundColor: "#FFFFFF10",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 15,
    width: "48%",
  },
  CoinIcon: {
    width: 34,
    height: 34,
    // borderRadius: 10
  },
  ThreeDots: {
    width: 18,
    height: 15,
  },
  CoinDataHeader_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  CoinDataHeaderPart_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  CoinData_Container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Wallet;
