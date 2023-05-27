import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.yellow500,
    padding: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
    color: Colors.yellow500,
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});
