import React from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import formatText from "../../utils/formatText";
import styles from "./style";
export default function ArticlesDetailsScreen({ route }) {
  const { articles } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{articles.title}</Text>
        <Text style={styles.description}>{articles.description}</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>
          {Platform.OS === "ios"
            ? formatText(articles.content)
            : articles.content}
        </Text>
      </ScrollView>
    </View>
  );
}
