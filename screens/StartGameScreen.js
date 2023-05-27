import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import { Colors } from "../constants/colors";
import TitleText from "../components/ui/TitleText";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen({ startHandler }) {
  const [value, setValue] = useState("");

  const { width, height } = useWindowDimensions();
  const inputHandler = (inputText) => {
    setValue(inputText);
  };

  const resetInputHandler = () => {
    setValue("");
  };
  const confirmInputHandler = () => {
    const chosenNum = parseInt(value);

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      // showAlert
      Alert.alert(
        "Invalid Number",
        "Input has to be a whole number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }
    startHandler(chosenNum);
  };

  const marginTopDistance = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <TitleText>Guess My Number</TitleText>
          <Card style={styles.inputContainer}>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              value={value}
              onChangeText={inputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <PrimaryButton onPressHandler={resetInputHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.button}>
                <PrimaryButton onPressHandler={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;
// const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.yellow500,
    borderBottomWidth: 2,
    color: Colors.yellow500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 45,
    textAlign: "center",
  },
  button: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
