import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import {
  BG_Two,
  Back_Icon,
  Profile_Image,
  SelectImage_Icon,
} from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import { colors } from "../../theme/colors";
import AppBackground from "../../common/AppBackground";
import CommonInput from "../../common/CommonInput";
// import Font from "../../Common/Font";
import CommonButton from "../../common/CommonButton";
import ImageSelection from "../../common/ImageSelection";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../helper/Constants";
import { showError } from "../../helper/logger";
import { editUserProfile } from "../../actions/accountActions";
import { checkValue } from "../../helper/utility";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { sendOtp } from "../../actions/authActions";

const EditProfile = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [isVisible, setIsVisible] = useState(false);
  const [photo, setPhoto] = useState();
  const [email, setEmail] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const userData = useAppSelector((state) => state.auth.userData);
  const languages = useAppSelector((state) => {
    return state.account.languages;
  });
  const [otpText, setOtpText] = useState(checkValue(languages?.register_nine));
  const {
    firstName: _firstName,
    lastName: _lastName,
    mobileNumber,
    profilepicture,
    emailId,
  } = userData ?? "";

  useEffect(() => {
    if (_firstName) {
      setFirstName(_firstName);
    }
    if (_lastName) {
      setLastName(_lastName);
    }
    if (mobileNumber) {
      setPhone(mobileNumber);
    }
    if (emailId) {
      setEmail(emailId);
    }
  }, []);

  const onSubmit = () => {
    if (!firstName) {
      showError(checkValue(languages?.error_firstName));
      return;
    }
    if (!lastName) {
      showError(checkValue(languages?.error_lastName));
      return;
    }
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("mobileNumber", phone || "");
    data.append("emailId", emailId || "");
    if (!mobileNumber) {
      data.append("motp", phoneOtp);
    }
    if (photo) {
      data?.append("profilepicture", photo);
    }
    dispatch(editUserProfile(data));
  };

  const onGetOtpEmail = () => {
    let data = {
      email_or_phone: email,
      resend: true,
      type: "registration",
    };
    dispatch(sendOtp(data));
    setOtpText(checkValue(languages?.register_ten));
    Keyboard.dismiss();
  };

  const onGetOtpPhone = () => {
    if (!phone) {
      showError(checkValue(languages?.error_Phone));
      return;
    }
    let data = {
      email_or_phone: phone,
      resend: true,
      type: "registration",
    };
    dispatch(sendOtp(data));
    setOtpText(checkValue(languages?.register_ten));
    Keyboard.dismiss();
  };

  console.log(userData, "profileImage");
  return (
    <AppBackground source={BG_Two}>
      {/* <Loader loading={loading} /> */}
      <ToolBar isLogo={false} isSecond title={"Edit Profile"} />
      <ImageSelection
        showModal={visible}
        close={() => {
          setVisible(false);
        }}
        selected={(e) => {
          setProfileImage({
            type: e?.mime,
            uri: e?.path,
            name: e?.path || "image_name",
          });
          // console.log(e, "===e===");
        }}
      />
      <View style={styles?.Main_Container}>
        <TouchableOpacity
          style={styles?.Image_Container}
          onPress={() => {
            setVisible(true);
          }}
        >
          <Image
            source={
              profileImage
                ? { uri: profileImage?.uri }
                : profilepicture
                ? { uri: `${BASE_URL}${profilepicture}` }
                : Profile_Image
            }
            resizeMode="contain"
            style={styles?.Profile_Image}
          />
          <View style={styles.editimg}>
            <Image
              source={SelectImage_Icon}
              resizeMode="contain"
              style={styles?.SelectImage_Icon}
            />
          </View>
        </TouchableOpacity>
        <CommonInput
          value={firstName}
          onChangeText={setFirstName}
          labelStyle={{ marginHorizontal: 0 }}
          Label="First Name"
          placeholderText="First Name"
          mainContainer={{ marginVertical: 5 }}
          inputStyle={{ backgroundColor: null }}
        />
        <CommonInput
          value={lastName}
          onChangeText={setLastName}
          mainContainer={{ marginVertical: 5 }}
          labelStyle={{ marginHorizontal: 0 }}
          Label="Last Name"
          placeholderText="Last Name"
          inputStyle={{ backgroundColor: null }}
        />
        <CommonInput
          mainContainer={{ marginVertical: 5 }}
          labelStyle={{ marginHorizontal: 0 }}
          Label="Email Address"
          value={email}
          editable={!userData?.emailId || otpText == "Resend"}
          onChangeText={setEmail}
          keyboardType={"email-address"}
          placeholderText="Email Address"
          inputStyle={{ backgroundColor: null }}
        />
        <CommonInput
          keyboardType={"number-pad"}
          Label=" Mobile Number"
          value={phone}
          editable={!userData?.mobileNumber || otpText == "Resend"}
          onChangeText={setPhone}
          placeholderText="Enter Mobile Number"
          mainContainer={{ marginVertical: 5 }}
          labelStyle={{ marginHorizontal: 0 }}
          inputStyle={{ backgroundColor: null }}
        />

        {!mobileNumber && (
          <CommonInput
            mainContainer={{ marginVertical: 5 }}
            labelStyle={{ marginHorizontal: 0 }}
            Label="Enter Verification Code"
            keyboardType={"email-address"}
            placeholderText="Verification Code"
            onGetOtp={onGetOtpPhone}
            isOtp
            value={phoneOtp}
            onChangeText={setPhoneOtp}
            otpText={otpText}
            inputStyle={{ backgroundColor: null }}
          />
        )}
      </View>
      <CommonButton
        title="Submit"
        onPress={() => {
          onSubmit();
        }}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  countryPicker: {
    height: 45,
    width: "25%",
    backgroundColor: null,
    color: colors.white,
  },
  phoneTextInput: {
    fontSize: 13,
    paddingLeft: 20,
    width: "73%",
    alignSelf: "center",
    height: 45,
    // fontFamily: Font.regular,
    color: colors.white,
    backgroundColor: null,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
  },
  phoneText: {
    marginLeft: 18,
    marginVertical: 5,
  },
  phoneContain: {
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  Profile_Image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  SelectImage_Icon: {
    width: 25,
    height: 25,
  },
  editimg: {
    width: 26,
    height: 26,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#233023",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  Image_Container: {
    width: 88,
  },
  Main_Container: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  Account_Details: {
    marginTop: 10,
  },
  phone_Input: {
    marginLeft: 10,
    width: "66%",
  },
  ContainerStyle: {
    width: "100%",
    position: "absolute",
    bottom: 5,
    marginHorizontal: 20,
  },
});

export default EditProfile;
