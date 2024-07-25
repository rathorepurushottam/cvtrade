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
import {
  AppText,
  BOLD,
  THIRTEEN,
  ELEVEN,
  TWELVE,
  FOURTEEN,
  SEMI_BOLD,
  TEN,
  SECOND,
} from "../../common";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION_BOTTOM_TAB_STACK } from "../../navigation/routes";
import { toFixedEight, toFixedThree, twoFixedTwo } from "../../helper/utility";
import { colors } from "../../theme/colors";
import FastImage from "react-native-fast-image";
import { Down_Icon, up_Icon } from "../../helper/ImageAssets";

const RenderItem = React.memo(({ item }) => {
  const currency = useAppSelector((state) => state.home.currency);
  const navigation = useNavigation();
  let url = `${BASE_URL}${item?.icon_path}`;
  return (
    <TouchableOpacity
      style={styles.Min_Container}
      onPress={() => {
        navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
          screen: "Trades",
          params: {
            coinDetail: item,
            path: "Spot",
          },
        });
      }}
    >
      <View style={styles.containerSecond}>
        <FastImage
          source={{ uri: url }}
          resizeMode="contain"
          style={styles.icon}
        />
        <View>
          <AppText>{item?.base_currency}</AppText>
          <AppText type={TEN} color={SECOND}>
            {item?.quote_currency}
          </AppText>
        </View>
      </View>
      <View style={styles.containerThird}>
        <AppText weight={SEMI_BOLD}>
          {currency} {toFixedEight(item?.buy_price)}
        </AppText>
        <AppText numberOfLines={1} color={SECOND}>
          {twoFixedTwo(item?.volume)}
        </AppText>
      </View>
      <View style={styles.containerThird}>
        <View
          style={[
            styles.bedge,
            item?.change < 0 && {
              backgroundColor: colors.red,
            },
          ]}
        >
          <FastImage
            resizeMode="contain"
            source={item?.change >= 0 ? up_Icon : Down_Icon}
            tintColor={colors.white}
            style={styles.arrow}
          />
          <AppText>{toFixedThree(item?.change)}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const RenderItems = React.memo(({ item }) => {
  return (
    <TouchableOpacity style={styles.Min_Container}>
      <View style={styles.containerSecond}>
        <View>
          <AppText>{item?.name}</AppText>
          <AppText type={TEN} color={SECOND}>
            {item?.symbol}
          </AppText>
        </View>
      </View>
      <View style={styles.containerThird}>
        <AppText weight={SEMI_BOLD}>
          {item?.name} {twoFixedTwo(item?.quote?.USD?.price)}
        </AppText>
        <AppText numberOfLines={1} color={SECOND}>
          {twoFixedTwo(item?.quote?.USD?.price)}
        </AppText>
      </View>
      <View style={styles.containerThird}>
        <View
          style={[
            styles.bedge,
            item?.change < 0 && {
              backgroundColor: colors.red,
            },
            { width: 80 },
          ]}
        >
          <FastImage
            resizeMode="contain"
            source={item?.change >= 0 ? up_Icon : Down_Icon}
            tintColor={colors.white}
            style={styles.arrow}
          />
          <AppText>
            {toFixedThree(item?.quote?.USD?.percent_change_24h)}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const MarketCoinList = ({ start, end, activeTab, setActiveTab }) => {
  const coinData = useAppSelector((state) => state.home.coinPairs);
  const favorites = useAppSelector((state) => state.home.favorites);
  const trendingList = useAppSelector((state) => state.home.trendingList);
  const gainerList = useAppSelector((state) => state.home.gainerList);
  const loserList = useAppSelector((state) => state.home.loserList);

  const renderItem = useCallback(({ item }) => {
    if (activeTab === "spot" || activeTab === "favourites") {
      return <RenderItem item={item} />;
    } else {
      return <RenderItems item={item} />;
    }
    [];
  });

  const getData = () => {
    if (activeTab === "spot") {
      return coinData?.slice(start, end);
    } else if (activeTab === "favourites") {
      return coinData?.filter((coin) =>
        favorites?.pairs?.some((dataCoin) => coin._id === dataCoin)
      );
    } else if (activeTab === "Gainer") {
      return gainerList?.slice(start, end);
    } else if (activeTab === "Loser") {
      return loserList?.slice(start, end);
    } else if (activeTab === "Trending") {
      return trendingList;
    }
  };

  return (
    <View>
      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyContainer}>
              <AppText type={FOURTEEN}>Nothing to show.</AppText>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Min_Container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF10",
    marginVertical: 5,
    borderRadius: 10,
    // opacity: 0.6
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  Change_Container: {
    borderRadius: 44,
    // backgroundColor: "#38B78133",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 35,
    opacity: 0.8,
  },
  LastPrice_Conatiner: {
    width: "33%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bedge: {
    height: 25,
    borderRadius: 5,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  arrow: {
    height: 8,
    width: 8,
    marginEnd: 5,
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: 300,
  },
  icon: {
    height: 30,
    width: 30,
    marginEnd: 10,
  },
  containerSecond: { flex: 1, flexDirection: "row" },
  containerThird: { flex: 1, alignItems: "flex-end" },
});

export default MarketCoinList;
