import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import AppBackground from "../../common/AppBackground";
import { colors } from "../../theme/colors";
import {
  Back_Icon,
  Ethereum_Icon,
  Refresh_Icon,
  Tether_Icon,
  BG_Two,
  Success_Icon,
} from "../../helper/ImageAssets";
import { MarketOptionContainer } from "../../common/OptionContainer";
import WebView from "react-native-webview";
import {
  FIFTEEN,
  GREEN,
  HISTORYTEXT,
  Input,
  ORDERTEXT,
  RED,
  WHITE,
} from "../../common";
import RBSheet from "react-native-raw-bottom-sheet";
import Select from "../../common/Select";
// import { Languages } from "../../Helper/Languages";
// import CommonInput from "../../Common/CommonInput";
import CommonButton from "../../common/CommonButton";
// import { useSelector } from "react-redux";
import {
  borderWidth,
  Screen,
  smallButtonHeight,
  universalPaddingHorizontal,
} from "../../theme/dimens";
import {
  AppText,
  SIXTEEN,
  MEDIUM,
  TWELVE,
  SEMI_BOLD,
  THIRTEEN,
  FOURTEEN,
  BOLD,
  TWENTY,
} from "../../common";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  checkToFixedThree,
  toFixedEight,
  toFixedFive,
  toFixedFour,
  toFixedThree,
  twoFixedTwo,
} from "../../helper/utility";
import { KYC_STATUS_SCREEN, ORDER_HISTORY } from "../../navigation/routes";
import {
  getFeeDetails,
  getPastOrders,
  placeOrder,
} from "../../actions/homeActions";
import { connect } from "socket.io-client";
import { BASE_URL, placeHolderText, titleText } from "../../helper/Constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  setBuyOrders,
  setOpenOrders,
  setRandom,
  setSellOrders,
  setSocket,
} from "../../slices/homeSlice";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import { percentageData } from "../../helper/dummydata";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import PairModal from "../../common/PairModal";
import { SubregionList } from "react-native-country-picker-modal";
const socket = connect(BASE_URL, {
  transports: ["websocket"],
  forceNew: true,
  autoConnect: true,
  upgrade: false,
  rejectUnauthorized: false,
  reconnectionAttempts: 5,
});
export const Data = [
  {
    label: "0.1",
    value: "0.1",
  },
  {
    label: "0.01",
    value: "0.01",
  },
  {
    label: "0.001",
    value: "0.001",
  },
  {
    label: "0.0001",
    value: "0.0001",
  },
];
export const DataLimit = [
  {
    id: "0.1",
    name: "Limit",
  },
  {
    id: "0.1",
    name: "Market",
  },
];
export const ColorData = [
  {
    id: 1,
    multyColor: true,
    red: false,
    green: false,
  },
  {
    id: 2,
    multyColor: false,
    red: true,
    green: false,
  },
  {
    id: 3,
    multyColor: false,
    red: false,
    green: true,
  },
];

