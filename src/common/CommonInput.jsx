import React, { useState } from "react";
import {TextInput, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import { colors } from "../theme/colors";
import { EYE_OFF, Eye_Icon } from "../helper/ImageAssets";
import { AppText, BLACK, FOURTEEN, SEMI_BOLD, TWELVE } from "./AppText";
import { Screen } from "../theme/dimens";

const CommonInput = ({
  value,
  Label = "Label",
  placeholderText = "Enter Placeholder",
  placeholderTextColor = colors.white,
  inputStyle = {},
  labelStyle = {},
  mainContainer = {},
  keyboardType,
  onChangeText,
  isOtp,
  onGetOtp,
  otpText = " GET OTP",
  editable=true
}) => {
  return (
    <View style={mainContainer}>
      <AppText
        style={{ marginHorizontal: 18, marginVertical: 5, ...labelStyle }}
        type={FOURTEEN}
      >
        {Label}
      </AppText>
      <TextInput
      editable={editable}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholderText}
        style={{
          fontSize: 13,
          paddingLeft: 20,
          width: Screen.Width - 20,
          alignSelf: "center",
          height: 45,
        //   fontFamily: Font.regular,
          color: colors.white,
          backgroundColor: colors.inputBgColor,
          borderRadius: 35,
          borderWidth: 1,
          borderColor: colors.inputBorderColor,
          ...inputStyle,
        }}
      />

      {isOtp && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            padding: 8,
            width: 90,
            borderRadius: 20,
            backgroundColor: "#A383DC",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 1,
            bottom: 6,
          }}
          onPress={onGetOtp}
        >
          <AppText color={BLACK} weight={SEMI_BOLD} size={TWELVE}>
            {otpText}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonInput;

export const PasswordInput = ({
  Label = "Label",
  placeholderText = "Enter Placeholder",
  placeholderTextColor = colors.white,
  inputStyle = {},
  labelStyle = {},
  mainContainer = {},
  isEye = true,
  isOtp,
  onGetOtp,
  value,
  onChangeText,
  otpText = " GET OTP",
  keyboardType
}) => {
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={mainContainer}>
      <AppText
        style={{ marginHorizontal: 18, marginVertical: 5, ...labelStyle }}
        type={FOURTEEN}
      >
        {Label}
      </AppText>
      <View
        style={{
          flexDirection: "row",
          width: Screen.Width - 20,
          alignSelf: "center",
        }}
      >
        <TextInput
        keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholderText}
          style={{
            fontSize: 13,
            paddingLeft: 20,
            width: Screen.Width - 20,
            alignSelf: "center",
            height: 45,
            // fontFamily: Font.regular,
            color: colors.white,
            backgroundColor: colors.inputBgColor,
            borderRadius: 35,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.inputBorderColor,
            ...inputStyle,
          }}
        />
        {isEye && (
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 20,
              top: 10,
            }}
            onPress={() => {
              setSecureText(!secureText);
            }}
          >
            <Icon
              source={!secureText ? Eye_Icon : EYE_OFF}
              size={20}
              tintColor={colors.white}
              imageStyle={{}}
            />
          </TouchableOpacity>
        )}

        {isOtp && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              padding: 8,
              width: 90,
              borderRadius: 20,
              backgroundColor: "#A383DC",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 20,
              top: 6,
            }}
            onPress={onGetOtp}
          >
            <AppText
              color={colors.black}
              fontFamily={SEMI_BOLD}
              type={TWELVE}
            >
             { otpText }
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
