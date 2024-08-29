import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {
  ARROW_REVERSE,
  Back_Icon,
  logoTwo,
  adCard,
  augBanner
} from '../helper/ImageAssets';
import {Screen, universalPaddingHorizontalHigh} from '../theme/dimens';
import NavigationService from '../navigation/NavigationService';
import {AppText, BLACK, BOLD, FIFTEEN, SEMI_BOLD, SIXTEEN} from './AppText';
import {
  CONVERT_HISTORY_SCREEN,
  HOME_SCREEN,
  LAKED_STAKING,
  NAVIGATION_BOTTOM_TAB_STACK,
} from '../navigation/routes';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setP2P} from '../slices/homeSlice';
import {colors} from '../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const P2pHeader = ({
  isLogo = true,
  isSecond,
  title,
  isThird,
  isFavorite,
  onAdd,
  isFourth,
  isFifth,
  currencyText,
  onFifthPress,
  children,
  isLock = false,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
      {/* <ImageBackground resizeMode="cover" source={p2pBg} style={{flex: 1}}> */}
        {/* <View
          style={[
            styles.container,
            {justifyContent: isLogo || isSecond ? 'center' : 'flex-start'},
          ]}>
          <TouchableOpacityView
            style={
              isLogo || isSecond ? styles.backContainer : styles.backContainer2
            }
            onPress={() => {
              if (p2p) {
                  dispatch(setP2P(''))
              }else{
                NavigationService.goBack();
              }
            }}>
            <FastImage
              source={BACK_ICON}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          {isLogo && !isSecond && (
            <FastImage
              source={logoTwo}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          )}
          {isSecond && (
            <AppText
              type={SIXTEEN}
              weight={BOLD}
              color={BLACK}
              style={styles.title}>
              {title}
            </AppText>
          )}

          {isThird && (
            <TouchableOpacityView onPress={onAdd} style={styles.starContainer}>
              <AppText
                type={FIFTEEN}
                weight={SEMI_BOLD}
                color={BLACK}
                style={{top: 2}}>
                {currencyText}
              </AppText>

              <FastImage
                source={ARROW_REVERSE}
                resizeMode="contain"
                style={styles.star}
              />
            </TouchableOpacityView>
          )}
        </View> */}
        <LinearGradient colors={['#57934E','#AAE9A1']} style={[
            styles.container,
            {justifyContent: isLogo || isSecond ? 'center' : 'flex-start'},
          ]}>
            <TouchableOpacityView
            style={
              isLogo || isSecond ? styles.backContainer : styles.backContainer2
            }
            onPress={() => {
              
                NavigationService.goBack();
              
            }}>
            <FastImage
              source={Back_Icon}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          {isLogo && !isSecond && (
            <FastImage
              source={logoTwo}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          )}
          {isSecond && (
            <AppText
              type={SIXTEEN}
              weight={BOLD}
              color={BLACK}
              style={styles.title}>
              {title}
            </AppText>
          )}

          {isThird && (
            <TouchableOpacityView onPress={onAdd} style={styles.starContainer}>
              <AppText
                type={FIFTEEN}
                weight={SEMI_BOLD}
                color={BLACK}
                style={{top: 2}}>
                {currencyText}
              </AppText>

              <FastImage
                source={ARROW_REVERSE}
                resizeMode="contain"
                style={styles.star}
              />
            </TouchableOpacityView>
          )}
          <FastImage source={adCard} style={{height: 120, width: Screen.Width -60, position: "absolute", left: 40}} resizeMode='contain'></FastImage>
          </LinearGradient>

        <View
          style={{
            flex: 1,
            backgroundColor:colors.p2pbgColor,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
          }}>
   {children}
          </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export {P2pHeader};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Screen.Width,
    height: 180,
    marginTop: 20
    // paddingTop: 20,
  },
  backContainer: {
    position: 'absolute',
    top: 9,
    padding: universalPaddingHorizontalHigh,
    left: 0,
  },
  backContainer2: {
    padding: universalPaddingHorizontalHigh,
    position: 'absolute',
    top: 9,
  },
  backIcon: {
    height: 16,
    width: 16,
  },

  title: {
    marginTop: 18,
  },
  star: {
    height: 20,
    width: 20,
  },
  starContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 10,
    // flex: 1,
    width: 80,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black,
    // padding: 0,
    right: 15,
    top: 15,
    alignItems: 'center',
  },
});