const BtcCoinDetails = ({ coinDetails }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const coinData = useAppSelector((state) => state.home.coinData);
  const feeDetail = useAppSelector((state) => state.home.feeDetails);

  const coinDetail = coinDetails ? coinDetails : coinData[0];
  const favoriteArray = useAppSelector((state) => state.home.favorites);
  const userData = useAppSelector((state) => state.auth.userData);
  const buyOrders = useAppSelector((state) => state.home.buyOrders);
  const sellOrders = useAppSelector((state) => state.home.sellOrders);
  const random = useAppSelector((state) => state.home.random);
  const userWallet = useAppSelector((state) => state.wallet.userWallet);
  const { id, kycVerified } = userData ?? "";
  const amountInput = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("1");
  const [activePercentage, setActivePercentage] = useState("");
  // const [isConfirm, setIsConfirm] = useState(false);
  const [total, setTotal] = useState("");
  const [balance, setBalance] = useState(0);
  const [_balance, _setBalance] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showPair, setShowPair] = useState(false);
  const [showTradeModal,setShowTradeModal] = useState(false);
  // const [colorId, setColorId] = useState('1');
  // const [numberSelect, setNumberSelect] = useState('0.0001');
  // const [numberSelectLimit, setNumberLimit] = useState('Limit');
  // const lastSixObjects = sellOrders && sellOrders?.slice(-6);
  // const lastTenObjects = sellOrders && sellOrders?.slice(-12);
  // const startingSixObjects = buyOrders && buyOrders?.slice(0, 6);
  // const startingTenObjects = buyOrders && buyOrders?.slice(0, 12);
  const [focusPrice, setFocusPrice] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [option, setOption] = useState("Buy");
  const refRBSheet = useRef();
  const refRBSheetOrder = useRef();
  const [selectedOption, setSelectedOption] = useState("Limit");

  const {
    base_currency,
    base_currency_id,
    quote_currency,
    quote_currency_id,
    change,
    _id,
    buy_price,
  } = coinDetail;

  useEffect(() => {
    setPrice(toFixedEight(buy_price));
  }, [buy_price, selectedOption]);

  useEffect(() => {
    setTotal(multiply(buy_price, 1)?.toString());
  }, [buy_price]);
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to detail socket server");
      dispatch(setSocket(socket));
      dispatch(setRandom(Math.random()));
    });

    return () => {
      socket?.off("connect");
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let data = {
        message: "exchange",
        userId: id,
        base_currency_id: base_currency_id,
        quote_currency_id: quote_currency_id,
      };
      if (id && base_currency_id && quote_currency_id) {
        socket?.emit("message", data);
        console.log("event name exchange emitted");
        setBalance(0);
        dispatch(setOpenOrders([]));
        dispatch(setBuyOrders([]));
        dispatch(setSellOrders([]));
      }
    }, [base_currency_id, quote_currency_id, id, random])
  );
  useEffect(() => {
    socket?.on("message", (res) => {
      // console.log(res?.open_orders,'====res');
      setBalance(res?.balance?.quote_currency_balance);
      _setBalance(res?.balance?.base_currency_balance);
      dispatch(setOpenOrders(res?.open_orders ? res?.open_orders : []));
      dispatch(setBuyOrders(res?.buy_order ? res?.buy_order?.reverse() : []));
      dispatch(setSellOrders(res?.sell_order ? res?.sell_order?.reverse() : []));
      setLoading(false);
    });
    return () => {
      socket?.off("message");
    };
  }, []);
  useEffect(() => {
    let interval = setInterval(() => {
      if (id && base_currency_id && quote_currency_id) {
        let data = {
          message: "exchange",
          userId: id,
          base_currency_id: base_currency_id,
          quote_currency_id: quote_currency_id,
        };
        socket?.emit("message", data);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [base_currency_id, quote_currency_id, id, random]);

  useEffect(() => {
    if (option === "Buy" && _balance) {
      setBalance(_balance?.quote_currency_balance);
    } else {
      setBalance(_balance?.base_currency_balance);
    }
  }, [option, _balance]);

  useEffect(() => {
    if (base_currency) {
      let data = { currency_id: base_currency_id };
      dispatch(getFeeDetails(data));
    }
  }, [base_currency_id]);

  // const onAdd = () => {
  //   let data = {
  //     pair_id: _id,
  //   };
  //   dispatch(addToFavorites(data));
  //   setIsFavorite(!isFavorite);
  // };
  const onNavigate = () => {
    let pastData = {
      base_currency_id: base_currency_id,
      quote_currency_id: quote_currency_id,
    };
    let currencyName = {
      firstCoin: base_currency,
      secondCoin: quote_currency,
    };
    navigation.navigate(ORDER_HISTORY, { data: pastData, currencyName });
    dispatch(getPastOrders(pastData));
  };

  const onSubmit = () => {
    if (kycVerified !== 2) {
      navigation.navigate(KYC_STATUS_SCREEN);
      setShowTradeModal(false);
      return;
    }

    let data = {
      base_currency_id: base_currency_id,
      order_type: selectedOption === "Limit" ? "LIMIT" : "MARKET",
      price: price,
      quantity: amount,
      quote_currency_id: quote_currency_id,
      side: option === "Buy" ? "BUY" : "SELL",
    };
    dispatch(placeOrder(data, refRBSheetOrder));
    setShowTradeModal(false);
    setTimeout(() => {
      let _data = {
        message: "exchange",
        userId: id,
        base_currency_id: base_currency_id,
        quote_currency_id: quote_currency_id,
      };

      if (id && base_currency_id && quote_currency_id) {
        socket?.emit("exchange", _data);
        console.log("event name exchange emitted");
      }
    }, 2000);
  };

  const multiply = (numOne, numTwo) => {
    let temp = Number(numOne) * Number(numTwo);
    return toFixedEight(temp);
  };

  const percentCalculation = (balance, percentage) => {
    return (parseFloat(balance) * parseFloat(percentage)) / 100;
  };
  const handleTotalPercentage = (value) => {
    setActivePercentage(value);
    if (option == "Buy") {
      handleTotal(percentCalculation(balance, value));
    } else {
      handleQty(percentCalculation(balance, value));
    }
  };
  const handleAmount = (text) => {
    setPrice(text?.toString());
    setTotal(multiply(text, amount));
  };

  const handleQty = (text) => {
    setAmount(text?.toString());
    setTotal(multiply(text, price));
  };
  const handleTotal = (text) => {
    const qty = Number(text) / Number(price);
    setAmount(qty?.toString());
    setTotal(multiply(price, qty));
  };
  // const onConfirm = () => {
  //   let data = {
  //     base_currency_id: base_currency_id,
  //     order_type: selectedOption === 'Limit' ? 'LIMIT' : 'MARKET',
  //     price: price,
  //     quantity: amount,
  //     quote_currency_id: quote_currency_id,
  //     side: isBuy ? 'BUY' : 'SELL',
  //     total: total,
  //   };
  //   dispatch(placeOrder(data, setVisible));
  //   setTimeout(() => {
  //     let _data = {
  //       message: 'exchange',
  //       userId: id,
  //       base_currency_id: base_currency_id,
  //       quote_currency_id: quote_currency_id,
  //     };

  //     if (id && base_currency_id && quote_currency_id) {
  //       socket?.emit('exchange', _data);
  //       console.log('event name exchange emitted');
  //     }
  //   }, 10000);
  // };

  const handleCloseRBSheet = () => {
    refRBSheet?.current?.close();
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    handleCloseRBSheet();
  };

  handleOpenTradeModal = (type) =>{
    setOption(type);
    setShowTradeModal(true);
  }
  return (
    <AppBackground source={BG_Two}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles?.HeaderCommon_Container}>
          <TouchableOpacity
            style={styles?.Coin_Container}
            onPress={() => setShowPair(true)}
          >
            <Image
              source={{ uri: `${BASE_URL}${coinDetail?.icon_path}` }}
              resizeMode="contain"
              style={styles?.icon}
            />
            {/* <Image
              source={{ uri: `${BASE_URL}${coinDetail?.icon_path}` }}
              resizeMode="contain"
              style={[styles?.icon, { marginLeft: -8 }]}
            /> */}
            <AppText
              type={SIXTEEN}
              weight={MEDIUM}
              style={{ marginHorizontal: 10 }}
            >{`${base_currency}/${quote_currency}`}</AppText>
            <Image
              source={Back_Icon}
              resizeMode="contain"
              style={styles?.Back_Icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.Refresh_Container}
            onPress={() => onNavigate()}
          >
            <Image
              source={Refresh_Icon}
              resizeMode="contain"
              style={styles?.Refresh_Icon}
            />
          </TouchableOpacity>
        </View>
        <AppText
          type={SIXTEEN}
          weight={BOLD}
          style={[styles?.Text_Container, { paddingHorizontal: 20 }]}
        >
          {quote_currency} {buy_price}
          <AppText
            type={TWELVE}
            weight={SEMI_BOLD}
            color={coinDetail?.change < 0 ? RED : GREEN}
          >
            {" "}
            {`(${coinDetail?.change}%)`}
          </AppText>
        </AppText>
        <View style={{ paddingHorizontal: 15, marginTop: 5 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText weight={SEMI_BOLD} color={HISTORYTEXT}>
              24H High
            </AppText>
            <AppText weight={SEMI_BOLD} color={HISTORYTEXT}>
              24H Low
            </AppText>
            <AppText weight={SEMI_BOLD} color={HISTORYTEXT}>
              24H Volumn {base_currency}
            </AppText>
            <AppText weight={SEMI_BOLD} color={HISTORYTEXT}>
              24H Change
            </AppText>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText weight={SEMI_BOLD} color={GREEN}>
              {twoFixedTwo(coinDetail?.high)}
            </AppText>
            <AppText weight={SEMI_BOLD} color={RED} style={{ paddingRight: 0 }}>
              {twoFixedTwo(coinDetail?.low)}
            </AppText>
            <AppText weight={SEMI_BOLD} style={{ paddingRight: 0 }}>
              {twoFixedTwo(coinDetail?.volume)}
            </AppText>
            <AppText weight={SEMI_BOLD} style={{ paddingRight: 50 }}>
              {twoFixedTwo(coinDetail?.change_24hour)}
            </AppText>
          </View>
        </View>
        {/* <MarketOptionContainer
          onOptionChange={(e) => {
            setOption(e);
          }}
          firstTitle={base_currency}
          secondTitle={quote_currency}
        /> */}
        {/* <View style={styles.chartContain}>
          <AppText type={THIRTEEN} weight={MEDIUM}>
            {visible ? "Chart" : "Order Book"}
          </AppText>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image
              source={Back_Icon}
              resizeMode="contain"
              style={[
                styles?.Back_Icon,
                visible && { transform: [{ rotate: "90deg" }] },
              ]}
            />
          </TouchableOpacity>
        </View> */}
        
          <WebView
            source={{
              uri: `https://cvtrade.io/chart/${base_currency}_${quote_currency}`,
            }}
            style={styles.webViewStyle}
            startInLoadingState={true}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={true}
            // scrollEnabled={true}
            androidLayerType={'hardware'}
            cacheEnabled={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            bounces={false}
            sharedCookiesEnabled={true}
            javaScriptEnabledAndroid={true}
          />
          <View style={styles.orderBook}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: colors.dividerColor, padding: 8, borderRadius: 10 }}
            >
              <AppText color={ORDERTEXT}>Price({quote_currency})</AppText>
              <AppText color={ORDERTEXT}>Quantity({base_currency})</AppText>
              <AppText color={ORDERTEXT}>Total({quote_currency})</AppText>
            </View>
            <ScrollView style={{height: 50}} showsVerticalScrollIndicator={true}>
            {sellOrders?.map((item) => (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                  paddingHorizontal: 20,
                }}
              >
                  <AppText color={RED}>{toFixedFour(item?.price)}</AppText>
                  <AppText color={WHITE}>{toFixedFour(item?.quantity)}</AppText>
                  <AppText color={RED}>{toFixedFour(item?.price * item?.quantity)}</AppText>
                  </View>
              ))}
              </ScrollView>
              
              <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: colors.linearGreen, padding: 5, borderRadius: 10, marginVertical:5 }}>
                <AppText type={FOURTEEN} color={GREEN}>{buy_price}</AppText>
                <AppText>{`${coinDetail?.change}%`}</AppText>
              </View>
              <ScrollView style={{height: 50}} showsVerticalScrollIndicator={true}>
              {buyOrders?.map((item) => (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                  paddingHorizontal: 20
                }}
              >
                  <AppText color={GREEN}>{toFixedFour(item?.price)}</AppText>
                  <AppText color={WHITE}>{toFixedFour(item?.quantity)}</AppText>
                  <AppText color={GREEN}>{toFixedFour(item?.price * item?.quantity)}</AppText>
                  </View>
              ))}
           </ScrollView>
          </View>
        
        
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        <CommonButton
            title={kycVerified !== 2 ? "Sumbit KYC" : `Buy ${base_currency}`}
            buttonStyle={styles?.Button}
            onPress={() => handleOpenTradeModal('Buy')}
            containerStyle={{width: 170}}
          />
          <CommonButton
            normalButton
            title={kycVerified !== 2 ? "Sumbit KYC" : `Sell ${quote_currency}`}
            normalButtonStyle={[{ backgroundColor: colors.red }]}
            onPress={() => handleOpenTradeModal('Sell')}
            containerStyle={{width: 170}}
          />
        </View>
        <Modal
        transparent
        statusBarTranslucent={true}
        animationType="none"
        visible={showTradeModal}
      >
        <TouchableOpacity
          onPress={setShowTradeModal}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          activeOpacity={1}
        >
          <View style={styles.availableBalance}>
          <AppText type={THIRTEEN} weight={MEDIUM}>
            Available balance:{" "}
            {option === "Buy"
              ? checkToFixedThree(balance)
              : toFixedThree(_balance)}{" "}
            {option === "Buy" ? quote_currency : base_currency}
          </AppText>
          <AppText type={FOURTEEN} style={styles?.Common_Margin}>
            Order Type
          </AppText>

          <TouchableOpacity
            style={styles?.Select_Container}
            onPress={() => refRBSheet?.current?.open()}
          >
            <AppText type={FOURTEEN}>{selectedOption}</AppText>

            <Image
              source={Back_Icon}
              resizeMode="contain"
              tintColor={colors.white}
              style={styles.ArrowIcon}
            />
          </TouchableOpacity>
          {selectedOption === "Limit" && (
            <Input
              placeholder={placeHolderText.empty}
              title={titleText.price}
              value={price}
              onChangeText={(text) => handleAmount(text)}
              keyboardType="numeric"
              autoCapitalize="none"
              returnKeyType="next"
              onfocus={() => setFocusPrice(true)}
              onBlur={() => setFocusPrice(false)}
              onSubmitEditing={() => amountInput?.current?.focus()}
              currency={quote_currency}
              editable={selectedOption === "Limit"}
              containerStyle={[
                styles.inputContainer,
                {
                  borderColor: !focusPrice
                    ? colors.inputBorder
                    : colors.focusedColor,
                },
              ]}
              titleStyle={styles.inputContainer2}
            />
          )}
          <Input
            placeholder={placeHolderText.empty}
            title={titleText.amount}
            value={amount}
            onChangeText={(text) => handleQty(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            assignRef={(input) => {
              amountInput.current = input;
            }}
            onfocus={() => setFocusAmount(true)}
            onBlur={() => setFocusAmount(false)}
            currency={base_currency}
            containerStyle={[
              styles.inputContainer,
              {
                borderColor: !focusAmount
                  ? colors.inputBorder
                  : colors.focusedColor,
              },
            ]}
            titleStyle={styles.inputContainer2}
          />
          <View style={styles.Text_Container}>
            {percentageData.map((e) => {
              return (
                <TouchableOpacityView
                  onPress={() => {
                    handleTotalPercentage(e.value);
                  }}
                  style={[
                    styles.percentageContainer,
                    activePercentage === e.value && {
                      backgroundColor: colors.green_fifty,
                    },
                  ]}
                >
                  <AppText type={TWELVE} weight={SEMI_BOLD}>
                    {e.value}%
                  </AppText>
                </TouchableOpacityView>
              );
            })}
          </View>
          <CommonButton
            title={kycVerified !== 2 ? "Sumbit KYC" : option === "Buy" ? `Buy ${base_currency}` : `Sell ${base_currency}`}
            buttonStyle={styles?.Button}
            onPress={() => onSubmit()}
            normalButton={option === "Sell" ? true : false}
            normalButtonStyle={[{ backgroundColor: colors.red }]}
            // containerStyle={{width: 170}}
          />
        </View>
       
        </TouchableOpacity>
      </Modal>

        <RBSheet
          ref={refRBSheet}
          height={250}
          closeOnPressMask={true}
          customStyles={{
            container: styles.sheetContain,
            draggableIcon: {
              backgroundColor: "#000000CC",
            },
          }}
        >
          <ScrollView>
            <Select
              rbSheetRef={refRBSheet}
              onSelectOption={handleSelectOption}
            />
          </ScrollView>
        </RBSheet>
        <RBSheet
          ref={refRBSheetOrder}
          height={400}
          closeOnPressMask={true}
          customStyles={{
            container: styles.sheetContain,
            draggableIcon: {
              backgroundColor: "#000000CC",
            },
          }}
        >
          {/* <ScrollView>
          <Select rbSheetRef={refRBSheet} onSelectOption={handleSelectOption} />
          </ScrollView> */}
          <View style={{ alignItems: "center", padding: 10 }}>
            <View style={styles?.Line} />
            <Image
              source={Success_Icon}
              style={{ width: 80, height: 80, marginVertical: 10 }}
            />
            <AppText type={TWENTY}>Order Created Successfully!</AppText>
            <View
              style={{
                backgroundColor: colors.blackFive,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                padding: 10,
                marginVertical: 10,
              }}
            >
              <View>
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  Quantity
                </AppText>
                {/* <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  TDS
                </AppText> */}
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  FEE
                </AppText>
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  Total
                </AppText>
              </View>
              <View>
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  {amount}
                </AppText>
                {/* <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  {feeDetail?.tds}
                </AppText> */}
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  {feeDetail?.fee}
                </AppText>
                <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                  {amount * buy_price}
                </AppText>
              </View>
            </View>
            <AppText>
              Fee: Maker: {feeDetail?.maker_fee}% l Taker:{" "}
              {feeDetail?.taker_fee}% l
            </AppText>
            <CommonButton
              title="Done"
              onPress={() => refRBSheetOrder?.current?.close()}
            />
          </View>
        </RBSheet>
      </ScrollView>
      <SpinnerSecond loading={loading} />
      <PairModal showPair={showPair} setShowPair={setShowPair} />
    </AppBackground>
  );
};

