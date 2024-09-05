import { FlatList, StyleSheet, View } from "react-native";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import ToolBar from "../../common/ToolBar";
import { useAppSelector } from "../../store/hooks";
import { borderWidth, Screen } from "../../theme/dimens";
import { colors } from "../../theme/colors";
import { useMemo } from "react";
import {
  AppText,
  Button,
  FOURTEEN,
  MEDIUM,
  SECOND,
  SEMI_BOLD,
  TWELVE,
} from "../../common";

const AddPaymentMethod = () => {
  const paymentMethodList = useAppSelector(
    (state) => state.p2p.paymentMethodList
  );
  const bankList = paymentMethodList?.BankDetails;
  const upiList = paymentMethodList?.upi;

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.listMainContainer}>
        <View style={styles.userContain}>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              style={styles.horizontal}
            >
              {item?.post_name}
            </AppText>
            <View style={styles.quantityBox}>
              <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
              {item?.account_holder_name}
              </AppText>
              {/* <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
                   Account Holder Name{' '}
                  <AppText
                    type={TWELVE}
                    weight={MEDIUM}
                    style={{color: colors.pink}}>
                   {item?.account_holder_name}
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
              {item?.account_number}
            </AppText>
            <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
              {item?.ifsc_code}
            </AppText>
          </View>
        </View>
        <View>
          <View style={styles.cornerStyle}>
            
                  <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>
                    {item?.bank_name}
                  </AppText>
                  <AppText
                    type={TWELVE}
                    weight={MEDIUM}
                    style={{ color: colors.pink, marginLeft: 5 }}
                  >
                    {item?.branch_name}
                  </AppText>
                
            
          </View>
        </View>

        {paymentMethodList?.length - 1 == index ? (
          <></>
        ) : (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  return (
    <AppSafeAreaView>
      <ToolBar isLogo={false} isSecond title="Payment Method" />
      <View style={styles.divider} />
      <View>
        <Button
          children="Add Payment Method"
          isSecond
          containerStyle={{
            backgroundColor: "#7ED375",
            width: "48%",
            height: 35,
            alignSelf: "center",
          }}
          //   onPress={() => NavigationService.navigate("p2pAddPost")}
        />
      </View>
      <View style={styles.divider} />
      <FlatList data={bankList} renderItem={_renderItem} />
    </AppSafeAreaView>
  );
};

export default AddPaymentMethod;

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
    // backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.focusedColor,
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
    color: "white",
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
    height: Screen.Height / 3.5,
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
