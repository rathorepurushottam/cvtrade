// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React, { useState } from "react";
//import react in our code.
import { View,StyleSheet } from "react-native";
//import all the components we are going to use.
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import TouchableOpacityView from "./TouchableOpacityView";
import FastImage from "react-native-fast-image";
import { menuIcon } from "../helper/ImageAssets";
import { fontFamilyMedium } from "../theme/typography";
import { colors } from "../theme/colors";
import { borderWidth } from "../theme/dimens";
import NavigationService from "../navigation/NavigationService";
import { DEPOSIT_SCREEN, WITHDRAW_SCREEN } from "../navigation/routes";
import { getCoinDetails } from "../actions/walletActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
//import menu and menu item

const CustomMaterialMenu = ({ walletDetail }) => {
  const dispatch = useAppDispatch();
  const coinDetails = useAppSelector((state) => {
    return state.wallet.coinDetails;
  });
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
 
  const onDeposit = async () => {
    let data = {
      currency_id: walletDetail?.currency_id,
    };
    await dispatch(getCoinDetails(data));
    hideMenu();
    NavigationService.navigate(DEPOSIT_SCREEN, { walletDetail: coinDetails });
  };
  const onWidthDraw = async () => {
    let data = {
      currency_id: walletDetail?.currency_id,
    };
    await dispatch(getCoinDetails(data));
    hideMenu();
    NavigationService.navigate(WITHDRAW_SCREEN, { walletDetail: coinDetails });
  };
  console.log(walletDetail, "walletdetails");
  return (
    <View>
      <Menu
        visible={visible}
        style={styles.menu}
        anchor={
          <TouchableOpacityView
            onPress={showMenu}
            style={styles.menuIconContainer}
          >
            <FastImage
              source={menuIcon}
              resizeMode="contain"
              style={styles.menuIcon}
            />
          </TouchableOpacityView>
        }
        onRequestClose={hideMenu}
      >
        <MenuDivider color={colors.secondBorder} />

        <MenuDivider color={colors.secondBorder} />
        <MenuItem textStyle={styles.menuItem} onPress={() => onDeposit()}>
          Deposit
        </MenuItem>
        <MenuDivider color={colors.secondBorder} />
        <MenuItem textStyle={styles.menuItem} onPress={() => onWidthDraw()}>
          Withdraw
        </MenuItem>
        <MenuDivider color={colors.secondBorder} />
      </Menu>
    </View>
  );
};

export { CustomMaterialMenu };
const styles = StyleSheet.create({
  menuIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    width: 20,
  },
  menuIcon: {
    height: 15,
    width: 15,
  },
  menuItem: {
    fontFamily: fontFamilyMedium,
    fontSize: 12,
    color: colors.black,
  },
  menu: {
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    // backgroundColor: colors.inputBackground,
  },
});
