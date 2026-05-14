// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // or any other icon set
import styles from "./style";
import { deleteProfile } from "../../utils/user/profileUser";
import { clearProfileRedux } from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AlertService from "../../utils/AlterService";
import changeProfileUser from "../../utils/user/changeProfileUser";
import { setNameRedux } from "../../store/slice/profileSlice";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId, email, name } = useSelector((state) => state.profile);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(userName);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  // console.log(userId, name, email);
  const handleLogout = async () => {
    await deleteProfile();
    dispatch(clearProfileRedux());
    navigation.navigate("Login");
  };

  // Function to handle updating the name
  const handleUpdateName = async () => {
    try {
      console.log("Name value:", name);
      console.log("Input value:", inputValue);
      if (name === inputValue) {
        // console.log("Vao day ne");
        return;
      }
      const data = {
        idUser: userId,
        name: inputValue,
      };
      await changeProfileUser(data);
      dispatch(setNameRedux({ name: inputValue }));
      AlertService.showSuccessAlert("Cập nhật thành công!");
      setUserName(inputValue);
      setIsEditing(false);
    } catch (error) {
      AlertService.showErrorAlert("Có lỗi xảy ra khi cập nhật tên.");
    }
  };
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      AlertService.showErrorAlert("Mật khẩu không khớp.");
      return;
    }

    try {
      const data = { idUser: userId, newPassword };
      await changePasswordUser(data); // Implement this function in your utils
      AlertService.showSuccessAlert("Đổi mật khẩu thành công!");
      setIsChangingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      AlertService.showErrorAlert("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };
  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={100} color="#2ecc71" />

        {/* Editable name field */}

        {isEditing ? (
          <View style={styles.container_input}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
            />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.userName}> {userName}</Text>
            <Text style={styles.userEmail}>Email: {userEmail}</Text>
          </View>
        )}

        {/* Update Name Button */}
        {isEditing ? (
          <View>
            <TouchableOpacity
              style={[
                styles.updateButton,
                inputValue.trim() === userName && styles.disabledButton, // Add disabled styles
              ]}
              onPress={handleUpdateName}
              disabled={inputValue.trim() === userName}
            >
              <Text
                style={[
                  styles.updateText,
                  inputValue.trim() === userName && styles.disabledText,
                ]}
              >
                Cập nhật tên
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        )}

        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.editText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isEditing}
      >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
