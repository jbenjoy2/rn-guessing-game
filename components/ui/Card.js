import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 16,
    marginTop: width < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    backgroundColor: Colors.primary800,
  },
});
