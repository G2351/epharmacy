import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import { deleteProfile } from "../../utils/user/profileUser";
import { clearProfileRedux, setNameRedux } from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AlertService from "../../utils/AlterService";
import changeProfileUser from "../../utils/user/changeProfileUser";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId, email, name, phone, address } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(name || "");
  const [inputPhone, setInputPhone] = useState(phone || "");
  const [inputAddress, setInputAddress] = useState(address || "");
  const navigation = useNavigation();

  const handleLogout = async () => {
    await deleteProfile();
    dispatch(clearProfileRedux());
    navigation.navigate("Login");
  };

  const handleUpdate = async () => {
    try {
      const data = {
        idUser: userId,
        name: inputName,
        phone: inputPhone,
        address: inputAddress,
      };
      await changeProfileUser(data);
      dispatch(setNameRedux({ name: inputName, phone: inputPhone, address: inputAddress }));
      AlertService.showSuccessAlert("Cập nhật thành công!");
      setIsEditing(false);
    } catch (error) {
      AlertService.showErrorAlert("Có lỗi xảy ra khi cập nhật.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={100} color="#2ecc71" />

        {isEditing ? (
          <View style={{ width: "100%", gap: 10, marginTop: 12 }}>
            <TextInput
              style={inputStyles.input}
              placeholder="Họ và tên"
              value={inputName}
              onChangeText={setInputName}
            />
            <TextInput
              style={inputStyles.input}
              placeholder="Số điện thoại"
              value={inputPhone}
              onChangeText={setInputPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={inputStyles.input}
              placeholder="Địa chỉ"
              value={inputAddress}
              onChangeText={setInputAddress}
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.updateText}>Lưu thay đổi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>Email: {email}</Text>
            {phone ? <Text style={styles.userEmail}>SĐT: {phone}</Text> : null}
            {address ? <Text style={styles.userEmail}>Địa chỉ: {address}</Text> : null}
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("ChangePassword")}>
              <Text style={styles.editText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
});

export default ProfileScreen;