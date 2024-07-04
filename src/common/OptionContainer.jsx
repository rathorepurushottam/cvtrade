import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppText, BLACK, BOLD, SIXTEEN, WHITE } from "./AppText";
import { Screen } from "../theme/dimens";

const OptionContainer = ({
    onOptionChange = () => {},
    firstTitle = "Email",
    secondTitle = "Phone",
  }) => {
    const [selectedOption, setSelectedOption] = useState(firstTitle);
    const handleOptionPress = (option) => {
      onOptionChange(option);
      setSelectedOption(option);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress(firstTitle)}
        >
          <LinearGradient
            colors={
              selectedOption === firstTitle
                ? ["#57934E", "#AAE9A1"]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          >
            <AppText type={SIXTEEN} weight={BOLD} color={selectedOption === firstTitle ? BLACK : WHITE}>{firstTitle}</AppText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress(secondTitle)}
        >
          <LinearGradient
            colors={
              selectedOption === secondTitle
                ? ["#57934E", "#AAE9A1"]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          >
            <AppText type={SIXTEEN} weight={BOLD} color={selectedOption === secondTitle ? BLACK : WHITE}>{secondTitle}</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

export default OptionContainer;

const styles = StyleSheet.create({
    container: {
      width: Screen.Width - 40,
      alignSelf: "center",
      padding: 5,
      backgroundColor: "#303030",
      marginVertical: 10,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    optionButton: {
      backgroundColor: "transparent",
      borderRadius: 50,
      flex: 1,
      height: 40,
    },
    selectedOptionButton: {
      backgroundColor: "transparent",
      borderRadius: 50,
      flex: 1,
      height: 40,
    },
    gradientBackground: {
      flex: 1,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      height: 40,
    },
  });

  export const MarketOptionContainer = ({
    onOptionChange = () => {},
    firstTitle = "Buy ETH",
    secondTitle = "Sell ETH",
  }) => {
    const [selectedOption, setSelectedOption] = useState("Buy ETH");
    const handleOptionPress = (option) => {
      onOptionChange(option);
      setSelectedOption(option);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress("Buy ETH")}
        >
          <LinearGradient
            colors={
              selectedOption === "Buy ETH"
                ? ["#57934E", "#AAE9A1"]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          >
            {/* <Typography
              size={16}
              fontFamily={Font.bold}
              textStyle={{
                color: selectedOption === "Buy ETH" ? "black" : "white",
              }}
            >
              {firstTitle}
            </Typography> */}
            <AppText type={SIXTEEN} weight={BOLD} color={selectedOption === "Buy ETH" ? "black" : "white"}>{firstTitle}</AppText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress("Sell ETH")}
        >
          <LinearGradient
            colors={
              selectedOption === "Sell ETH"
                ? ["#EB4335", "#EB4335"]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          >
            {/* <Typography size={16} fontFamily={Font.bold}>
              {secondTitle}
            </Typography> */}
            <AppText type={SIXTEEN} weight={BOLD}>{secondTitle}</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };