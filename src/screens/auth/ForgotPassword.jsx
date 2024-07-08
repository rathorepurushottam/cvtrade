import React, {useEffect, useState} from 'react';
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
import {ImageBackground, Keyboard, View} from 'react-native';
import {authStyles} from './authStyles';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {RenderTabBarAuth} from './Login';
import {PickerSelect} from '../../common/PickerSelect';
import {countryCodes} from '../../helper/dummydata';
import {checkValue, validateEmail} from '../../helper/utility';
// import { HOME_BG } from '../../helper/ImageAssets';
import { Screen } from '../../theme/dimens';
import CommonButton from '../../common/CommonButton';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [userName, setUserName] = useState('');
  const [index, setIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('91');

  useEffect(() => {
    setUserName('');
  }, [index]);

  const onGetOtp = () => {
    if (index === 0 && !userName) {
      showError(checkValue(languages?.error_email));
      return;
    }
    if (index === 1 && !validateEmail(userName)) {
      showError(checkValue(languages?.error_email));
      return;
    }
    let data = {
      email_or_phone: userName,
      resend: true,
      type: 'forgot',
    };
    Keyboard.dismiss();
    dispatch(sendOtp(data, true));
  };

  return (
    <AppSafeAreaView>
    <ImageBackground style={{ height:Screen.Height,width:Screen.Width}}>
      <ToolBar />
      <KeyBoardAware>
        <View style={authStyles.forgotContainer}>
          <AppText type={TWENTY}>
            {checkValue(languages?.forgot_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={GREEN}>
              {checkValue(languages?.forgot_two)}
            </AppText>
          </AppText>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.forgot_three)}
          </AppText>
          {/* <RenderTabBarAuth index={index} setIndex={setIndex} /> */}
          <View style={authStyles.mobileContainer}>
            {/* {index === 0 && (
              <PickerSelect
                data={countryCodes}
                value={countryCode}
                onChange={setCountryCode}
                placeholder={{
                  label: checkValue(languages?.place_country),
                  value: '',
                }}
                container={authStyles.picker}
              />
            )} */}
            <Input
              placeholder={
                checkValue(languages?.place_email)
              }
              value={userName}
              onChangeText={text => setUserName(text)}
              keyboardType={'email-address'}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={() => onGetOtp()}
              maxLength={100}
              mainContainer={authStyles.mobileInput}
            />
          </View>

          <CommonButton
            title={checkValue(languages?.forgot_four)}
            onPress={() => onGetOtp()}
            containerStyle={authStyles.marginTop}
          />
        </View>
      </KeyBoardAware>
      <SpinnerSecond />
      </ImageBackground>
    </AppSafeAreaView>
  );
};

export default ForgotPassword;
