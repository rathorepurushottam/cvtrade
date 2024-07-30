import React, { useEffect, useRef, useState } from "react";
import NavigationService from "../../navigation/NavigationService";
import {
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
} from "../../navigation/routes";
import {
  AppText,
  BLUE,
  FOURTEEN,
  Input,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  WHITE,
  YELLOW,
} from "../../common";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import { Logo } from "../../helper/ImageAssets";
import { Keyboard, Platform, View } from "react-native";
import { authStyles } from "./authStyles";
import KeyBoardAware from "../../common/KeyboardAware";
import { showError } from "../../helper/logger";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import { login } from "../../actions/authActions";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import { checkValue, validateEmail } from "../../helper/utility";
import { Screen } from "../../theme/dimens";
import FastImage from "react-native-fast-image";
import CommonButton from "../../common/CommonButton";
import OptionContainer from "../../common/OptionContainer";
import { colors } from "../../theme/colors";
export const RenderTabBarAuth = (props) => {
  const languages = useAppSelector((state) => {
    return state.account.languages;
  });
  const routes = [
    { key: "first", title: checkValue(languages?.mobile) },
    { key: "second", title: checkValue(languages?.email) },
  ];
  return (
    <View style={authStyles.tabBarMain}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacityView
            key={i}
            onPress={() => props?.setIndex(i)}
            style={
              i === props?.index
                ? authStyles.tabBarActive
                : authStyles.tabBarInActive
            }
          >
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              color={i === props?.index ? YELLOW : WHITE}
            >
              {route.title}
            </AppText>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};

const Login = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => {
    return state.account.languages;
  });
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const passwordInputRef = useRef(null);
  const [getfoucs, setFoucs] = useState(false);
  const [getfoucsPass, setFoucsPass] = useState(false);
  const [option, setOption] = useState("Email");

  const recaptcha = useRef();

  useEffect(() => {
    setUserName("");
    setPassword("");
  }, [index]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onLogin = () => {
    console.log(userName.includes("@"), "typeof");
    // if(userName.includes('@')) {
    //   console.log(!validateEmail(userName), "validateEmail");
    //   if(!validateEmail(userName)) {
    //     showError(checkValue(languages?.error_email));
    //       return;
    //   }
    // }else {
    //   showError(checkValue(languages?.error_userName));
    //   return;
    // }
    if (!userName) {
      showError(checkValue(languages?.error_userName_value));
      return;
    }
    if (userName.includes("@")) {
      console.log(!validateEmail(userName), "validateEmail");
      if (!validateEmail(userName)) {
        showError(checkValue(languages?.error_email));
        return;
      }
    }
    // else {
    //   showError(checkValue(languages?.error_userName));
    //   return;
    // }
    // if (!userName) {
    //   showError(checkValue(languages?.error_userName));
    //   return;
    // }
    // if (index === 1 && !validateEmail(userName)) {
    //   showError(checkValue(languages?.error_email));
    //   return;
    // }
    if (!password) {
      showError(checkValue(languages?.error_password));
      return;
    }
    Keyboard.dismiss();
    // console.log('Verify');
    // send();
    onVerify();
  };
  const onRegister = () => {
    NavigationService.navigate(REGISTER_SCREEN);
  };
  const onForgot = async () => {
    NavigationService.navigate(FORGOT_PASSWORD_SCREEN);
  };

  const send = () => {
    recaptcha?.current?.open();
  };

  const onVerify = (token) => {
    let data = {
      email_or_phone: userName,
      password: password,
      // token: token,
    };

    dispatch(login(data));
  };


  return (
    <AppSafeAreaView>
      {/* <ToolBar isLogo={false} isLogin={true}/> */}
      <KeyBoardAware>
        <View
          style={[
            authStyles.welcomeSecondContainer2,
            {
              marginTop:
                Platform.OS === "ios" ? Screen.Height / 2.8 : Screen.Height / 4,
              // marginTop: getfoucs ? Screen.Height / 3.5 :getfoucsPass ? Screen.Height / 4: Screen.Height / 2.5,
            },
          ]}
        >
          <FastImage
            source={Logo}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginBottom: 80,
            }}
          />

          <AppText type={TWENTY}>
            {checkValue(languages?.login_one)}
            {"\n"}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={BLUE}>
              {checkValue(languages?.login_two)}
            </AppText>
          </AppText>

          <AppText type={FOURTEEN}>
            {checkValue(languages?.login_three)}
          </AppText>
          {/* <RenderTabBarAuth index={index} setIndex={setIndex} />
           */}
          {/* <OptionContainer
            onOptionChange={(e) => {
              setOption(e);
              setPassword("");
              setUserName("");
            }}
          /> */}
          <View style={[authStyles.mobileContainer, authStyles.marginUp]}>
            <Input
              placeholder={
                option === "Email"
                  ? checkValue(languages?.place_login_userName)
                  : "Enter Mobile Number"
              }
              value={userName}
              onChangeText={(text) => setUserName(text)}
              keyboardType={option === "Email" ? "email-address" : "numeric"}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef?.current?.focus()}
              maxLength={option === "Email" ? 100 : 10}
              mainContainer={authStyles.mobileInput}
              onfocus={() => setFoucs(true)}
              onBlur={() => setFoucs(false)}
              containerStyle={{
                borderColor: !getfoucs
                  ? colors.inputBorder
                  : colors.focusedColor,
              }}
            />
          </View>
          <Input
            placeholder={checkValue(languages?.place_password)}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
            isSecure={true}
            onSubmitEditing={() => onLogin()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            onfocus={() => setFoucsPass(true)}
            onBlur={() => setFoucsPass(false)}
            containerStyle={{
              borderColor: !getfoucsPass
                ? colors.inputBorder
                : colors.focusedColor,
            }}
          />
          <AppText onPress={() => onForgot()} style={authStyles.forgotText}>
            {checkValue(languages?.login_seven)}
          </AppText>
          <View style={authStyles.forgotText}></View>
          <CommonButton
            title={languages?.login_four}
            onPress={() => onLogin()}
          />
        </View>
        {!isKeyboardVisible && (
          <AppText weight={SEMI_BOLD} style={authStyles.bottomTextLogin}>
            {checkValue(languages?.login_five)}{" "}
            <AppText
              weight={SEMI_BOLD}
              color={BLUE}
              onPress={() => onRegister()}
            >
              {checkValue(languages?.login_six)}
            </AppText>
          </AppText>
        )}
      </KeyBoardAware>

      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Login;
