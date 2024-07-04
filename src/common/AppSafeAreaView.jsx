import React from 'react';
import {ImageBackground, Platform, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Home_BG} from '../helper/ImageAssets';
import {commonStylesSecond} from '../theme/commonStylesSecond';

const AppSafeAreaView = ({children, source, barStyle}) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView edges={['right', 'left']} style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={source ? source : Home_BG}
        style={commonStylesSecond.ScreenSize}
        resizeMode="cover">
        {children}
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle ? barStyle: 'light-content'}
      />
      <ImageBackground
        source={source ? source : Home_BG}
        style={commonStylesSecond.ScreenSize}
        resizeMode="cover">
        {children}
      </ImageBackground>
    </View>
  );
};

export default AppSafeAreaView;
