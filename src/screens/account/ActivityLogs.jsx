import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity, Platform } from 'react-native';
import { AppText, Button } from '../../common'
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import { getActivityLogs } from '../../actions/homeActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../theme/colors';
import { dateFormatter } from '../../helper/utility';
import KeyBoardAware from '../../common/KeyboardAware';

const ActivityLogs = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = (skip) => {
    setIsLoading(true);
    dispatch(getActivityLogs()) 
      .then(response => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching transaction history:', error);
      });
  };

  const activityLogs = useAppSelector(state => state.home.activityLogs);

  console.log(activityLogs?.length, "transaction");
  const [serialNumber, setSerialNumber] = useState(1);
  const _RenderList = ({ item, index }) => {
    const currentSerialNumber = serialNumber + index;
    return (
      <View style={styles.row}>
        {/* <AppText style={styles.cell}>{currentSerialNumber}</AppText> */}
        <AppText style={[styles.cell, {marginRight: 20}]}>{dateFormatter(item?.date)}</AppText>
        <AppText style={styles.cell}>{item?.Activity}</AppText>
        <AppText style={styles.cell}>{item?.IP}</AppText>
      </View>
    );
  };

  return (
    <AppSafeAreaView>
      <ToolBar isLogo={false} title='Activity Logs' isSecond  />
      <KeyBoardAware>
      <View>
        {activityLogs?.length > 0 ? 
        <>
        <View style={[styles.row,{paddingHorizontal:10,marginLeft:10}]}>
        {/* <AppText style={styles.header}>S.No.</AppText> */}
        <AppText style={styles.header}>Date/Time</AppText>
        <AppText style={styles.header}>Activity</AppText>
        <AppText style={styles.header}>IP Address</AppText>
      </View>
      <FlatList
        ref={flatListRef}
        data={activityLogs}
        renderItem={_RenderList}
        keyExtractor={(item, index) => index.toString()}
        // onScroll={({ nativeEvent }) => {
        //   handleScroll({ nativeEvent })
        //   handleStartReached({ nativeEvent });
        // }}
        contentContainerStyle={{ marginBottom: Platform.OS === "ios" ? 50 : 0, }}
        style={styles.flatList}
      />
        </>
        : <AppText>Nothing to show</AppText>}
      
      {isLoading && <ActivityIndicator color={colors.buttonBg} size={'large'}/>}
      </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop:15,
    paddingHorizontal:18,
    // backgroundColor: "blue"
  },
  cell: {
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    // flexGrow: 1,
  },
});

export default ActivityLogs;
