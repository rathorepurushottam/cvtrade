import React, { useEffect } from "react";
import { View } from "react-native";
import { AppText, MEDIUM, TWELVE, WHITE } from "./AppText";

const SpaceBetweenView = ({
  firstText,
  secondText,
  Firststyle,
  secondStyle,
  containerStyle={}
}) => {
  return (
    <View
      style={{
        width: "95%",
        padding: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: 5,
        paddingHorizontal: 25,
        alignItems: "center",
        marginTop:10,
        ...containerStyle
      }}
    >
      <AppText type={TWELVE} weight={MEDIUM} color={WHITE} style={Firststyle}>
        {firstText}
      </AppText>

      <AppText type={TWELVE} weight={MEDIUM} color={WHITE} style={Firststyle}>
        {secondText}
      </AppText>
    
    </View>
  );
};

export default SpaceBetweenView;
