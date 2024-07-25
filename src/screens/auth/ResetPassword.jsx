import React, {useRef, useState} from 'react';
import {
  AppText,
  Button,
  FOURTEEN,
  GREEN,
  Input,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  YELLOW,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import KeyBoardAware from '../../common/KeyboardAware';
import {View} from 'react-native';
import {authStyles} from './authStyles';
import {errorText, placeHolderText} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useRoute} from '@react-navigation/native';
import {forgotPassword} from '../../actions/authActions';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {checkValue, validatePassword} from '../../helper/utility';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import CommonButton from '../../common/CommonButton';
import { colors } from '../../theme/colors';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const data = route?.params?.data ?? '';
  const languages = useAppSelector(state => {
    return state.account.languages;
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const confirmPasswordInputRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [reFocus, setReFocus] = useState(false);
  const onSubmit = () => {
    if (!validatePassword(password)) {
      showError(checkValue(languages?.error_passwordRegex));
      return;
    }
    if (password !== confirmPassword) {
      showError(checkValue(languages?.error_passwordMismatch));
      return;
    }
    let _data = {
      email_or_phone: data?.email_or_phone,
      new_password: password,
      verification_code: data?.otp,
    };
    dispatch(forgotPassword(_data));
  };
  return (
    <AppSafeAreaView>
      <ToolBar isThird={false}/>
      <KeyBoardAware>
        <View style={authStyles.forgotContainer}>
          <AppText type={TWENTY}>
            {checkValue(languages?.reset_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={GREEN}>
              {checkValue(languages?.reset_two)}
            </AppText>
          </AppText>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.reset_three)}
          </AppText>
          <Input
            placeholder={checkValue(languages?.place_newPassword)}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            returnKeyType="next"
            isSecure
            onfocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onSubmitEditing={() => confirmPasswordInputRef?.current?.focus()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            containerStyle={[authStyles.forgotContainer, {
              borderColor: !focus
                ? colors.inputBorder
                : colors.focusedColor,
            }]}
           
          />
          <Input
            placeholder={checkValue(languages?.place_confirmNewPassword)}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isConfirmPasswordVisible}
            assignRef={input => {
              confirmPasswordInputRef.current = input;
            }}
            onfocus={() => setReFocus(true)}
            onBlur={() => setReFocus(false)}
            returnKeyType="done"
            isSecure
            onSubmitEditing={() => onSubmit()}
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            containerStyle={[ {
              borderColor: !reFocus
                ? colors.inputBorder
                : colors.focusedColor,
            }]}
          />

          <CommonButton
            title={'Submit'}
            onPress={() => onSubmit()}
            containerStyle={authStyles.marginTop}
          />
        </View>
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default ResetPassword;
