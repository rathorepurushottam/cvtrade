import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import Typography, { FULL_WIDTH } from "./Typography";
import { AppText, BLACK, BOLD, SIXTEEN } from "./AppText";
import { colors } from "../theme/colors";
import { Screen } from "../theme/dimens";

const CommonButton = ({
  onPress,
  title = "Press Me",
  buttonStyle = {},
  containerStyle = {},
  normalButton = false,
  normalButtonStyle = {},
  disable
}) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {!normalButton ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={disable}>
          <LinearGradient
            colors={["#57934E", "#AAE9A1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, { ...buttonStyle }]}
          >
            <AppText color={BLACK} type={SIXTEEN} weight={BOLD}>
              {title}
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 50,
            alignItems: "center",
            backgroundColor:colors.red,
            justifyContent: "center",
            ...normalButtonStyle,
          }}
        >
          <AppText color={BLACK} type={SIXTEEN} weight={BOLD}>
              {title}
            </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: Screen.Width - 20,
    alignSelf: "center",
    overflow: "hidden",
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommonButton;
