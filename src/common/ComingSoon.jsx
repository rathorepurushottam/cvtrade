import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import AppBackground from "../common/AppBackground";
import ToolBar from "../common/ToolBar";
import LottieView from "lottie-react-native";

const ComingSoon = ({ navigation }) => {
  const ref = useRef();

  return (
    <AppBackground>
      <ToolBar isThird={false} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <LottieView
            ref={ref}
            source={require('../../assets/Coming1.json')}
            autoPlay
            loop
            style={{ width:300, height: 300, }}
          />
      </View>
    </AppBackground>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({});
