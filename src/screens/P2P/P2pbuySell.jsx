import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Screen} from '../../theme/dimens';
import {AppText, Button, FOURTEEN} from '../../common';
import FastImage from 'react-native-fast-image';
import { ThreeDots_Icon} from '../../helper/ImageAssets';
import { colors } from '../../theme/colors';

const P2pbuySell = ({onKeyPressChange = () => {}, onOrders, onPosts}) => {
  const [activeTab, setActiveTab] = useState('Buy');

  // useEffect(() => {
  //   onKeyPressChange('Buy');
  // }, []);

  const handleTabPress = (tab) => {
    console.log(tab, '===tab');
    setActiveTab(tab);
    onKeyPressChange(tab);
  };
  return (
    <View
      style={{
        width: Screen.Width,
        padding: 5,
      
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: '#797979',
          width: Screen.Width / 1.8,
          paddingVertical: 5,
          height:45,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          borderRadius: 10,
          borderColor: '#525252',
          borderWidth: 1
        }}>
        <Button
          children="Buy"
          isSecond
          containerStyle={{
            backgroundColor: activeTab === 'Buy' ? '#7ED375' : 'transparent',
            width: '48%',
            height:35
          }}
          
          onPress={() => {
            setActiveTab('Buy'), handleTabPress('Buy');
          }}
        />
        <Button
          children="Sell"
          containerStyle={{
            backgroundColor: activeTab === 'Sell' ? '#FE535B' : 'transparent',
            width: '48%',
            height:35
          }}
          isSecond
          onPress={() => {
            setActiveTab('Sell'), handleTabPress('Sell');
          }}
        />
      </View>  
    </View>
  );
};

export {P2pbuySell};
