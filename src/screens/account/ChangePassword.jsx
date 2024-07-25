import React, {useRef, useState} from 'react';
import {
  AppText,
  Button,
  Input,
  SECOND,
  TEN,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import {sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {showError} from '../../helper/logger';
import {validatePassword} from '../../helper/utility';
import {changePassword} from '../../actions/accountActions';
import CommonButton from '../../common/CommonButton';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
    const [codeFocus, setCodeFocus] = useState(false);
    const [curPassFocus, setCurPassFocus] = useState(false);
    const [newPassFocus, setNewPassFocus] = useState(false);
    const [conPassFocus, setconPassFocus] = useState(false);
  const [otpText, setOtpText] = useState('Get OTP');
  const passwordInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const userData = useAppSelector(state => state.auth.userData);
  const {emailId} = userData ?? '';

  const onGetOtp = () => {
    let data = {
      email_or_phone: emailId,
      resend: true,
    };
    dispatch(sendOtp(data));
    setOtpText('Resend OTP');
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    console.log(newPassword, "newPassword")
    if (!otp) {
      showError(errorText.otp);
      return;
    }
    if(password == newPassword) {
      showError("Current Password and New Password cannot be same!");
      return;
    }
    if (!validatePassword(password)) {
      showError(errorText.oldPasswordRegex);
      return;
    }
    if (!validatePassword(newPassword)) {
      showError(errorText.passwordRegex);
      return;
    }
    if (newPassword !== confirmPassword) {
      showError(errorText.passwordMismatch);
      return;
    }
    let data = {
      new_password: newPassword,
      confirm_password: confirmPassword,
      old_password: password,
      email_or_phone: emailId,
      verification_code: otp,
    };
    dispatch(changePassword(data));
  };

  // console.log(userData, 'userData');
  return (
    <AppSafeAreaView>
      <ToolBar isSecond title={'Change Password'} />
      <KeyBoardAware>
        <View style={styles.container}>
          <Input
            title={titleText.code}
            placeholder={placeHolderText.code}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput?.current?.focus()}
            isOtp
            onfocus={() => setCodeFocus(true)}
            onBlur={() => setCodeFocus(false)}
            onSendOtp={() => onGetOtp()}
            otpText={otpText}
            containerStyle={[
              styles.inputContainer,
              {
                borderColor: !codeFocus
                  ? colors.inputBorder
                  : colors.focusedColor,
              },
            ]}
          />
          <Input
            title={titleText.password}
            placeholder={placeHolderText.password}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            assignRef={input => {
              passwordInput.current = input;
            }}
            onfocus={() => setCurPassFocus(true)}
            onBlur={() => setCurPassFocus(false)}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => newPasswordInput?.current?.focus()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            containerStyle={[
              styles.inputContainer,
              {
                borderColor: !curPassFocus
                  ? colors.inputBorder
                  : colors.focusedColor,
              },
            ]}
          />
          <Input
            title={titleText.newPassword}
            placeholder={placeHolderText.newPassword}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isNewPasswordVisible}
            assignRef={input => {
              newPasswordInput.current = input;
            }}
            onfocus={() => setNewPassFocus(true)}
            onBlur={() => setNewPassFocus(false)}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => confirmPasswordInput?.current?.focus()}
            onPressVisible={() =>
              setIsNewPasswordVisible(!isNewPasswordVisible)
            }
            containerStyle={[
              styles.inputContainer,
              {
                borderColor: !newPassFocus
                  ? colors.inputBorder
                  : colors.focusedColor,
              },
            ]}
          />
          <Input
            title={titleText.confirmPassword}
            placeholder={placeHolderText.confirmNewPassword}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isConfirmPasswordVisible}
            assignRef={input => {
              confirmPasswordInput.current = input;
            }}
            onfocus={() => setconPassFocus(true)}
            onBlur={() => setconPassFocus(false)}
            returnKeyType="done"
            isSecure
            onSubmitEditing={() => onSubmit()}
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            containerStyle={[
              styles.inputContainer,
              {
                borderColor: !conPassFocus
                  ? colors.inputBorder
                  : colors.focusedColor,
              },
            ]}
          />
        </View>
        <CommonButton
          title="Change Password"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
        <AppText type={TEN} color={SECOND} style={styles.info}>
          Changing password will delete all your active sessions.
        </AppText>
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF10",
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {marginTop: 50},
  info: {
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 5,
    backgroundColor: colors.blackFive,
    borderWidth: 0,
    fontSize: 12,
    // borderColor: colors.borderColor,
    borderWidth: borderWidth,
  },
});
