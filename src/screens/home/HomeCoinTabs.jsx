import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import{
  AppText,
  BOLD,
  SIXTEEN,
  THIRTEEN,
} from "../../common/AppText";
import { colors } from "../../theme/colors";


const HomeCoinTabs = () => {
  const [activeTab, setActiveTab] = useState("spot");
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View style={styles?.Main_Container}>
      <AppText type={SIXTEEN} weight={BOLD}>
      Cryptocurrencies
      </AppText>
      <View style={styles?.Min_Container}>
      <TouchableOpacity
        style={[
          styles.Tab_Container,
          activeTab === "spot" && {
            backgroundColor: "#447F3B",
            borderColor: "#447F3B",
          },
        ]}
        onPress={() => handleTabPress("spot")}
      >
        <AppText type={THIRTEEN} color={activeTab === "spot" ? colors?.white : "#F7F7F780"}>{'Spot'}</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles?.Tab_Container,
          activeTab === "favourites" && {
            backgroundColor: "#447F3B",
            borderColor: "#447F3B",
          },
        ]}
        onPress={() => handleTabPress("favourites")}
      >
        <AppText type={THIRTEEN} color={activeTab === "favourites" ? colors?.white : "#F7F7F780"}>{'Favourites'}</AppText>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCoinTabs;

const styles = StyleSheet.create({
  Tab_Container: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF20",
  },
  Main_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Min_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '48%'
  }
});