import React, {useRef, useState} from 'react';
import {
  AppText,
  Button,
  Input,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
} from '../../common';
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import KeyBoardAware from '../../common/KeyboardAware';
import {Platform, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {Upload_Icon, Kyc_Completed} from '../../helper/ImageAssets';
import {showError} from '../../helper/logger';
import {checkValidPanCardNumber, checkValue} from '../../helper/utility';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_FIVE_SCREEN} from '../../navigation/routes';
import ImageSelection from "../../common/ImageSelection";
import CommonButton from '../../common/CommonButton';

const KycStepThree = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const kycData = useAppSelector(state => {
    return state.account.kycData;
  })
  const [pan, setPan] = useState('');
  const [confirmPan, setConfirmPan] = useState('');
  const [panImage, setPanImage] = useState();
  const confirmPanInput = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const onNext = () => {
    if(kycData?.country != "India") {
      if(!pan) {
        showError("Please Enter Other Document No.");
        return;
      }
      if(!confirmPan) {
        showError("Please Enter Confrim Other Document No.");
        return;
      } 
      if (!panImage) {
        showError("Please Upload Document Image");
        return;
      }
      if(pan !== confirmPan) {
        showError("Other Document No. and Confrim other Document No. are not matched");
        return;
      }
    }else {
      if (!checkValidPanCardNumber(pan)) {
        showError(errorText.pan);
        return;
      }
      if (!confirmPan) {
        showError(errorText.confirmPan);
        return;
      }
      if (!panImage) {
        showError(errorText.panImage);
        return;
      }
      if(pan !== confirmPan) {
        showError("PAN Number and Confirm Pan Number are not matched");
        return;
      }
    }
   
    dispatch(setKycData({key: 'pancard_number', value: pan}));
    dispatch(setKycData({key: 'confirm_pancard_number', value: confirmPan}));
    dispatch(setKycData({key: 'pancard_image', value: panImage}));
    NavigationService.navigate(KYC_STEP_FIVE_SCREEN);
  };
  console.log(kycData?.country, "kycData");
  return (
    <AppSafeAreaView>
      <ToolBar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {kycData?.country != "India" ? "Other Document":checkValue(languages?.kyc_seven)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <Input
            title={kycData?.country != "India" ? "Other Document" : checkValue(languages?.title_pan)}
            placeholder={checkValue(languages?.place_common)}
            value={pan}
            onChangeText={text => setPan(text?.toUpperCase())}
            autoCapitalize="characters"
            returnKeyType="next"
            onSubmitEditing={() => confirmPanInput?.current?.focus()}
            maxLength={kycData?.country != "India" ? 20 : 10}
          />
          <Input
            title={kycData?.country != "India" ? "Confirm Other Document" : checkValue(languages?.title_confirmPan)}
            placeholder={checkValue(languages?.place_common)}
            value={confirmPan}
            onChangeText={text => setConfirmPan(text?.toUpperCase())}
            autoCapitalize="characters"
            assignRef={input => {
              confirmPanInput.current = input;
            }}
            returnKeyType="done"
            onSubmitEditing={() => onNext()}
            maxLength={kycData?.country != "India" ? 20 : 10}
          />
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_twelve)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => setIsVisible(true)}
            style={styles.fileContainer}>
            <FastImage
              source={panImage ? Kyc_Completed : Upload_Icon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {panImage
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
        <CommonButton
        title={checkValue(languages?.kyc_three)}
        onPress={() => onNext()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>
      
      <ImageSelection
        showModal={isVisible}
        close={() => {
          setIsVisible(false);
        }}
        selected={(e) => {
          setPanImage({
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

export default KycStepThree;
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
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: borderWidth,
    borderColor: colors.textLightGreen,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 50,
    width: 50,
  },
  gender: {
    marginTop: 15,
  },
  button: {
    marginTop: Platform.OS === "ios" ? 180  :130,
    marginHorizontal: 10
    
  },
});
