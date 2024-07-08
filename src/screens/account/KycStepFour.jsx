import React, {useState} from 'react';
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
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {PickerSelect} from '../../common/PickerSelect';
import {documentType, documentType2} from '../../helper/dummydata';
import {errorText, titleText} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {Upload_Icon, Kyc_Completed} from '../../helper/ImageAssets';
import {showError} from '../../helper/logger';
import {
  checkValidAdharCardNumber,
  checkValidDrivingLicenseNumber,
  checkValue,
  setAadharNumber,
} from '../../helper/utility';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_THREE_SCREEN} from '../../navigation/routes';
import CommonButton from '../../common/CommonButton';
import ImageSelection from "../../common/ImageSelection";

const KycStepFour = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const kycData = useAppSelector(state => {
    return state.account.kycData;
  });
  const [docType, setDocType] = useState(kycData?.country != "India" ? "Document No.":'Aadhaar');
  const [docNumber, setDocNumber] = useState('');
  const [_docNumber, _setDocNumber] = useState('');
  const [docFront, setDocFront] = useState();
  const [docBack, setDocBack] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isFront, setIsFront] = useState(true);

  const onNext = () => {
    if (!docType) {
      showError(errorText.docType);
      return;
    }

    if (!checkValidAdharCardNumber(docNumber) && docType === 'Aadhaar') {
      showError(errorText.aadhar);
      return;
    }
    if (
      !checkValidDrivingLicenseNumber(docNumber) &&
      docType === 'Driving License'
    ) {
      showError(errorText.license);
      return;
    }
    if (!docNumber) {
      showError(errorText.docNumber);
      return;
    }
    if (!docFront) {
      showError(errorText.docFront);
      return;
    }
    if (!docBack) {
      showError(errorText.docBack);
      return;
    }
    dispatch(setKycData({key: 'document_type', value: docType}));
    dispatch(setKycData({key: 'document_number', value: _docNumber}));
    dispatch(setKycData({key: 'document_front_image', value: docFront}));
    dispatch(setKycData({key: 'document_back_image', value: docBack}));
    NavigationService.navigate(KYC_STEP_THREE_SCREEN);
  };
  return (
    <AppSafeAreaView>
      <ToolBar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_thirteen)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <PickerSelect
            data={kycData?.country != "India" ? documentType2:documentType}
            value={docType}
            onChange={setDocType}
            placeholder={{
              label: checkValue(languages?.place_docType),
              value: '',
            }}
            label={titleText.docType}
          />
          <Input
            title={`${docType}*`}
            keyboardType={docType === "Aadhaar" ? 'numeric' : 'default'}
            placeholder={checkValue(languages?.place_common)}
            value={docNumber}
            onChangeText={text => {
              if (docType === 'Aadhaar') {
                setDocNumber(setAadharNumber(text));
                _setDocNumber(text?.replace(/\s+/g, ''));
              } else {
                setDocNumber(text)?.toUpperCase();
                _setDocNumber(text?.trim());
              }
            }}
            autoCapitalize="none"
            returnKeyType="done"
          />
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_fourteen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
              setIsFront(true);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={docFront ? Kyc_Completed : Upload_Icon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {docFront
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_fifteen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
              setIsFront(false);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={docBack ? Kyc_Completed : Upload_Icon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {docBack
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
      {/* <PictureModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onPressGallery={() => {
          onPressGallery();
        }}
        onPressCamera={() => {
          onPressCamera();
        }}
      /> */}
      <ImageSelection
        showModal={isVisible}
        close={() => {
          setIsVisible(false);
        }}
        selected={(e) => {
          // setProfileImage({
          //   type: e?.mime,
          //   uri: e?.path,
          //   name: e?.path || "image_name",
          // });
          isFront ? setDocFront({
            type: e?.mime,
            uri: e?.path,
            name: e?.path || "image_name",
          }) : setDocBack({
            type: e?.mime,
            uri: e?.path,
            name: e?.path || "image_name",
          });
          // console.log(e, "===e===");
        }}
        
        
      />
    </AppSafeAreaView>
  );
};

export default KycStepFour;
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
    borderColor: colors.textLightGreen,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 50,
    width: 50,
  },
  button: {
    marginVertical: universalPaddingHorizontalHigh,
  },
});
