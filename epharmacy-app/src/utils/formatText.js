import React from "react";
import { View, Text, StyleSheet } from "react-native";

function formatText(text) {
  const lines = text.split("\n").map((line) => line.trim());

  return (
    <View>
      {lines.map((line, index) => {
        if (/^\d+\./.test(line)) {
          // If the line starts with a number, make it bold
          return (
            <Text key={index} style={[styles.text, styles.boldText]}>
              {line}
            </Text>
          );
        }
        return (
          <Text key={index} style={styles.text}>
            {line}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 8, // Space above and below each line
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default formatText;
