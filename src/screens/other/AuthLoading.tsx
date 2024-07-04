import React, { useEffect } from "react";
import { View } from "react-native";
import NavigationService from "../../navigation/NavigationService";
import { NAVIGATION_AUTH_STACK } from "../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SELECTED_LANGUAGE, USER_TOKEN_KEY } from "../../helper/Constants";
import { commonStyles } from "../../theme/commonStyles";
import { useAppDispatch } from "../../store/hooks";
import { Splash_Screen } from "../../helper/ImageAssets";
import  AppSafeAreaView  from "../../common/AppSafeAreaView";
import { getUserProfile } from "../../actions/accountActions";
import { translate } from "google-translate-api-x";
import { languages } from "../../helper/languages";
import { setLanguages, setSelectedLanguage } from "../../slices/accountSlice";

const AuthLoading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkUserLogin();
    checkLanguage();
  }, []);

  const success = () => {
    setTimeout(() => {
      dispatch(getUserProfile(false, true));
    }, 3000);
  };
  const onnFail = () => {
    setTimeout(() => {
      NavigationService.reset(NAVIGATION_AUTH_STACK);
    }, 2000);
  };
  const checkUserLogin = async () => {
    try {
      const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      customerToken ? success() : onnFail();
    } catch (e) {
      console.log(e);
    }
  };
  const checkLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem(SELECTED_LANGUAGE);
      if (language) {
        const res = await translate(languages, {
          from: "en",
          to: language,
        });
        dispatch(setLanguages(res));
        dispatch(setSelectedLanguage(language));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppSafeAreaView source={Splash_Screen}>
      <View style={commonStyles.center}></View>
    </AppSafeAreaView>
  );
};

export default AuthLoading;
