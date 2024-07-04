import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Home_BG } from "../helper/ImageAssets";

const AppBackground = ({ children, source }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" />
      <ImageBackground
        source={source ? source : Home_BG}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView
            style={styles.overlay}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AppBackground;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});
