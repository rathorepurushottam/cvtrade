import React, {useState ,useEffect } from 'react';
import { AppText, MEDIUM, THIRTEEN } from '../../common';
import AppSafeAreaView from "../../common/AppSafeAreaView"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ScrollView,  View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import HomeSlider from './HomeSlider';
import CoinSlider from './CoinSlider';
import CoinList from './CoinList';
import NewsSection from './NewsSection';
import { connect } from 'socket.io-client';
import {
  setCoinData,
  setRandom,
  setSocket,
  setSocketLoading,
} from '../../slices/homeSlice';
import { BASE_URL } from '../../helper/Constants';
import { getBannerList, getCoinList, getFavorites, getNotificationList, getTrending, getGainerList } from '../../actions/homeActions';
import { getAdminBankDetails, getTradeHistory, getUserPortfolio, getUserWallet, getWalletHistory } from '../../actions/walletActions';
import {augBanner, Search_Icon, Notification_Icon, Logo} from '../../helper/ImageAssets';
import { colors } from '../../theme/colors';
import { Screen } from '../../theme/dimens';
import { useNavigation } from '@react-navigation/native';
import { NOTIFICATION_SCREEN, SEARCH_SCREEN } from '../../navigation/routes';
import FastImage from 'react-native-fast-image';

// Create a socket instance and ensure correct connection options
const socket = connect(BASE_URL, {
  transports: ['websocket'],
  forceNew: true,
  autoConnect: true,
});

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userData = useAppSelector(state => {
    return state.auth.userData;
  });
  const loading = useAppSelector(state => {
    return state.auth.isLoading;
  });
  useEffect(() => {
    // Handle socket connection
    const handleSocketConnect = () => {
      console.log('Connected to socket server');
      dispatch(setSocket(socket)); 
      dispatch(setRandom(Math.random()));
    };

    socket.on('connect', handleSocketConnect);

    return () => {
      socket.off('connect', handleSocketConnect); 
    };
  }, []);

  useEffect(() => {
    // Emit a message to the socket every 5 seconds
    socket.emit('message', { message: 'market' });
    const intervalId = setInterval(() => {
      socket.emit('message', { message: 'market' });
      // console.log('Emitting message to market');
    }, 5000); // 5000 ms for 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {                                                                     
    // Handle incoming socket messages
    const handleSocketMessage = (res) => {
      // console.log(':', res); 
      dispatch(setCoinData(res)); // Update Redux state with received data
      dispatch(setSocketLoading(false)); // Change loading state
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    // Handle socket disconnection
    const handleSocketDisconnect = () => {
      console.log('Disconnected from socket server');
    };

    socket.on('disconnect', handleSocketDisconnect);

    return () => {
      socket.off('disconnect', handleSocketDisconnect); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    // Dispatch Redux actions to initialize data
    dispatch(getBannerList());
    dispatch(getCoinList());
    dispatch(getUserPortfolio());
    dispatch(getUserWallet());
    dispatch(getAdminBankDetails());
    dispatch(getTradeHistory());
    dispatch(getWalletHistory());
    dispatch(getFavorites());
    dispatch(getNotificationList());
    // dispatch(getTrending());
    dispatch(getGainerList());
  }, []);

  return (
    <AppSafeAreaView  barStyle={"dark-content"}>
      <ScrollView>
        <HomeSlider />
        <View style={[styles.Main_Container, { width: Screen.Width }]}>
        <TouchableOpacity style={styles?.icon_Container}>
              <Image
                source={Logo}
                resizeMode="contain"
                style={styles.Common_Icon}
              />
            </TouchableOpacity>
          <TouchableOpacity
            style={styles?.Search_Container}
            onPress={() => navigation.navigate(SEARCH_SCREEN)}
          >
            <Image
              source={Search_Icon}
              resizeMode="contain"
              style={[styles.Common_Icon, { marginLeft: 15 }]}
            />
            <AppText type={THIRTEEN} color={colors.black} style={{ marginLeft: 10 }} weight={MEDIUM}>Search</AppText>
          </TouchableOpacity>
          <View style={styles.Min_Container}>
            <TouchableOpacity style={styles?.Common_Container}  onPress={() => navigation.navigate(NOTIFICATION_SCREEN)}>
              <Image
                source={Notification_Icon}
                resizeMode="contain"
                style={styles.Common_Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <NewsSection />
        <View style={{width: Screen.Width-40, height: 120, alignSelf: "center"}}>
          <FastImage source={augBanner} resizeMode='stretch' style={{width: Screen.Width-40, height: 120}}/>

        </View>
        <CoinSlider />
        <CoinList />
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Main_Container: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    position: "absolute",
    width: "100%",
  },
  Search_Container: {
    // width: 184,
    width: "65%",
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FFFFFF47",
    alignItems: "center",
    flexDirection: "row",
  },
  Common_Container: {
    width: 35,
    height: 35,
    backgroundColor: "#FFFFFF47",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_Container: {
    width: 35,
    height: 35,
    backgroundColor: "#FFFFFF47",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 8,
  },
  Common_Icon: {
    width: 18,
    height: 18,
    // tintColor: colors.black,
  },
  Min_Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "35%",
    marginLeft: 22
  },
});
