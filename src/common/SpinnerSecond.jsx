import React from 'react';
import {StyleSheet, View, Modal, ImageBackground, Platform} from 'react-native';
import {colors} from '../theme/colors';
import {useAppSelector} from '../store/hooks';
import { Logo } from '../helper/ImageAssets';
import LottieView from "lottie-react-native";
import { Screen } from '../theme/dimens';

const SpinnerSecond = ({loading, style}) => {
  const isLoading = useAppSelector(state => state.auth.isLoading);

  return (
    <>
      {isLoading || loading ? (
        <Modal visible={loading} transparent={true} statusBarTranslucent={true}>
        <View style={[styles.loader, style]}>
          { isLoading && (
            <ImageBackground
              source={Logo}
              style={{
                borderRadius: 100,
                height: 30,
                width: 30,
                backgroundColor:
                  Platform.OS == "android" ? "white" : "transparent",
                elevation: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              imageStyle={{
                borderRadius: 100,
              }}
            >
              <LottieView
                speed={0.5}
                source={require("../../assets/Load.json")}
                autoPlay
                loop
                style={{
                  height: 75,
                  width: 75,
                }}
              />
            </ImageBackground>
          )}
        </View>
      </Modal>): null}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: Screen.Height,
    width: Screen.Width,
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    zIndex: 1,
  },
});


export {SpinnerSecond};
