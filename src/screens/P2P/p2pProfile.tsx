import React from "react";
import { View } from "react-native";
import { AppSafeAreaView, Toolbar } from "../../common";

const p2pProfile:React.FC=()=>{
    return(
    <AppSafeAreaView>
   <Toolbar isLogo={false} isSecond title="Profile"/>

    </AppSafeAreaView>
    )
}

export default p2pProfile