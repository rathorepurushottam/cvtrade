// import React from 'react';
// import { Image, StyleSheet, View } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import { useAppSelector } from '../../store/hooks';
// import TouchableOpacityView from '../../common/TouchableOpacityView';
// import { AppText, FOURTEEN, SECOND, SEMI_BOLD, TEN } from '../../common';
// import { toFixedEight, toFixedThree, twoFixedTwo } from '../../helper/utility';
// import { useNavigation } from '@react-navigation/native';
// import { NAVIGATION_BOTTOM_TAB_STACK, NAVIGATION_TRADE_STACK, TRADE_SCREEN } from '../../navigation/routes';
// import { BASE_URL } from '../../helper/Constants';
// import { CoinCardProps } from '../../helper/types';
// import { colors } from '../../theme/colors';
// import { downIcon, upIcon } from '../../helper/ImageAssets';

// interface MarketCoinListProps {
//   activeTab: string;
//   activeTabList: any;
// }
// export const ListEmptyComponent = () => {
//   return (
//     <View style={styles.emptyContainer}>
//       <AppText type={FOURTEEN}>Nothing to show.</AppText>
//     </View>
//   );
// };
// export const RenderItem = ({ item, currency }: CoinCardProps) => {
//   let url = `${BASE_URL}${item?.icon_path}`;
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacityView
//       style={styles.container}
//       onPress={() =>
//        navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
//           screen: NAVIGATION_TRADE_STACK,
//           params: {
//             screen:TRADE_SCREEN,
//             params: {
//                coinDetail: item,
//                path: "Spot"
//             },
//           },
//         })
//       }>
//       <View style={styles.containerSecond}>
//         <FastImage
//           source={{ uri: url }}
//           resizeMode="contain"
//           style={styles.icon}
//         />
//         <View>
//           <AppText>{item?.base_currency}</AppText>
//           <AppText type={TEN} color={SECOND}>
//             {item?.quote_currency}
//           </AppText>
//         </View>
//       </View>
//       <View style={styles.containerThird}>
//         <AppText weight={SEMI_BOLD}>
//           {currency} {toFixedEight(item?.buy_price)}
//         </AppText>
//         <AppText numberOfLines={1} color={SECOND}>
//           {twoFixedTwo(item?.volume)}
//         </AppText>
//       </View>
//       <View style={styles.containerThird}>
//         <View
//           style={[
//             styles.bedge,
//             item?.change < 0 && {
//               backgroundColor: colors.red,
//             },
//           ]}>
//           <FastImage
//             resizeMode="contain"
//             source={item?.change >= 0 ? upIcon : downIcon}
//             tintColor={colors.white}
//             style={styles.arrow}
//           />
//           <AppText>{toFixedThree(item?.change)}</AppText>
//         </View>
//       </View>
//     </TouchableOpacityView>
//   );
// };
// const MarketCoinList = ({ activeTab, activeTabList }: MarketCoinListProps) => {
//   const coinData = useAppSelector(state => state.home.coinPairs);
//   const currency = useAppSelector(state => state.home.currency);
//   const favorites = useAppSelector(state => state.home.favorites);

//   const handleData = () => {
//     if (activeTabList === 0) {
//       return coinData;
//     }
//     if (activeTabList === 1) {
//       return coinData?.filter(coin => favorites?.pairs?.some((dataCoin: any) => coin._id === dataCoin));
//     }
//   };

//   const getData = () => {
//     if (activeTab === 'ALL') {
//       return handleData();
//     } else {
//       return handleData()?.filter(coin => coin.quote_currency === activeTab);
//     }
//   };

//   // console.log(coinData, "coinData");

//   return getData()?.length !== 0 ? (
//     getData()?.map(item => {
//       return <View key={item?._id} style={{}}>{RenderItem({ item , currency})}</View>

//     })
//   ) : (
//     <ListEmptyComponent />
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   bedge: {
//     height: 25,
//     borderRadius: 5,
//     backgroundColor: colors.green,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//   },
//   arrow: {
//     height: 8,
//     width: 8,
//     marginEnd: 5,
//     marginBottom: 2,
//   },
//   emptyContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 300,
//   },
//   icon: {
//     height: 30,
//     width: 30,
//     marginEnd: 10,
//   },
//   containerSecond: { flex: 1, flexDirection: 'row' },
//   containerThird: { flex: 1, alignItems: 'flex-end' },
// });
// export default MarketCoinList;
import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../../helper/Constants";
import { useAppSelector } from "../../store/hooks";
import { AppText, BOLD, THIRTEEN, ELEVEN, TWELVE } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION_BOTTOM_TAB_STACK } from "../../navigation/routes";

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.Min_Container}
      onPress={() => {
        navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
          screen: "Market",
          params: {
            coinDetail: item,
            path: "Spot",
          },
        });
      }}
    >
      <View style={{ flexDirection: "row", width: "33%" }}>
        <Image
          source={{ uri: `${BASE_URL}${item?.icon_path}` }}
          resizeMode="contain"
          style={styles?.icon}
        />
        <AppText weight={BOLD} type={THIRTEEN} style={{ marginLeft: 10 }}>
          {item?.base_currency}
          {"\n"}
          <AppText type={ELEVEN} style={{ color: "gray" }}>
            {item?.quote_currency}
          </AppText>
        </AppText>
      </View>
      <View style={styles.LastPrice_Conatiner}>
        <AppText type={ELEVEN} style={{ color: "gray" }}>
          {item?.buy_price} {"\n"}
          <AppText type={ELEVEN} style={{ color: "gray" }}>
            {item?.LastPrice_2}
          </AppText>
        </AppText>
      </View>
      <View style={styles?.Change_Container}>
        <AppText type={TWELVE} weight={BOLD}>
          {item?.change_24hour}
        </AppText>
      </View>
    </TouchableOpacity>
  );
});

const MarketCoinList = () => {
  const coinData = useAppSelector((state) => state.home.coinPairs);

  const renderItem = useCallback(({ item }) => <RenderItem item={item} />, []);

  return (
    <View>
      <FlatList
        data={coinData}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Min_Container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  Change_Container: {
    borderRadius: 44,
    backgroundColor: "#38B78133",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 35,
  },
  LastPrice_Conatiner: {
    width: "33%",
  },
});

export default MarketCoinList;
