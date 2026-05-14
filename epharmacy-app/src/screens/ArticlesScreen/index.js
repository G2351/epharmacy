import React, { useState, useEffect } from "react";
import { scaleWidth } from "../../utils/config";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import styles from "./style";
import fetchArticles from "../../utils/articles/fetchArticles";
import ItemArticles from "../../components/ItemArticles";
const ArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    fetchArticles(setArticles, setLoading);
  }, []);

  const renderArticle = ({ item }) => (
    <ItemArticles item={item} navigation={navigation} />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Bài viết</Text>
      <View style={styles.containerList}>
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderArticle}
        />
      </View>
    </View>
  );
};

export default ArticlesScreen;
