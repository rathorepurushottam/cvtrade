import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Arrow_Icon,
  REMOVE,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import AppBackground from "../../common/AppBackground";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { colors } from "../../theme/colors";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import LinearGradient from "react-native-linear-gradient";
import { AppText, MEDIUM, TEN, FOURTEEN, BOLD, TWENTY_TWO, SIXTEEN, THIRTEEN, CustomMaterialMenu } from "../../common";
import {
  TRADE_HISTORY_DETAILS_SCREEN,
  WALLET_HISTORY_DETAILS_SCREEN,
  WALLET_DETAIL_SCREEN,
} from '../../navigation/routes';
import {
  getUserWallet,
  getWalletHistory,
  verifyWithdraw,
  getTradeHistory,
} from '../../actions/walletActions';
import {ListEmptyComponent} from '../home/MarketCoinList';
import {
  setSelectedTradeHistory,
  setSelectedWalletHistory,
} from '../../slices/walletSlice';
import moment from "moment";
import Icon from '../../common/Icon';
import SimpleModal from "../../common/SimpleModal";
import { toFixedEight, twoFixedTwo } from "../../helper/utility";

const FirstRoute = () => {
  const userWallet = useAppSelector(state => state.wallet.userWallet);
  return (
    <ScrollView style={styles.routeScroll}>
      <View style={styles.firstRouteContain}>
        
        <FlatList
          numColumns={2}
          data={userWallet}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.fundListContain}
              >
                <View style={{flexDirection: "row", justifyContent: "flex-end", paddingRight: 10}}>
                <CustomMaterialMenu
                walletDetail={item}
              />
              </View>
                <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
                Sr No : {index+ 1}
                </AppText>
                <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
                Assets : {item?.short_name}
                </AppText>
                <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
                Available Balance : {item?.balance?.toFixed(8)}
                </AppText>
                
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
const SecondRoute = () => {
  const [secondVisible, setSecondVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const walletHistory = useAppSelector(state => state.wallet.walletHistory);
  useEffect(() => {
    dispatch(getWalletHistory());
  }, []);
  return (
    <ScrollView style={styles.routeScroll}>
      <View style={styles.firstRouteContain}>
        <SimpleModal
          visible={secondVisible}
          close={() => {
            setSecondVisible(false);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSecondVisible(false);
            }}
          >
            <Icon source={REMOVE} size={20} imageStyle={styles.removeImg} />
          </TouchableOpacity>
          {/* <Typography
            size={13}
            color={Colors.black}
            fontFamily={Font.bold}
            textStyle={styles.modalData}
          >
            Sr No : 1
          </Typography> */}
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <AppText color={colors.black} weight={BOLD} style={styles.fundAsset}>
            {moment(currentItem?.createdAt).format('DD MMM, YYYY hh:mm a')}
            </AppText>
          </View>
          <AppText type={FOURTEEN} color={colors.black} weight={BOLD} style={styles.modalData}>
            {currentItem?.short_name}
          </AppText>
          <AppText type={FOURTEEN} color={colors.black} weight={BOLD} style={styles.modalData}>
            {currentItem?.chain}
          </AppText>
          <AppText type={FOURTEEN} color={colors.black} weight={BOLD} style={styles.modalData}>
            {currentItem?.transaction_type}
          </AppText>
          <AppText type={FOURTEEN} color={colors.black} weight={BOLD} style={styles.modalData}>
            {currentItem?.amount}
          </AppText>
          <View style={styles.modalActionContain}>
            <View style={[styles.actiontxt, { width: "35%" }]}>
              <AppText type={FOURTEEN} color={colors.black} weight={BOLD} style={styles.txtModalStyle}>
              Status :
              </AppText>
            </View>
            <View style={[styles.buttonContain, { width: "65%" }]}>
              <TouchableOpacity style={styles.withdrawBtn}>
                <AppText weight={BOLD}>
                {currentItem?.status}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalActionContain}>
            <View style={[styles.actiontxt, { width: "35%" }]}>
              <AppText type={FOURTEEN} color={colors.black} style={styles.txtModalStyle}>
              Cancel Withdrawl :
              </AppText>
            </View>
            <View style={[styles.buttonContain, { width: "65%" }]}>
              <TouchableOpacity style={styles.updateBtn}>
                <AppText color={colors.KycDarkBlue} weight={BOLD}>
                Updated
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </SimpleModal>
        <FlatList
          numColumns={2}
          data={walletHistory}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrentItem(item),
                  setSecondVisible(true)
                }}
                activeOpacity={0.7}
                style={styles.fundListContain}
              >
                <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
                Sr No : {index+1}
                </AppText>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
                  Date & Time : {'\n'}{moment(item?.createdAt).format('DD MMM, YYYY hh:mm a')}
                </AppText>
                  
                  <View>
                  </View>
                </View>
                    <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>Coin : {item?.short_name}</AppText>

              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
// const ThirdRoute = () => {
//   const [thirdVisible, setThirdVisible] = useState(false);

//   return (
//     <ScrollView style={styles.routeScroll}>
//       <View style={styles.firstRouteContain}>
//         {/* <SimpleModal
//           visible={thirdVisible}
//           close={() => {
//             setThirdVisible(false);
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               setThirdVisible(false);
//             }}
//           >
//             <Icon source={REMOVE} size={20} imageStyle={styles.removeImg} />
//           </TouchableOpacity>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Sr No : 1
//           </Typography>
//           <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
//             <Typography
//               color={Colors.black}
//               fontFamily={Font.bold}
//               size={13}
//               textStyle={styles.fundAsset}
//             >
//               Date & Time : 11/06/2024{" "}
//               <Typography
//                 size={13}
//                 color={Colors.black}
//                 fontFamily={Font.medium}
//                 textStyle={styles.modalData}
//               >
//                 (11:55 PM)
//               </Typography>
//             </Typography>
//           </View>

//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Currency Pair : CVT/BTC
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Credited Currency : USDT
//           </Typography>

//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Side : SELL
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Price : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Executed Quantity : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Total : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Fee : 3.000
//           </Typography>
//         </SimpleModal> */}
//         <FlatList
//           numColumns={2}
//           data={[1, 2, 3, 4]}
//           renderItem={({ item, index }) => {
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   setThirdVisible(true);
//                 }}
//                 activeOpacity={0.7}
//                 style={styles.fundListContain}
//               >
//                 {/* <Typography
//                   color={Colors.white}
//                   fontFamily={Font.medium}
//                   textStyle={styles.fundAsset}
//                 >
//                   Sr No : 1
//                 </Typography> */}
//                 <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                 Sr No : 1
//                 </AppText>
//                 <View
//                   style={{ flexDirection: "row", alignItems: "flex-start" }}
//                 >
//                   {/* <Typography
//                     color={Colors.white}
//                     fontFamily={Font.medium}
//                     textStyle={styles.fundAsset}
//                   >
//                     Date & Time :
//                   </Typography> */}
//                   <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                   Date & Time :
//                 </AppText>
//                   <View>
//                     {/* <Typography color={Colors.white} fontFamily={Font.medium}>
//                       {" "}
//                       11/06/2024
//                     </Typography>
//                     <Typography
//                       color={Colors.textColor}
//                       size={10}
//                       textAlign={"right"}
//                       fontFamily={Font.medium}
//                       textStyle={{ lineHeight: 18 }}
//                     >
//                       {" "}
//                       11:55 PM
//                     </Typography> */}
//                     <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                     {" "}
//                       11/06/2024
//                 </AppText>
//                 <AppText type={TEN} color={colors.textColor} weight={MEDIUM} style={{textAlign: 'right'}} numberOfLines={18}>
//                 {" "}
//                       11:55 PM
//                 </AppText>
//                   </View>
//                 </View>
//                 {/* <Typography
//                   color={Colors.white}
//                   fontFamily={Font.medium}
//                   textStyle={styles.fundAsset}
//                 >
//                   Currency Pair : CVT/BTC
//                 </Typography> */}
//                  <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                  Currency Pair : CVT/BTC
//                 </AppText>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };
// const FourthRoute = () => {
//   const [fourthVisible, setFourthVisible] = useState(false);

//   return (
//     <ScrollView style={styles.routeScroll}>
//       <View style={styles.firstRouteContain}>
//         {/* <SimpleModal
//           visible={fourthVisible}
//           close={() => {
//             setFourthVisible(false);
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               setFourthVisible(false);
//             }}
//           >
//             <Icon source={REMOVE} size={20} imageStyle={styles.removeImg} />
//           </TouchableOpacity>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Sr No : 1
//           </Typography>
//           <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
//             <Typography
//               color={Colors.black}
//               fontFamily={Font.bold}
//               size={13}
//               textStyle={styles.fundAsset}
//             >
//               Date & Time : 11/06/2024{" "}
//               <Typography
//                 size={13}
//                 color={Colors.black}
//                 fontFamily={Font.medium}
//                 textStyle={styles.modalData}
//               >
//                 (11:55 PM)
//               </Typography>
//             </Typography>
//           </View>

//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Currency Pair : CVT/BTC
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Credited Currency : USDT
//           </Typography>

//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Side : SELL
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Price : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Executed Quantity : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Total : 3.000
//           </Typography>
//           <Typography
//             size={13}
//             color={Colors.black}
//             fontFamily={Font.bold}
//             textStyle={styles.modalData}
//           >
//             Status : PENDING
//           </Typography>
//         </SimpleModal> */}
//         <FlatList
//           numColumns={2}
//           data={[1, 2, 3, 4]}
//           renderItem={({ item, index }) => {
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   setFourthVisible(true);
//                 }}
//                 activeOpacity={0.7}
//                 style={styles.fundListContain}
//               >
//                 {/* <Typography
//                   color={Colors.white}
//                   fontFamily={Font.medium}
//                   textStyle={styles.fundAsset}
//                 >
//                   Sr No : 1
//                 </Typography> */}
//                 <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                 Sr No : 1
//                 </AppText>
//                 <View
//                   style={{ flexDirection: "row", alignItems: "flex-start" }}
//                 >
//                   {/* <Typography
//                     color={Colors.white}
//                     fontFamily={Font.medium}
//                     textStyle={styles.fundAsset}
//                   >
//                     Date & Time :
//                   </Typography> */}
//                   <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                   Date & Time :
//                 </AppText>
//                   <View>
//                     {/* <Typography color={Colors.white} fontFamily={Font.medium}>
//                       {" "}
//                       11/06/2024
//                     </Typography>
//                     <Typography
//                       color={Colors.textColor}
//                       size={10}
//                       textAlign={"right"}
//                       fontFamily={Font.medium}
//                       textStyle={{ lineHeight: 18 }}
//                     >
//                       {" "}
//                       11:55 PM
//                     </Typography> */}
//                     <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                     {" "}
//                       11/06/2024
//                 </AppText>
//                 <AppText type={TEN} color={colors.textColor} weight={MEDIUM} style={{textAlign: 'right'}} numberOfLines={18}>
//                 {" "}
//                       11:55 PM
//                 </AppText>
//                   </View>
//                 </View>
//                 {/* <Typography
//                   color={Colors.white}
//                   fontFamily={Font.medium}
//                   textStyle={styles.fundAsset}
//                 >
//                   Currency Pair : CVT/BTC
//                 </Typography> */}
//                 <AppText color={colors.white} weight={MEDIUM} style={styles.fundAsset}>
//                  Currency Pair : CVT/BTC
//                 </AppText>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  // third: ThirdRoute,
  // fourth: FourthRoute,
});
const Wallet = () => {
  const navigation = useNavigation();
  const [isVissible, setIsVissible] = useState(false);
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const walletBalance = useAppSelector(state => state.wallet.walletBalance);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      setIndex(0);
      dispatch(getUserWallet());
    }
  }, [isFocus]);

  useEffect(() => {
    dispatch(getUserWallet());
    // setIndex(0);
  }, [isFocus]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Funds" },
    { key: "second", title: "Wallet History" },
    // { key: "third", title: "Trade History" },
    // { key: "fourth", title: "All Open Orders" },
  ]);
  
  const [active, setActive] = useState("Funds");
  return (
    <AppBackground>
      <ToolBar isLogo={false} isSecond title="Wallet" />
      <AppText type={SIXTEEN} style={{ marginLeft: 18, marginTop: 15 }}>Total Portfolio Value</AppText>
      <View style={styles?.Currency_Container}>
        <AppText type={TWENTY_TWO} weight={BOLD}>{`${walletBalance?.Currency} ${toFixedEight(
              walletBalance?.currencyPrice,
            )}`}</AppText>
        <AppText type={FOURTEEN} color={colors.textColor} weight={BOLD}>{`$${toFixedEight(walletBalance?.dollarPrice)}`}</AppText>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <RenderTabBar
            {...props}
            onTabChange={(tabIndex) => {
              setActive(tabIndex);
            }}
          />
        )}
      />
    </AppBackground>
  );
};
const RenderTabBar = (props) => {
  const { onTabChange } = props;
  return (
    <>
      <TabBar
        {...props}
        onTabPress={(e) => {
          onTabChange(e.route.key);
        }}
        scrollEnabled={false}
        tabStyle={[{ flex: 1 }, props.tabStyle]}
        renderLabel={({ route, focused }) => (
          <View style={styles.customTabView}>
            <AppText type={THIRTEEN} style={{textAlign: "center"}} color={focused ? colors.white : colors.inputBorderColor} weight={MEDIUM}>{route?.title}</AppText>
          </View>
        )}
        indicatorStyle={{ backgroundColor: colors.inputBorderColor }}
        pressColor="transparent"
        style={[
          { width: "100%", backgroundColor: "transparent", elevation: 0 },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  updateBtn: {
    width: "45%",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.7,
    borderColor: colors.inputBorderColor,
  },
  emptyView: {
    height: 110,
    backgroundColor: "transparent",
  },
  customTabView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  fundAsset: {
    marginLeft: 10,
    lineHeight: 18,
  },
  fundListContain: {
    width: "45%",
    margin: 10,
    paddingVertical: 10,
    alignSelf: "center",
    backgroundColor: colors.inputBgColor,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: colors.inputBorderColor,
    marginVertical: 10,
  },
  withdrawBtn: {
    width: "45%",
    paddingVertical: 8,
    backgroundColor: colors.red,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  depositeBtn: {
    width: "45%",
    height: 45,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContain: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  txtModalStyle: {
    marginLeft: 10,
    lineHeight: 18,
    marginTop: 5,
  },
  actiontxt: {
    width: "25%",
  },
  modalActionContain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  modalData: {
    marginLeft: 10,
    lineHeight: 18,
    marginTop: 5,
  },
  removeImg: {
    alignSelf: "flex-end",
    bottom: 10,
    left: 5,
  },
  routeScroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  firstRouteContain: {
    width: "100%",
    padding: 5,
    alignSelf: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerCell: {
    width: 120,
    textAlign: "center",
    padding: 10,
    color: colors.inputBorderColor,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "column",
  },
  tableHeader: {
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  Main_Container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 25,
  },
  Back_Icon: {
    width: 20,
    height: 15,
    marginLeft: 10,
    tintColor: "#FFF",
  },
  Currency_Container: {
    marginLeft: 18,
  },
  Arrow_Icon: {
    width: 15,
    height: 15,
    transform: [{ rotate: "-135deg" }],
  },
  Deposit_Withdraw_Container: {
    paddingVertical: 10,
    borderRadius: 29,
    borderWidth: 1,
    backgroundColor: colors.linearGreen,
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
    marginTop: 10,
  },
  RecentTransactions_Container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    marginHorizontal: -20,
    backgroundColor: "#111111",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  RecentText_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Process_Container: {
    paddingVertical: 5,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#38B781",
    marginTop: 3,
  },
  CoinInfo_Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  Map_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  Line: {
    backgroundColor: "#FFFFFF99",
    borderWidth: 1,
    marginTop: 12,
  },
  CoinDataMain_Container: {
    height: 120,
    borderRadius: 12,
    backgroundColor: "#FFFFFF15",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 15,
    width: "48%",
  },
  CoinIcon: {
    width: 34,
    height: 34,
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
});

export default Wallet;

