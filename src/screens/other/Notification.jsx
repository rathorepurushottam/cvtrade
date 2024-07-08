import React from 'react';
import {
  AppText,
  Button,
  SECOND,
  SEMI_BOLD,
  TEN,
  THIRTEEN,
  TWELVE,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import {FlatList, StyleSheet, View, Linking} from 'react-native';
import {commonStyles} from '../../theme/commonStyles';
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {useAppSelector} from '../../store/hooks';
import moment from 'moment';
import {colors} from '../../theme/colors';
import {checkValue} from '../../helper/utility';

const ListEmptyComponent = () => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  return (
    <View style={commonStyles.center}>
      <AppText color={SECOND}>{checkValue(languages?.nothing)}</AppText>
    </View>
  );
};

const Notification = () => {
  const notificationList = useAppSelector(state => state.home.notificationList);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.renderContainerSecond}>
          <View style={styles.renderContainerThird}>
            <AppText weight={SEMI_BOLD} type={THIRTEEN}>
              {item.title}
            </AppText>
            <AppText color={SECOND} type={TWELVE}>
              {moment(item.createdAt).fromNow()}
            </AppText>
           
           <AppText type={TWELVE}>{item?.message}</AppText>
       
          </View>
        </View>
      </View>
    );
  };

  return (
    <AppSafeAreaView>
      <ToolBar isSecond title={checkValue(languages?.notification_one)} />
      <FlatList
        data={notificationList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={commonStyles.flexGrow}
      />
    </AppSafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: universalPaddingHorizontalHigh,
    paddingVertical: universalPaddingHorizontal,
    marginVertical: universalPaddingHorizontal,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.thirdBg,
  },
  icon: {
    height: 50,
    width: 50,
    marginEnd: 10,
  },
  renderContainerSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  renderContainerThird: {
    flex: 1,
  },
});
