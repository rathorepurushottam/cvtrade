import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AppText} from '.';
import {buttonHeight} from '../theme/dimens';
import {BLACK, SEMI_BOLD, SIXTEEN, WHITE} from './AppText';
import {colors} from '../theme/colors';
import TouchableOpacityView from './TouchableOpacityView';

const Button = ({
  children,
  containerStyle,
  titleStyle,
  disabled,
  onPress,
  isSecond,
  loading,
  bgColor,
  ...rest
}) => {
  return (
    <TouchableOpacityView
      style={[
        styles.buttonStyle(bgColor),
        containerStyle,
        disabled || loading ? {backgroundColor: colors.buttonBgDisabled} : {},
      ]}
      activeOpacity={1}
      onPress={
        disabled || loading ? console.log('Hello') : onPress
      }
      {...rest}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.buttonBg} />
      ) : (
        <AppText
          type={SIXTEEN}
          color={isSecond || disabled ? WHITE : BLACK}
          weight={SEMI_BOLD}
          style={titleStyle}>
          {children}
        </AppText>
      )}
    </TouchableOpacityView>
  );
};
const styles = StyleSheet.create({
  buttonStyle: (bgColor) => ({
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: buttonHeight,
    borderRadius: 5,
    backgroundColor: bgColor ? bgColor : colors.buttonBg,
  }),
});

export {Button};
