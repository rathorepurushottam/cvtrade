import { Modal, Image, View, TouchableOpacity } from "react-native";
import { Screen } from "../theme/dimens";
import { Button } from "./Button";
import { colors } from "../theme/colors";
import { REMOVE } from "../helper/ImageAssets";
import NavigationService from "../navigation/NavigationService";
import { DEPOSIT_SCREEN, WITHDRAW_SCREEN } from "../navigation/routes";

const WalletModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      animationType="slide"
      onRequestClose={setShowModal}
      transparent
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.ButtonText,
            padding: 20,
            width: Screen.Width - 30,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Image
              source={REMOVE}
              style={{
                height: 20,
                width: 20,
                alignSelf: "flex-end",
                bottom: 12,
                left: 5,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              containerStyle={{ marginVertical: 10, width: "48%" }}
              bgColor={colors.belowText}
              isSecond={true}
            //   onPress={() => NavigationService?.navigate(DEPOSIT_SCREEN)}
            >
              Deposit
            </Button>
            <Button
              containerStyle={{ marginVertical: 10, width: "48%" }}
              bgColor={colors.linearGreen}
              isSecond={true}
            //   onPress={() => NavigationService?.navigate(WITHDRAW_SCREEN)}
            >
              Withdraw
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WalletModal;
