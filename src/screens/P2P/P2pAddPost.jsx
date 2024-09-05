import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import AppSafeAreaView from '../../common/AppSafeAreaView';
import ToolBar from '../../common/ToolBar';
import { borderWidth, universalPaddingHorizontal, universalPaddingTop } from "../../theme/dimens";
import { colors } from "../../theme/colors";
import { PickerSelect } from "../../common/PickerSelect";
import KeyBoardAware from "../../common/KeyboardAware";
import { AppText, GREEN, Input, INVITETEXT, KYCDARKBLUE, ORDERTEXT, SECOND, SEMI_BOLD, SIXTEEN, TEXTCOLOR, THIRD } from "../../common";
import CommonButton from "../../common/CommonButton";
import { useAppSelector } from "../../store/hooks";

const P2pAddPost = ()=>{
    const fiatCurrencyList = useAppSelector(
        (state) => state.p2p.fiatCurrencyList
      );
      const p2pCoinList = useAppSelector((state) => state.p2p.p2pCoinList);
      const paymentMethodList = useAppSelector(
        (state) => state.p2p.paymentMethodList
      );
    //   const paymentList = Object.keys(paymentMethodList);
      const fiatList = fiatCurrencyList.map(item => ({ key: item?.short_name, label: item?.short_name }));
      const coinList = p2pCoinList.map(item => ({ key: item?.short_name, label: item?.short_name }));
    //   const paymentYTypeList = paymentList.map(item => ({ key: item, label: item }));
      const sideOptions = [
        {id: 1, label: 'Buy', value: 'Buy'},
        {id: 2, label: 'Sell', value: 'Sell'},
      ];
      const priceTypeOptions = [
        {id: 1,label: 'LIMIT', value: 'LIMIT'},
        {id: 2, label: 'FIXED', value: 'FIXED'},
      ];
      const timeOptions = [
        {id: 1, label: '5 min', value: '5 min'},
        {id: 2, label: '10 min', value: '10 min'},
        {id: 3, label: '15 min', value: '15 min'},
        {id: 4, label: '30 min', value: '30 min'},
      ];
      const paymentTypeOptions = [
        {id: 1,label: 'Select UPI', value: 'Select UPI'},
        {id: 2, label: 'Select Bank', value: 'Select Bank'},
      ];
      
      
    return(
    <AppSafeAreaView>
   <ToolBar isLogo={false} isSecond title="Add Post"/>
   <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {'Create New Post'}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} color={GREEN} >
          {'-> I want to Buy'}
        </AppText>
          <PickerSelect
            data={coinList}
            // value={country}
            // onChange={setCountry}
            placeholder={{
              label: 'Select Asset',
              value: '',
            }}
            label={'Assets'}
          />
          <PickerSelect
            data={fiatList}
            // value={kycType}
            // onChange={setKycType}
            placeholder={{
              label: 'Select Fiat',
              value: '',
            }}
            label={'Fiat Currency'}
          />
           <PickerSelect
            data={sideOptions}
            // value={kycType}
            // onChange={setKycType}
            placeholder={{
              label: 'Select Side',
              value: '',
            }}
            label={'Side'}
          />
        </View>
        <View style={[styles.container, {marginTop: 10}]}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} color={GREEN}>
          {'-> Price Settings'}
        </AppText>
          <PickerSelect
            data={priceTypeOptions}
            // value={country}
            // onChange={setCountry}
            placeholder={{
              label: 'Select Price Type',
              value: '',
            }}
            label={'Price Type'}
          />
         <Input
            title={'Price'}
            placeholder={"Enter Price"}
            containerStyle={{backgroundColor: "#FFFFFF47"}}
            returnKeyType="next"
          />
        </View>
        <View style={[styles.container, {marginTop: 10}]}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} color={GREEN}>
          {'-> Quantity'}
        </AppText>
         <Input
            title={'Quantity'}
            placeholder={"Enter Quantity"}
            containerStyle={{backgroundColor: "#FFFFFF47"}}
            returnKeyType="next"
          />
        </View>
        <View style={[styles.container, {marginTop: 10}]}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} color={GREEN}>
          {'-> Time'}
        </AppText>
        <PickerSelect
            data={timeOptions}
            // value={country}
            // onChange={setCountry}
            placeholder={{
              label: 'Select Time',
              value: '',
            }}
            label={'Time Periods'}
          />
        </View>
        <View style={[styles.container, {marginTop: 10}]}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} color={GREEN}>
          {'-> Select Payment Method'}
        </AppText>
        <PickerSelect
            data={paymentTypeOptions}
            // value={country}
            // onChange={setCountry}
            placeholder={{
              label: 'Select Payment Method',
              value: '',
            }}
            label={'Select Payment Method'}
          />
           <CommonButton
        title={'Add New Method'}
        normalButton
        // onPress={() => onNext()}
        containerStyle={[styles.button]}
        normalButtonStyle={{width: "60%", height: 45,alignSelf: "center"}}
      />
        </View>
        <CommonButton
        title={'Add Post'}
        // onPress={() => onNext()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>

    </AppSafeAreaView>
    )
}

export default P2pAddPost;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF47",
      padding: universalPaddingHorizontal,
      borderWidth: borderWidth,
      borderColor: colors.inputBorder,
      borderRadius: 10,
    },
    title: {
      marginTop: universalPaddingTop,
    },
    divider: {
      height: borderWidth,
      backgroundColor: colors.inputBorder,
      marginVertical: 15,
    },
    button: {
      marginTop: 10
    },
  });