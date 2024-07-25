import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText, BOLD, SIXTEEN, THIRTEEN } from "../../common/AppText";
import { colors } from "../../theme/colors";

const HomeCoinTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles?.Main_Container}>
      {/* <AppText type={SIXTEEN} weight={BOLD}>
      Cryptocurrencies
      </AppText> */}
      <View style={styles?.Min_Container}>
        <TouchableOpacity
          style={[
            styles.Tab_Container,
            activeTab === "spot" && {
              backgroundColor: "#447F3B",
              borderColor: "#447F3B",
            },
          ]}
          onPress={() => setActiveTab("spot")}
        >
          <AppText
            type={THIRTEEN}
            color={activeTab === "spot" ? colors?.white : "#F7F7F780"}
          >
            {"Spot"}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles?.Tab_Container,
            activeTab === "favourites" && {
              backgroundColor: "#447F3B",
              borderColor: "#447F3B",
            },
          ]}
          onPress={() => setActiveTab("favourites")}
        >
          <AppText
            type={THIRTEEN}
            color={activeTab === "favourites" ? colors?.white : "#F7F7F780"}
          >
            {"Favourites"}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles?.Tab_Container,
            activeTab === "Gainer" && {
              backgroundColor: "#447F3B",
              borderColor: "#447F3B",
            },
          ]}
          onPress={() => setActiveTab("Gainer")}
        >
          <AppText
            type={THIRTEEN}
            color={activeTab === "Gainer" ? colors?.white : "#F7F7F780"}
          >
            {"Top Gainer"}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles?.Tab_Container,
            activeTab === "Loser" && {
              backgroundColor: "#447F3B",
              borderColor: "#447F3B",
            },
          ]}
          onPress={() => setActiveTab("Loser")}
        >
          <AppText
            type={THIRTEEN}
            color={activeTab === "Loser" ? colors?.white : "#F7F7F780"}
          >
            {"Top Loser"}
          </AppText>
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
    // marginVertical: 20
    // marginLeft: 4
    marginHorizontal: 3,
  },
  Main_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    paddingVertical: 10,
    // borderRadius: 10,
    // backgroundColor: "#FFFFFF10",
  },
  Min_Container: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // width: '48%',
    // marginRight: 20,
    // backgroundColor: 'red'
  },
});
