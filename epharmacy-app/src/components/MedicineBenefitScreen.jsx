import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/config";
const MedicineBenefitScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Lợi ích của việc sử dụng thuốc theo chỉ định của bác sĩ
      </Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.benefitText}>
          1. Đảm bảo điều trị đúng cách: Việc tuân thủ chỉ định của bác sĩ đảm
          bảo rằng bạn đang sử dụng đúng loại thuốc với liều lượng chính xác,
          điều này rất quan trọng để điều trị hiệu quả tình trạng của bạn.
        </Text>
        <Text style={styles.benefitText}>
          2. Giảm nguy cơ tác dụng phụ: Bác sĩ có thể điều chỉnh thuốc phù hợp
          với nhu cầu sức khỏe cụ thể của bạn, giảm nguy cơ phản ứng bất lợi.
        </Text>
        <Text style={styles.benefitText}>
          3. Tránh tương tác thuốc: Bác sĩ biết được các tương tác thuốc có thể
          xảy ra và sẽ kê đơn các loại thuốc hoạt động an toàn cùng nhau.
        </Text>
        <Text style={styles.benefitText}>
          4. Theo dõi tiến trình của bạn: Các cuộc hẹn định kỳ với bác sĩ cho
          phép họ theo dõi tiến trình của bạn và điều chỉnh điều trị khi cần
          thiết.
        </Text>
        <Text style={styles.benefitText}>
          5. Ngăn ngừa lạm dụng hoặc sử dụng sai: Sử dụng thuốc theo chỉ định
          giúp ngăn ngừa việc lạm dụng hoặc sử dụng quá mức thuốc, điều này có
          thể dẫn đến các vấn đề sức khỏe nghiêm trọng.
        </Text>
      </ScrollView>

      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scaleWidth,
    backgroundColor: "#eaeaea",
  },
  title: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 20 * scaleHeight,
    textAlign: "center",
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
    paddingBottom: 10 * scaleHeight,
  },
  scrollContainer: {
    marginBottom: 10 * scaleHeight,
  },
  benefitText: {
    fontSize: 16 * scaleWidth,
    marginBottom: 15 * scaleHeight,
    color: "#444",
    lineHeight: 24 * scaleWidth,
    padding: 10 * scaleWidth,
    backgroundColor: "#fff",
    borderRadius: 8 * scaleWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  container_btn_back: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 8 * scaleWidth,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 5 * scaleHeight,
    padding: 10 * scaleWidth,
    backgroundColor: "#007bff",
    borderRadius: 8 * scaleWidth,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16 * scaleWidth,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MedicineBenefitScreen;
