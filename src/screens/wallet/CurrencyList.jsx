import { ImageBackground, StyleSheet, View } from "react-native";
import {
  AppText,
  FOURTEEN,
  MEDIUM,
  SearchInput,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
} from "../../common";
import AppSafeAreaView from "../../common/AppSafeAreaView";
import { BG_Two, Home_BG } from "../../helper/ImageAssets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { Screen, universalPaddingHorizontalHigh } from "../../theme/dimens";
import { checkValue, twoFixedTwo } from "../../helper/utility";
import { languages } from "../../helper/languages";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "../../helper/Constants";
import KeyBoardAware from "../../common/KeyboardAware";
import { getCoinDetails } from "../../actions/walletActions";
import { useRoute } from "@react-navigation/native";
import { changePassword } from "../../actions/accountActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import ToolBar from "../../common/ToolBar";

const CurrencyList = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const type = route?.params?.type;
  const userWallet = useAppSelector((state) => {
    return state.wallet.userWallet;
  });

  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, [value]);

  const getData = () => {
    if (value === "") {
      setList(userWallet);
    } else {
      let filterData = userWallet?.filter((data) => {
        return (
          data?.short_name?.toLowerCase().indexOf(value?.toLowerCase()) > -1 ||
          data?.short_name?.toLowerCase().indexOf(value?.toLowerCase()) > -1
        );
      });
      setList(filterData);
    }
  };

  const onNavigate = (id, balance) => {
    let data = {
      currency_id: id,
    };
    dispatch(getCoinDetails(data, type, balance));
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item?._id}
        style={styles.Min_Container}
        onPress={() => onNavigate(item?.currency_id, item?.balance)}
      >
        <View style={styles.coinContainer}>
          <FastImage
            resizeMode="contain"
            style={styles.coinLogo}
            source={{ uri: `${BASE_URL}${item?.image_path}` }}
          />
          <View style={{ flex: 1 }}>
            <AppText weight={MEDIUM} type={FOURTEEN}>
              {item.short_name}
            </AppText>
            <AppText color={SECOND}>{item.currency}</AppText>
          </View>
          <AppText weight={MEDIUM} type={FOURTEEN}>
            {twoFixedTwo(item?.balance)}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppSafeAreaView source={BG_Two}>
       <ToolBar isLogo={false} isSecond title={type} />
        <SearchInput
          cancelBtn={true}
          value={value}
          onChangeText={setValue}
          placeholder={"Search Currency"}
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={() => getData()}
          onFocus={true}
          //   containerStyle={{paddingTop: Platform.OS === 'ios' ? 25 : 0}}
          //   inputStyle={{paddingHorizontal: Platform.OS === 'ios' ? 5 : 0}}
        />
        <KeyBoardAware>
          <AppText weight={SEMI_BOLD} type={SIXTEEN} style={styles.text}>
            {checkValue(languages?.top_search)}
          </AppText>
          {list?.map((item, index) => {
            return renderItem({ item, index });
          })}
        </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default CurrencyList;

const styles = StyleSheet.create({
  imgBg: {
    width: Screen.Width,
    height: Screen.Height,
  },
  text: {
    marginVertical: universalPaddingHorizontalHigh,
  },
  coinContainer: {
    flexDirection: "row",
    // marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  coinLogo: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    marginEnd: 10,
  },
  Min_Container: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF10",
    marginVertical: 5,
    borderRadius: 10,
    // opacity: 0.6
  },
});
