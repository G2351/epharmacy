import React from "react";
import { Pressable, Text, StyleSheet, Image, View } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ItemArticles({ item, navigation }) {
  return (
    <Pressable
      style={styles.articleItem}
      onPress={() => navigation.navigate("ArticlesDetails", { articles: item })}
    >
      <View style={styles.containerImg}>
        <Image
          source={{ uri: item.image }}
          style={styles.articleImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  articleItem: {
    flexDirection: "row",
    padding: 10 * scaleWidth,
    marginVertical: 10 * scaleHeight,
    backgroundColor: "#fff",
    borderRadius: 10 * scaleWidth,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  articleImage: {
    width: 80 * scaleWidth,
    height: 80 * scaleHeight,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  articleTitle: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4 * scaleHeight,
  },
  articleDescription: {
    fontSize: 14 * scaleWidth,
    color: "#666",
  },
});
