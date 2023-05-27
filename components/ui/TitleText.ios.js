import { Text, StyleSheet, Platform } from "react-native";
function TitleText({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default TitleText;
const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
  },
});
