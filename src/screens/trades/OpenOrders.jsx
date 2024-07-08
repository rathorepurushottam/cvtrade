import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AppText,
  BOLD,
  FOURTEEN,
  HISTORYTEXT,
  MEDIUM,
  RED,
  SEMI_BOLD,
  SIXTEEN,
  TWELVE,
} from "../../common/AppText";
import { colors } from "../../theme/Colors";
import { useAppSelector } from "../../store/hooks";
import { cancelOrder } from "../../actions/homeActions";
import { useDispatch } from "react-redux";

const OpenOrders = ({data}) => {
  const openOrders = useAppSelector(state => state.home.openOrders);
  const name = data?.currencyName;
  const Data = [
    {
      id: 1,
      CoinName: "BTC/USDT",
      Date: "10-06-2024",
      Label_One: "Price",
      Price: "0.987656",
      Label_Two: "Quantity",
      Quantity: "11,87.98",
      Label_Three: "TDS Amount",
      TDSAmount: "129.0987",
      Label_Four: "Total",
      Total: "12,89,980.09",
      Label_Five: "Status",
      Status: "Open",
      Label_Six: "Order Type",
      OrderType: "-",
    },
    {
      id: 2,
      CoinName: "BTC/USDT",
      Date: "10-06-2024",
      Label_One: "Price",
      Price: "0.987656",
      Label_Two: "Quantity",
      Quantity: "11,87.98",
      Label_Three: "TDS Amount",
      TDSAmount: "129.0987",
      Label_Four: "Total",
      Total: "12,89,980.09",
      Label_Five: "Status",
      Status: "Open",
      Label_Six: "Order Type",
      OrderType: "-",
    },
    {
      id: 3,
      CoinName: "BTC/USDT",
      Date: "10-06-2024",
      Label_One: "Price",
      Price: "0.987656",
      Label_Two: "Quantity",
      Quantity: "11,87.98",
      Label_Three: "TDS Amount",
      TDSAmount: "129.0987",
      Label_Four: "Total",
      Total: "12,89,980.09",
      Label_Five: "Status",
      Status: "Open",
      Label_Six: "Order Type",
      OrderType: "-",
    },
  ];
  const onDelete = (id) => {
    let data = {
      order_id: id,
    };
    useDispatch(cancelOrder(data));
  };
  return (
    <ScrollView style={{ flex: 1, marginVertical: 10 }}>
      {openOrders?.length > 0 ? openOrders?.map((item, index) => {
        return (
          <View key={index} style={styles?.Main_Container}>
            <View style={styles?.Min_Container}>
              <AppText
                type={SIXTEEN}
                weight={SEMI_BOLD}
                color={HISTORYTEXT}
              >
                {`${name?.firstCoin}/${name?.secondCoin}`}
              </AppText>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {dateFormatter(item?.createdAt)}
              </AppText>
            </View>
            <View style={[styles?.Min_Container, { marginTop: 15 }]}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {"Type"}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
              {item?.side}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Amount'}
              </AppText>
              <AppText type={12} weight={SEMI_BOLD}>
                {item?.quantity}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Price'}
              </AppText>
              <AppText stype={TWELVE} weight={SEMI_BOLD}>
                {item?.price}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={12} weight={MEDIUM} color={HISTORYTEXT}>
                {"Remaining"}
              </AppText>
              <AppText type={12} weight={SEMI_BOLD}>
                {item?.remaining}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={12} weight={MEDIUM} color={HISTORYTEXT}>
                {"Sttus"}
              </AppText>
              <AppText type={12} weight={SEMI_BOLD}>
                {item?.Status}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={12} weight={MEDIUM} color={HISTORYTEXT}>
                {"Order Type"}
              </AppText>
              <AppText type={12} weight={SEMI_BOLD}>
                {item?.order_type}
              </AppText>
            </View>
            <TouchableOpacity style={styles?.DeleteTrade_Container} onPress={() => onDelete(item?._id)}>
              <AppText type={12} weight={BOLD} color={RED}>
                Delete Trade
              </AppText>
            </TouchableOpacity>
          </View>
        );
      }): <AppText style={{alignSelf: "center", marginTop: 100}} type={SIXTEEN} weight={SEMI_BOLD}>No Data Available</AppText>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF10",
    marginTop: 20,
    marginHorizontal: 20,
  },
  Min_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  DeleteTrade_Container: {
    width: 112,
    height: 32,
    backgroundColor: "#EB433520",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  Delete_Text: {
    color: "#EB4335",
    fontWeight: "700",
  },
});

export default OpenOrders;
