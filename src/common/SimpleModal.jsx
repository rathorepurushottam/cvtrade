import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Animated,
    Modal,
    Touchable,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from "react-native";
  import React from "react";
  import { colors } from "../theme/colors";

  
  const SimpleModal = ({
    visible = false,
    close = () => {},
    children,
    backgroundColor = colors.white,
    style,
    mainView = {},
  }) => {
    return (
      <Modal
        transparent
        statusBarTranslucent={true}
        animationType="none"
        visible={visible}
      >
        <TouchableOpacity
          onPress={close}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
            ...mainView,
          }}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.animateView,
              { backgroundColor: backgroundColor },
              { ...style },
            ]}
          >
            <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default SimpleModal;
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "#00000090",
      justifyContent: "center",
      alignItems: "center",
    },
    animateView: {
      width: "90%",
      padding: 20,
      borderRadius: 10,
    },
  });
  