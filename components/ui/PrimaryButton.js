import { View, Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
function PrimaryButton({ children, onPressHandler }) {
  function pressHandler() {
    onPressHandler();
  }
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: Colors.primary600 }}
        onPress={pressHandler}
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.innerContainer]
            : styles.innerContainer
        }
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  outerContainer: {
    overflow: "hidden",
    borderRadius: 28,
    margin: 4,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
