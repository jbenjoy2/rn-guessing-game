import {
  View,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import TitleText from "../components/ui/TitleText";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;
function GameScreen({ chosenNum, onGameOver, setRoundHandler }) {
  const initialGuess = generateRandomBetween(1, 100, chosenNum);
  const [computerGuess, setComputerGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height, scale, fontScale } = useWindowDimensions();

  useEffect(() => {
    if (computerGuess === chosenNum) {
      onGameOver();
      setRoundHandler(guessRounds.length);
    }
  }, [chosenNum, computerGuess, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && computerGuess < chosenNum) ||
      (direction === "higher" && computerGuess > chosenNum)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      max = computerGuess;
    } else {
      min = computerGuess + 1;
    }
    const newGuess = generateRandomBetween(min, max, computerGuess);
    setComputerGuess(newGuess);
    setGuessRounds((currentRounds) => [...currentRounds, newGuess]);
  };

  let content = (
    <>
      <NumberContainer>{computerGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        {/* buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressHandler={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressHandler={nextGuessHandler.bind(this, "higher")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressHandler={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{computerGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressHandler={nextGuessHandler.bind(this, "higher")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((round) => (
          <Text key={round}>{round}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem roundNum={itemData.index + 1} guess={itemData.item} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
