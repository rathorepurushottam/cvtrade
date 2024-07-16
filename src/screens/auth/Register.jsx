import React, {useEffect, useRef, useState} from 'react';
import {
  // AppSafeAreaView,
  AppText,
  Button,
  Checkbox,
  FOURTEEN,
  Input,
  SECOND,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  // Toolbar,
  WHITE,
  BELOWTEXT,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, View} from 'react-native';
import {authStyles} from './authStyles';
import {CAPTCHA_KEY, SITE_URL} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {register, sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {
  checkValue,
  validateEmail,
  validatePassword,
} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {CMS_SCREEN, LOGIN_SCREEN} from '../../navigation/routes';
import OptionContainer from '../../common/OptionContainer';
import {PickerSelect} from '../../common/PickerSelect';
import {countryCodes} from '../../helper/dummydata';
import CommonButton from '../../common/CommonButton';
import { colors } from '../../theme/colors';

const Register = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [email, setEmail] = useState('');
  const [eOtp, setEotp] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referCode, setReferCode] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [otpText, setOtpText] = useState(checkValue(languages?.register_nine));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('91');
  const [isCheck, setIsCheck] = useState(false);
  const [focusUserId, setFocusUserId] = useState(false);
  const [focusCode, setFocusCode] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [focusRePass, setFocusRePass] = useState(false);
  const [focusRefCode, setFocusRefCode] = useState(false);

  const otpInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const referCodeInput = useRef(null);
  const recaptcha = useRef();
  const [option, setOption] = useState("Email");

  // useEffect(() => {
  //   setUserName('');
  //   setOtp('');
  //   setConfirmPassword('');
  //   setPassword('');
  //   setReferCode('');
  // }, [index]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = () => {
    // if (!mobile) {
    //   showError(checkValue(languages?.error_userName));
    //   return;
    // }
    if (option === 'Email' ? !validateEmail(email) : !mobile) {
      showError(option === 'Email' ? checkValue(languages?.error_email): languages?.error_userName);
      return;
    }
    // if (!otp) {
    //   showError(checkValue(languages?.error_M_otp));
    //   return;
    // }
    if (!eOtp) {
      showError(checkValue(languages?.error_E_otp));
      return;
    }
    if (!validatePassword(password)) {
      showError(checkValue(languages?.error_passwordRegex));
      return;
    }
    if (password !== confirmPassword) {
      showError(checkValue(languages?.error_passwordMismatch));
      return;
    }
    // if (!isCheck) {
    //   showError(checkValue(languages?.error_terms));
    //   return;
    // }
    onVerify();
  };
  const onGetOtp = (addr, type) => {
    if (!addr && type === 'email') {
      showError(checkValue(languages?.error_Email));
      return;
    } else if (!addr && type === 'phone') {
      showError(checkValue(languages?.error_Phone));
      return;
    }
    let data = {
      email_or_phone: addr,
      resend: true,
      type: 'registration',
    };
    dispatch(sendOtp(data));
    setOtpText(checkValue(languages?.register_ten));
    Keyboard.dismiss();
  };

  const onLogin = () => {
    NavigationService.navigate(LOGIN_SCREEN);
  };

  const send = () => {
    recaptcha?.current?.open();
  };

  const onVerify = () => {
    let data = {
      email_or_phone: email,
      verification_code: eOtp,
      password: password,
      confirm_password: confirmPassword,
      referral_code: referCode,
    }
    console.log(data);

    dispatch(register(data));
  };

  return (
    <AppSafeAreaView>
      <ToolBar />
      <KeyBoardAware>
        <View style={authStyles.forgotContainer}>
          
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD}>
            Create an account 🌟
          
          </AppText>
          <AppText type={FOURTEEN} style={{marginTop: 3}}>
          Welcome to CV Trade! Please enter your details.
          </AppText>
          <OptionContainer 
           onOptionChange={(e) => {
          setOption(e);
        }}
        />
          {/* <RenderTabBarAuth index={index} setIndex={setIndex} /> */}
          <Input
              placeholder={option === 'Email' ? checkValue(languages?.place_login_userName) : 'Enter Mobile Number'}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType={option === 'Email' ? 'email-address' :'numeric'}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInput?.current?.focus()}
              maxLength={option === 'Email' ? 100 : 10}
              mainContainer={authStyles.mobileInput}
              onfocus={() => setFocusUserId(true)}
              onBlur={() => setFocusUserId(false)}
              containerStyle={{
                borderColor: !focusUserId
                  ? colors.inputBorder
                  : colors.focusedColor,
              }}
            />
          <Input
            placeholder={checkValue(languages?.place_otp)}
            value={eOtp}
            onChangeText={text => setEotp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput?.current?.focus()}
            assignRef={input => {
              otpInput.current = input;
            }}
            isOtp
            onSendOtp={() => onGetOtp(email, 'email')}
            otpText={otpText}
            onfocus={() => setFocusCode(true)}
            onBlur={() => setFocusCode(false)}
            containerStyle={{
              borderColor: !focusCode
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          {/* <View style={authStyles.mobileContainer}>
            {index === 0 && (
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
            )}
            <Input
              placeholder={checkValue(languages?.place_userName)}
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType={index === 0 ? 'numeric' : 'email-address'}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => otpInput?.current?.focus()}
              mainContainer={authStyles.mobileInput}
              maxLength={index === 0 ? 10 : 100}
            />
          </View> */}

          {/* <Input
            placeholder={checkValue(languages?.place_otp)}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput?.current?.focus()}
            assignRef={input => {
              otpInput.current = input;
            }}
            isOtp
            onSendOtp={() => onGetOtp(mobile, "phone")}
            otpText={otpText}
          /> */}
          <Input
            placeholder={checkValue(languages?.place_signUpPassword)}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            assignRef={input => {
              passwordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => confirmPasswordInput?.current?.focus()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            onfocus={() => setFocusPass(true)}
            onBlur={() => setFocusPass(false)}
            containerStyle={{
              borderColor: !focusPass
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          <Input
            placeholder={checkValue(languages?.place_signUPConfirmPassword)}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isConfirmPasswordVisible}
            assignRef={input => {
              confirmPasswordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => referCodeInput?.current?.focus()}
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            onfocus={() => setFocusRePass(true)}
            onBlur={() => setFocusRePass(false)}
            containerStyle={{
              borderColor: !focusRePass
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          <Input
            placeholder={checkValue(languages?.place_referCode)}
            value={referCode}
            onChangeText={text => setReferCode(text)}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            onfocus={() => setFocusRefCode(true)}
            onBlur={() => setFocusRefCode(false)}
            containerStyle={{
              borderColor: !focusRefCode
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
           <CommonButton title={languages?.register_six} onPress={() => onSubmit()} containerStyle={authStyles.marginTop}/>
        </View>
        {!isKeyboardVisible && (
          <AppText weight={SEMI_BOLD} style={authStyles.bottomTextLogin}>
            {checkValue(languages?.register_seven)}{' '}
            <AppText
              weight={SEMI_BOLD}
              color={BELOWTEXT}
              onPress={() => onLogin()}>
              {checkValue(languages?.register_eight)}
            </AppText>
          </AppText>
        )}
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Register;
