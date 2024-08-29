import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { P2pHeader } from "../../common/P2pHeader";
import { Screen, borderWidth } from "../../theme/dimens";
import { P2pbuySell } from "./P2pbuySell";
import { P2pSheet } from "../../common/P2pSheet";
import { colors } from "../../theme/colors";
import { useEffect, useMemo, useRef, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  INR_CURRENCY,
  LikeButton,
  REMOVE,
  customUserImg,
  doneIcon,
  searchIcon,
  watch,
} from "../../helper/ImageAssets";
import {
  AppText,
  BOLD,
  Button,
  FOURTEEN,
  MEDIUM,
  SECOND,
  SEMI_BOLD,
  SearchInput,
  THIRTEEN,
  TWELVE,
  TWENTY_TWO,
  WHITE,
} from "../../common";
import RBSheet from "react-native-raw-bottom-sheet";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import NavigationService from "../../navigation/NavigationService";
import { BUY_CRYPTO, p2pFilter } from "../../navigation/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getP2pCoinList,
  getFiatCurrencyList,
  getPaymentMethod,
  getbuyOrdersList,
} from "../../actions/p2pActions";

const p2pHome = () => {
  const dispatch = useAppDispatch();
  const p2pCoinList = useAppSelector((state) => state.p2p.p2pCoinList);
  const fiatCurrencyList = useAppSelector(
    (state) => state.p2p.fiatCurrencyList
  );
  const paymentMethodList = useAppSelector(
    (state) => state.p2p.paymentMethodList
  );
  const buyOrderList = useAppSelector((state) => state.p2p.buyOrderList);
  const paymentList = Object.keys(paymentMethodList);
  const amountRef = useRef(null);
  const paymentRef = useRef(null);
  const availableCurrenciesRef = useRef(null);
  const fiatCurrenciesRef = useRef(null);
  const [orderType, setOrderType] = useState("Buy");
  const [currencySearch, setCurrencySearch] = useState("");
  const [availableCurrency, setAvailableCurrency] = useState("BTC");
  const [buyList, setBuyList] = useState([1, 2, 3]);
  const [amountList, setAmountList] = useState(0);

  useEffect(() => {
    dispatch(getP2pCoinList());
    dispatch(getFiatCurrencyList());
    dispatch(getPaymentMethod());
  }, []);

  // useEffect(() => {
  //   let data = {
  //     short_name: availableCurrency,
  //   };
  //   dispatch(getbuyOrdersList(data));
  // }, [orderType]);

 
    const _renderItem = ({ item, index }) => {
      return (
        <View style={styles.listMainContainer}>
          <View style={styles.userContain}>
            <View style={{flexDirection: "column", justifyContent: "space-between"}}>
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              style={styles.horizontal}
            >
              {item?.post_name}
            </AppText>
            <View style={styles.quantityBox}>
              <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
                Limit {item?.volume} {item?.base_short_name}
              </AppText>
              {/* <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
              UPI{' '}
              <AppText
                type={TWELVE}
                weight={MEDIUM}
                style={{color: colors.pink}}>
                |
              </AppText>
            </AppText> */}
            </View>

            </View>
            
            {/* <FastImage
              source={doneIcon}
              style={styles.listImgStyle}
              resizeMode="contain"
            /> */}
            <View style={styles.buttonContain}>
              <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
                Price {item?.quote_short_name} {item?.fixed_price}
              </AppText>

              <Button
                children="Buy"
                titleStyle={{ color: colors.white }}
                containerStyle={[styles.buyBtn, {backgroundColor: orderType === 'Buy' ? colors.green : colors.red}]}
                onPress={() => {
                  NavigationService.navigate(BUY_CRYPTO);
                }}
              />
            </View>
          </View>
          <View>
            <View style={styles.cornerStyle}>
              {item?.payment_method?.map((item) => {
                return (
                  <><AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
                    {item?.type}

                  </AppText><AppText
                    type={TWELVE}
                    weight={MEDIUM}
                    style={{ color: colors.pink, marginLeft: 5 }}
                  >
                      |
                    </AppText></>
                );
              })}
            </View>
            
          </View>

          {buyList?.length - 1 == index ? (
            <></>
          ) : (
            <View style={styles.divider} />
          )}
        </View>
      );
    };

    // return _renderItem;
  

  console.log(orderType, "orderType");

  return (
    <P2pHeader isLogo={false}>
      <P2pbuySell
        onKeyPressChange={(e) => {
          setOrderType(e);
        }}
      />
      <P2pSheet
        onFilterPress={() => {
          NavigationService.navigate(p2pFilter);
        }}
        onCurrencyPress={() => {
          availableCurrenciesRef?.current?.open();
        }}
        onPaymentPress={() => {
          paymentRef?.current?.open();
        }}
        onAmountPress={() => {
          amountRef?.current?.open();
        }}
        onFiatPress={() => {
          fiatCurrenciesRef?.current?.open();
        }}
      />
      <View style={styles.divider} />
      <FlatList data={buyOrderList} renderItem={_renderItem} />

      <RBSheet
        ref={availableCurrenciesRef}
        animationType="none"
        customStyles={{
          container: [styles.sheetContainer, { height: Screen.Height / 1.2 }],
          wrapper: {
            backgroundColor: "#0005",
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <View style={[styles.cryptoSheetContainer]}>
          <SearchInput
            value={currencySearch}
            sheetDownButton={true}
            sheetDownPress={() => {
              availableCurrenciesRef?.current?.close();
            }}
            onChangeText={setCurrencySearch}
            placeholder={"Please enter currency"}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => {}}
            onFocus={true}
            searchContainStyle={{
              width: "70%",
              backgroundColor: colors.sheetInput,
              marginRight: 60,
              borderColor: colors.InputBorder,
            }}
          />

          <View style={[styles.paymentListContainer]}>
            <AppText color={SECOND} type={TWELVE} weight={MEDIUM}>
              Available Currency
            </AppText>
            <View
              style={{
                width: Screen.Width,
                height: 0.3,
                backgroundColor: "#757575",
                alignSelf: "center",
                marginTop: 5,
              }}
            ></View>

            <View style={{ height: Screen.Width / 1.4 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={p2pCoinList}
                renderItem={({ item, index }) => {
                  return (
                    <AppText
                      onSelect={() => setAvailableCurrency(item?.short_name)}
                      color={WHITE}
                      type={THIRTEEN}
                      weight={BOLD}
                      style={{ marginTop: 10, marginLeft: 15 }}
                    >
                      {item?.short_name}
                    </AppText>
                  );
                }}
              />
            </View>
          </View>
          {/* <View style={[styles.paymentListContainer]}>
            <AppText color={SECOND} type={TWELVE} weight={MEDIUM}>
              All currencies
            </AppText>
            <View
              style={{
                width: Screen.Width,
                height: 0.3,
                backgroundColor: '#757575',
                alignSelf: 'center',
                marginTop: 5,
              }}></View>

            <View style={{height: Screen.Height / 5.1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={availableCurrencies}
                renderItem={({item, index}) => {
                  return (
                    <AppText
                      color={WHITE}
                      type={THIRTEEN}
                      weight={BOLD}
                      style={{marginTop: 10, marginLeft: 15}}>
                      {'AED'}
                    </AppText>
                  );
                }}
              />
            </View>
          </View> */}
          <View style={[styles.buttonContainer, {}]}>
            <Button
              children="Reset"
              titleStyle={{ color: colors.white }}
              containerStyle={styles.resetButton}
            />
            <Button
              children="Confirm"
              titleStyle={{ color: colors.black }}
              containerStyle={{ width: "48%", borderRadius: 20 }}
              bgColor={colors.greenShade}
            />
          </View>

          <View style={{ height: 10 }}></View>
        </View>
      </RBSheet>

      <RBSheet
        ref={amountRef}
        height={200}
        animationType="none"
        customStyles={{
          container: styles.sheetContainer,
          wrapper: {
            backgroundColor: "#0005",
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <View style={styles.currencyHeader}>
          <AppText type={FOURTEEN} weight={SEMI_BOLD}>
            Amount
          </AppText>
          <TouchableOpacityView
            style={styles.removeBtn}
            onPress={() => {
              amountRef?.current?.close();
            }}
          >
            <FastImage
              source={REMOVE}
              tintColor={colors.black}
              style={styles.removeImg}
            />
          </TouchableOpacityView>
        </View>
        <View style={[styles.cryptoSheetContainer]}>
          <View style={styles.currencyBox}>
            <TextInput
              editable={false}
              placeholder="e.g. 100"
              placeholderTextColor={"#7E7E7E"}
              keyboardType="decimal-pad"
              onChangeText={(e) => {}}
              style={styles.currencyBoxInput}
            ></TextInput>
            <View style={styles.contain}>
              <AppText color={WHITE} weight={SEMI_BOLD} style={styles.coin}>
                {"INR"}
              </AppText>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={amountList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={[styles.currencyListView]}>
                    <AppText weight={SEMI_BOLD}>5X</AppText>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              children="Reset"
              titleStyle={{ color: colors.white }}
              containerStyle={styles.resetButton}
            />
            <Button
              children="Confirm"
              titleStyle={{ color: colors.black }}
              containerStyle={{ width: "48%" }}
            />
          </View>
          <View style={{ height: 10 }}></View>
        </View>
      </RBSheet>

      <RBSheet
        ref={paymentRef}
        animationType="none"
        customStyles={{
          container: [styles.sheetContainer, { height: Screen.Height / 1.7 }],
          wrapper: {
            backgroundColor: "#0005",
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <View style={styles.currencyHeader}>
          <AppText type={FOURTEEN} weight={SEMI_BOLD}>
            Payment Methods
          </AppText>
          <TouchableOpacityView
            style={styles.removeBtn}
            onPress={() => {
              paymentRef?.current?.close();
            }}
          >
            <FastImage
              source={REMOVE}
              tintColor={colors.black}
              style={styles.removeImg}
            />
          </TouchableOpacityView>
        </View>
        <View style={[styles.cryptoSheetContainer]}>
          <View style={styles.currencyBox}>
            <FastImage
              source={searchIcon}
              tintColor={"#7E7E7E"}
              resizeMode="contain"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search payment method"
              placeholderTextColor={"#7E7E7E"}
              onChangeText={(e) => {}}
              style={styles.searchInput}
            ></TextInput>
          </View>
          <View style={styles.paymentListContainer}>
            <FlatList
              data={paymentList}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.paymentSheetList}>
                    <AppText weight={SEMI_BOLD}>{item}</AppText>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              children="Reset"
              titleStyle={{ color: colors.white }}
              containerStyle={styles.resetButton}
            />
            <Button
              children="Confirm"
              titleStyle={{ color: colors.black }}
              containerStyle={{ width: "48%" }}
            />
          </View>

          <View style={{ height: 10 }}></View>
        </View>
      </RBSheet>
      <RBSheet
        ref={fiatCurrenciesRef}
        animationType="none"
        customStyles={{
          container: [styles.sheetContainer, { height: Screen.Height / 2 }],
          wrapper: {
            backgroundColor: "#0005",
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <View style={[styles.cryptoSheetContainer]}>
          <View style={[styles.paymentListContainer]}>
            <AppText color={SECOND} type={TWELVE} weight={MEDIUM}>
              Fiat Currency
            </AppText>
            <View
              style={{
                width: Screen.Width,
                height: 0.3,
                backgroundColor: "#757575",
                alignSelf: "center",
                marginTop: 5,
              }}
            ></View>

            <View style={{ height: Screen.Width / 1.4 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={fiatCurrencyList}
                renderItem={({ item, index }) => {
                  return (
                    <AppText
                      color={WHITE}
                      type={THIRTEEN}
                      weight={BOLD}
                      style={{ marginTop: 10, marginLeft: 15 }}
                    >
                      {item?.short_name}
                    </AppText>
                  );
                }}
              />
            </View>
          </View>
          {/* <View style={[styles.paymentListContainer]}>
            <AppText color={SECOND} type={TWELVE} weight={MEDIUM}>
              All currencies
            </AppText>
            <View
              style={{
                width: Screen.Width,
                height: 0.3,
                backgroundColor: '#757575',
                alignSelf: 'center',
                marginTop: 5,
              }}></View>

            <View style={{height: Screen.Height / 5.1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={availableCurrencies}
                renderItem={({item, index}) => {
                  return (
                    <AppText
                      color={WHITE}
                      type={THIRTEEN}
                      weight={BOLD}
                      style={{marginTop: 10, marginLeft: 15}}>
                      {'AED'}
                    </AppText>
                  );
                }}
              />
            </View>
          </View> */}
          <View style={[styles.buttonContainer, {}]}>
            <Button
              children="Reset"
              titleStyle={{ color: colors.white }}
              containerStyle={styles.resetButton}
            />
            <Button
              children="Confirm"
              titleStyle={{ color: colors.black }}
              containerStyle={{ width: "48%", borderRadius: 20 }}
              bgColor={colors.greenShade}
            />
          </View>

          <View style={{ height: 10 }}></View>
        </View>
      </RBSheet>
    </P2pHeader>
  );
};

export default p2pHome;

const styles = StyleSheet.create({
  searchIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 13,
    left: 10,
  },
  paymentListContainer: {
    marginTop: 15,
    width: Screen.Width - 30,
    alignSelf: "center",
  },
  searchInput: {
    width: "100%",
    zIndex: 9999,
    paddingHorizontal: 50,
    color: colors.white,
  },
  removeBtn: {
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 15,
    right: 10,
  },
  resetButton: {
    width: "48%",
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: colors.greenShade,
    borderRadius: 20,
  },
  paymentSheetList: {
    width: "45%",
    marginEnd: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.buttonBg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  coin: {
    position: "absolute",
    left: -35,
  },
  contain: {
    width: "20%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  currencyBoxInput: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    // color: 'white',
    backgroundColor: colors.sheetInput,
    borderRadius: 10,
  },
  currencyBox: {
    marginTop: 20,
    width: Screen.Width / 1.09,
    height: 50,
    borderRadius: 5,
    borderColor: colors.blackFive,
    // borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.sheetInput,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.dividerColor,
    marginVertical: 15,
  },
  listMainContainer: {
    width: Screen.Width - 15,
    alignSelf: "center",
    padding: 5,
    marginVertical: 5,
  },
  userContain: {
    // width: '100%',
    // alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "space-around"
  },
  listImgStyle: {
    height: 15,
    width: 15,
  },
  customUserImage: {
    height: 25,
    width: 25,
  },
  horizontal: {
    marginHorizontal: 5,
  },
  sameStyle: {
    flexDirection: "row",
    marginLeft: 5,
  },
  currencyTextBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  alignItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyImg: {
    height: 10,
    width: 10,
  },
  cornerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    // justifyContent: 'flex-end',
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  buttonContain: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  buyBtn: {
    // backgroundColor: colors.green,
    width: "75%",
    height: 30,
    marginTop: 10,
  },
  sheetContainer: {
    backgroundColor: colors.p2pbgColor,
    height: Screen.Height / 3,
    borderRadius: 10,
  },
  currencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.p2pbgColor,
    position: "absolute",
    width: Screen.Width,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  emptyView: {
    height: 25,
    width: 25,
  },
  removeImg: {
    height: 25,
    width: 25,
  },
  cryptoSheetContainer: {
    padding: 5,
    width: Screen.Width,
    marginTop: 25,
    flex: 1,
  },
  currencyListView: {
    width: 50,
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.buttonBg,
    backgroundColor: "transparent",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
