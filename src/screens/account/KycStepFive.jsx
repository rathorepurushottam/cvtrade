import React, {useState} from 'react';
import {
  AppText,
  Button,
  FOURTEEN,
  GREEN,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  YELLOW,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {Upload_Icon, Kyc_Completed} from '../../helper/ImageAssets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {commonStyles} from '../../theme/commonStyles';
import {showError} from '../../helper/logger';
import {errorText} from '../../helper/Constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {kycVerification} from '../../actions/accountActions';
import {checkValue} from '../../helper/utility';
import CommonButton from '../../common/CommonButton';
import ImageSelection from "../../common/ImageSelection";

const KycStepFive = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const userData = useAppSelector(state => state.auth.userData);
  const kycData = useAppSelector(state => state.account.kycData);
  const [selfie, setSelfie] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = () => {
    if (!selfie) {
      showError(errorText?.selfie);
      return;
    }

    var formData = new FormData();
    formData.append("document_front_image",  kycData?.document_front_image);
    formData.append("document_back_image",  kycData?.document_back_image);
    formData.append("user_selfie", selfie);
    formData.append("pancard_image", kycData?.pancard_image);
    formData.append("address",  kycData?.address);
    formData.append("city", kycData?.city);
    formData.append("state",  kycData?.state);
    formData.append("country", kycData?.country);
    formData.append("document_number", kycData?.document_number);
    formData.append("pancard_number",  kycData?.pancard_number?.toUpperCase());
    formData.append("confirm_pancard_number", kycData?.confirm_pancard_number?.toUpperCase());
    formData.append("dob",  kycData?.dob?.split('-')?.reverse()?.join("-"));
    formData.append("zip_code", kycData?.zip_code);
    formData.append("first_name", kycData?.first_name);
    formData.append("middle_name", kycData?.middle_name);
    formData.append("last_name", kycData?.last_name);
    formData.append("kyc_type",  kycData?.kyc_type);
    formData.append("gender", kycData?.gender);
    formData.append("emailId", kycData?.emailId);
    formData.append("eotp", parseInt(kycData?.emailOtp));  
    formData.append("document_type", kycData?.document_type);
    console.log('data::::::::', formData);
    dispatch(kycVerification(formData));
  };

  return (
    <AppSafeAreaView>
      <ToolBar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_sixteen)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_seventeen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={selfie ? Kyc_Completed : Upload_Icon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {selfie
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
        <View style={{marginTop: 10}}>
        <AppText style={commonStyles.centerText} type={FOURTEEN} color={GREEN}>
          {checkValue(languages?.kyc_eighteen)}
        </AppText>
        <AppText style={commonStyles.centerText}>
          {checkValue(languages?.kyc_nineteen)}
          {'\n'}
          {checkValue(languages?.kyc_twenty)}
        </AppText>
      </View>
      <CommonButton
        title={'Submit'}
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>
      
      <ImageSelection
        showModal={isVisible}
        close={() => {
          setIsVisible(false);
        }}
        selected={(e) => {
          setSelfie({
            type: e?.mime,
            uri: e?.path,
            name: e?.path || "image_name",
          })
          // console.log(e, "===e===");
        }}
        
        
      />
    </AppSafeAreaView>
  );
};

export default KycStepFive;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  title: {
    marginTop: universalPaddingTop,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.inputBorder,
    marginVertical: 15,
  },
  gender: {
    marginTop: 15,
  },
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: borderWidth,
    borderColor: colors.textGreen,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 50,
    width: 50,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