export default BtcCoinDetails;

const styles = StyleSheet.create({
  Button: {
    marginVertical: 10,
  },
  inputStyle: {
    backgroundColor: "#141414",
    width: "100%",
    marginTop: 5,
  },
  Line: {
    width: 66,
    height: 3,
    backgroundColor: "#CAD3DD40",
    alignSelf: "center",
  },
  sheetContain: {
    backgroundColor: "#0C0C0C",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  ArrowIcon: {
    height: 10,
    width: 10,
    transform: [{ rotate: "-90deg" }],
  },
  Select_Container: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.InputBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.InputBackground,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    justifyContent: "space-between",
  },
  webViewStyle: {
    height: Screen.Height / 2.1,
    width: Screen.Width - 25,
    alignSelf: "center",
    marginTop: 10,
    // backgroundColor: "black"
  },
  availableBalance: {
    width: Screen.Width - 25,
    alignSelf: "center",
    backgroundColor: "#202224",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 10,
  },
  orderBook: {
    width: Screen.Width - 25,
    alignSelf: "center",
    backgroundColor: "#FFFFFF10",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    height: Screen.Height / 2.1,
  },

  Common_Margin: {
    marginTop: 5,
    marginHorizontal: 0,
  },
  HeaderCommon_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  icon: {
    resizeMode: "contain",
    width: 25,
    height: 25,
  },
  Coin_Container: {
    flexDirection: "row",
    backgroundColor: colors.inputBgColor,
    width: "50%",
    height: 40,
    borderRadius: 48,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  Back_Icon: {
    width: 11,
    height: 11,
    transform: [{ rotate: "-90deg" }],
  },
  Refresh_Container: {
    backgroundColor: "#FFFFFF2E",
    width: 35,
    height: 35,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  Refresh_Icon: {
    width: 15,
    height: 15,
  },
  Text_Container: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartContain: {
    width: Screen.Width - 25,
    padding: 5,
    backgroundColor: colors.inputBgColor,
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginTop: 5,
    // backgroundColor: colors.blackFive,
    borderWidth: 0,
    fontSize: 12,
    // borderColor: colors.borderColor,
    borderWidth: borderWidth,
  },
  inputContainer2: {
    marginTop: 5,
  },
  percentageContainer: {
    height: smallButtonHeight,
    padding: universalPaddingHorizontal,
    alignItems: "center",
    justifyContent: "center",
    width: "23%",
    backgroundColor: colors.blackFive,
    borderRadius: 5,
  },
});
