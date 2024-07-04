import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText, SIXTEEN, SEMI_BOLD, FOURTEEN, BOLD,  MEDIUM } from "./AppText";
// import Button from "../../Common/Button";
// import { Colors } from "../../Theme/Colors";
// import Typography from "../../Common/Typography";
// import Font from "../../Common/Font";
// import { buttonHeight } from "../../Theme/Dimension";

const Select = ({ rbSheetRef, onSelectOption }) => {
  return (
    <View style={styles?.Main_Container}>
      <View style={styles?.Line} />
      <AppText type={SIXTEEN} style={styles?.select_one} weight={SEMI_BOLD}>
        {"Select"}
      </AppText>
      <View style={{ paddingBottom: 5, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => onSelectOption("Limit")}>
          <AppText type={FOURTEEN} weight={MEDIUM} style={styles?.Select_Item}>
            {"Limit"}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectOption("Market")}>
          <AppText type={FOURTEEN} weight={MEDIUM} style={styles?.Select_Item}>
            {"Market"}
          </AppText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => onSelectOption(Languages?.select_four)}
        >
          <Typography
            size={14}
            fontFamily={Font?.medium}
            textStyle={styles?.Select_Item}
          >
            {Languages?.select_four}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectOption(Languages?.select_five)}
        >
          <Typography
            size={14}
            textStyle={styles?.Select_Item}
            fontFamily={Font?.medium}
          >
            {Languages?.select_five}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectOption(Languages?.select_six)}>
          <Typography
            size={14}
            textStyle={styles?.Select_Item}
            fontFamily={Font?.medium}
          >
            {Languages?.select_six}
          </Typography>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => rbSheetRef?.current?.close()}
          style={styles?.ButtonContainer}
        >
          <AppText type={SIXTEEN} style={styles?.select_one} weight={BOLD}>
          Cancel
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    padding: 10,
  },
  Line: {
    width: 66,
    height: 3,
    backgroundColor: "#CAD3DD40",
    alignSelf: "center",
  },
  select_one: {
    color: "#F7F7F7",
    marginTop: 10,
    alignSelf: "center",
  },
  Select_Item: {
    color: "#F7F7F7",
    marginTop: 20,
  },
  ButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 60,
    height: 45,
    backgroundColor: "#FFFFFF14",
    marginTop: 40,
    // position:"absolute",
  },
});

export default Select;
