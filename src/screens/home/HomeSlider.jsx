import React, { useRef, useState, useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  BANNER_1,
  BANNER_2,
  BANNER_3,
  BANNER_4,
  Gift_Icon,
  NFT_Slider_Icon,
  Slider_BG_1,
  Slider_BG_2,
  Slider_BG_3,
  Slider_BG_4,
  Slider_BG_5,
} from "../../helper/ImageAssets";
import { Screen } from "../../theme/dimens";
import { colors } from "../../theme/colors";
// import Typography from "../../Common/Typography";
// import Font from "../../Common/Font";

const HomeSlider = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const BannerList = [
    {
      id: 1,
      image: BANNER_1,
    },
    
    {
      id: 2,
      image: BANNER_3,
    },
    {
      id: 3,
      image: BANNER_4,
    },
    // {
    //   id: 4,
    //   image: BANNER_2,
    // },
    
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <ImageBackground
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        >
         
        </ImageBackground>
      </View>
    );
  };

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.startAutoplay();
    }
  }, []);

  return (
    <View style={{ height: 250, alignSelf: "center", alignItems: "center" }}>
      <Carousel
        ref={ref}
        data={BannerList}
        renderItem={renderItem}
        sliderWidth={Screen?.Width}
        itemWidth={Screen?.Width}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={2500}
        loop={true}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
      />
      <Pagination
        dotsLength={BannerList.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.7}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    width: 10,
  },
  dot: {
    width: 12,
    height: 4,
    backgroundColor: "#010101",
  },
  inactiveDot: {
    width: 6,
    height: 4,
  },
  Min_Container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
  },
});

export default HomeSlider;
