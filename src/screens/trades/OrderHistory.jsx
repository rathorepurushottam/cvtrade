import React, { useState } from "react";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import { BG_Two } from "../../helper/ImageAssets";
import ToolBar from "../../common/ToolBar";
import { StyleSheet, View } from "react-native";
import OpenOrders from "./OpenOrders";
import OptionContainer from "../../common/OptionContainer";
import PastOrders from "./PastOrders";
import { useRoute } from "@react-navigation/native";

const History = () => {
  const route = useRoute();
  const [option, setOption] = useState("Open Orders");

  return (
    <AppSafeAreaView source={BG_Two}>
      <ToolBar isLogo={false} isSecond title={"History"} />
      <View style={styles?.Main_Container}>
        {/* <RenderTabBarAuth
          title_1="Open Orders"
          title_2="Trade History"
          first={OpenOrders}
          second={TradeHistory}
        /> */}
        <OptionContainer
          firstTitle="Open Orders"
          secondTitle="Past Orders"
          onOptionChange={(e) => {
            setOption(e);
          }}
        />
        {option === "Open Orders" ? <OpenOrders data={route?.params}/> : <PastOrders data={route?.params}/>}
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    flex: 1,
    marginTop: 35,
  },
});

export default History;
