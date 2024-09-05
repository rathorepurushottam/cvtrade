import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Screen} from '../../theme/dimens';
import {Button} from '../../common';
import FastImage from 'react-native-fast-image';
import { ThreeDots_Icon} from '../../helper/ImageAssets';

const P2pOrderTab = ({onKeyPressChange = () => {}}) => {
  const [activeTab, setActiveTab] = useState('P2P Orders');

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
          width: Screen.Width / 1.5,
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
          children="P2P Orders"
          isSecond
          containerStyle={{
            backgroundColor: activeTab === 'P2P Orders' ? '#7ED375' : 'transparent',
            width: '48%',
            height:35
          }}
          
          onPress={() => {
            setActiveTab('P2P Orders'), handleTabPress('P2P Orders');
          }}
        />
        <Button
          children="Statement"
          containerStyle={{
            backgroundColor: activeTab === 'Statement' ? '#FE535B' : 'transparent',
            width: '48%',
            height:35
          }}
          isSecond
          onPress={() => {
            setActiveTab('Statement'), handleTabPress('Statement');
          }}
        />
      </View>
      
    </View>
  );
};

export default P2pOrderTab;
