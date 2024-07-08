import React from "react";
import { View, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { openCamera, openPicker } from "react-native-image-crop-picker";
import {
  CAMERA,
  DOWN_ARROW_IMG,
  Down_Icon,
  GALLARY,
  REMOVE,
} from "../helper/ImageAssets";
import SimpleToast from "react-native-simple-toast";
import { colors } from "../theme/colors";
import { AppText, BOLD, TWELVE } from "./AppText";
// import Typography from "./Typography";
// import Font from "./Font";

const ImageSelection = ({
  multiple = false,
  showModal,
  close = () => {},
  selected = () => {},
  mediaType = "photo",
}) => {
  const onCamera = async () => {
    try {
      const response = await openCamera({
        mediaType: mediaType,
        width: 500,
        height: 500,
        cropping: mediaType !== "video",
      });

      await selected(response, "camera");
      close();
    } catch (err) {
      console.error("Error:", err);
      if (err.code === "E_PERMISSION_MISSING") {
        SimpleToast.show(
          "Camera access is required for this feature. Please grant permission."
        );
      }
      close();
    }
  };

  const OpenPicker = async () => {
    try {
      const response = await openPicker({
        mediaType: mediaType,
        width: 500,
        height: 500,
        cropping: mediaType !== "video",
        multiple: multiple,
      });

      await selected(response, "gallery");
      close();
    } catch (err) {
      console.error("Error:", err);
      close();
    }
  };

  return (
    <Modal
      statusBarTranslucent
      onRequestClose={() => close()}
      transparent={true}
      visible={showModal}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{
            height: "50%",
            width: "100%",
            backgroundColor: "transparent",
          }}
          onPress={() => close()}
        />
        <View style={styles.bottomModal}>
          <View style={styles.modalShowSection}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => close()}
            >
              <Image
                source={REMOVE}
                style={{ height: 20, width: 20, tintColor: colors?.golden }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
            <View style={styles.modalView}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.checkView}
                  onPress={() => {
                    onCamera();
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      resizeMode: "contain",
                    }}
                    source={CAMERA}
                  />
                </TouchableOpacity>
                <AppText
                  style={{ marginTop: 2,textAlign: "center" }}
                  weight={BOLD}
                  size={TWELVE}
                  color={colors.black}
                >
                  Open Camera
                </AppText>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.checkView} onPress={OpenPicker}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      height: 40,
                      width: 40,
                      tintColor: colors.gray,
                    }}
                    source={GALLARY}
                  />
                </TouchableOpacity>
                <AppText
                  style={{ marginTop: 2, textAlign: "center" }}
                  weight={BOLD}
                  size={TWELVE}
                  color={colors.black} 
                >
                  Open library
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    height: "50%",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    paddingBottom: 30,
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderRadius: 10,
    alignItems: "center",
  },
  modalShowSection: {
    width: "90%",
    backgroundColor: colors.white,
    flexWrap: "wrap",
    borderRadius: 8,
  },
  checkView: {
    width: "45%",
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default ImageSelection;
