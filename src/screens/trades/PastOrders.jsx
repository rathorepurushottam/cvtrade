import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import { getPastOrders } from "../../actions/homeActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import moment from "moment";
import { dateFormatter } from "../../helper/utility";
import CommonButton from "../../common/CommonButton";
// import AppText from "../../Common/AppText";
// import Font from "../../Common/Font";

const PastOrders = ({data}) => {
  const dispatch = useAppDispatch();
  const pastOrder = useAppSelector(state => state.home.pastOrders);
  const [skip, setSkip] = useState(0);
  const limit = 10;
    const currencies = data?.data;
    const name = data?.currencyName;

  useEffect(() => {
   dispatch(getPastOrders(currencies));
  }, [skip]);

  const handleListStakingHistory = (type) => {
    setSkip(prevSkip => prevSkip + (type === "Next" ? 10 : -10));
  };

  return (
    <ScrollView style={{ flex: 1, marginVertical: 10 }}>
      {pastOrder?.length > 0 ? pastOrder?.map((item, index) => {
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
                {'Type'}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
                {item?.side}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Average filled Price'}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
                {item?.price}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Executed'}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
                {item?.quantity}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Order Type'}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
                {item?.order_type}
              </AppText>
            </View>
            <View style={styles?.Min_Container}>
              <AppText type={TWELVE} weight={MEDIUM} color={HISTORYTEXT}>
                {'Status'}
              </AppText>
              <AppText type={TWELVE} weight={SEMI_BOLD}>
                {item?.status}
              </AppText>
            </View>
            
          </View>
        );
      }): <AppText style={{alignSelf: "center", marginTop: 100}} type={SIXTEEN} weight={SEMI_BOLD}>No Data Available</AppText>}
      {pastOrder?.length > 10 && <View style={{flexDirection: "row", justifyContent: "center"}}>
        
        <CommonButton title="Previous" containerStyle={{width: "40%"}} onPress={() => handleListStakingHistory('Previous')} disabled={skip <= 0}/>
        <CommonButton title="Next" containerStyle={{width: "40%"}} onPress={() => handleListStakingHistory('Next')} disabled={pastOrder?.length < 10}/>
      </View>}
      
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
});

export default PastOrders;
