// ChangePasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as yup from "yup";
import { useSelector } from "react-redux";
import AlertService from "../utils/AlterService";
import { useForm, Controller } from "react-hook-form";
import changeProfileUser from "../utils/user/changeProfileUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { scaleHeight, scaleWidth } from "../utils/config";
const ChangePasswordScreen = ({ navigation }) => {
  const { userId } = useSelector((state) => state.profile);
  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Trường này không được trống"),
    password: yup
      .string()
      .required("Trường này không được trống")
      .min(8, "Ít nhất 8 kí tự"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });
  const handleChangePassword = async (formData) => {
    try {
      const data = { idUser: userId, ...formData };
      console.log(data);
      const dataResponse = await changeProfileUser(data);
      if (dataResponse.status === 401) {
        throw new Error(dataResponse.message);
      }
      AlertService.showSuccessAlert("Đổi mật khẩu thành công!");
      navigation.goBack();
    } catch (error) {
      AlertService.showErrorAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Mật khẩu cũ"
              style={styles.input}
            />
          )}
          name="oldPassword"
        />
        <View style={styles.container_error}>
          {errors.oldPassword && (
            <Text style={styles.text_error}>{errors.oldPassword.message}</Text>
          )}
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Mật khẩu mới"
              style={styles.input}
            />
          )}
          name="password"
        />
        <View style={styles.container_error}>
          {errors.password && (
            <Text style={styles.text_error}>{errors.password.message}</Text>
          )}
        </View>
        {/* end yup  */}
      </View>
      <View style={styles.container_button}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleSubmit(handleChangePassword)}
        >
          <Text style={styles.updateText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={navigation.goBack}
        >
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scaleWidth,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  title: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20 * scaleHeight,
  },
  container_button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8 * scaleWidth,
    padding: 10 * scaleWidth,
    marginVertical: 10 * scaleHeight,
    fontSize: 16 * scaleWidth,
    color: "#333",
  },
  updateButton: {
    width: "50%",
    backgroundColor: "#2ecc71",
    paddingVertical: 12 * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    borderRadius: 8 * scaleWidth,
    alignItems: "center",
    marginTop: 20 * scaleHeight,
    alignSelf: "center",
  },
  updateText: {
    color: "#fff",
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "30%",
    backgroundColor: "red",
    paddingVertical: 12 * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    borderRadius: 8 * scaleWidth,
    alignItems: "center",
    marginTop: 20 * scaleHeight,
    alignSelf: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
  },
  container_error: {
    paddingLeft: 20 * scaleWidth,
    height: 20 * scaleHeight,
  },
  text_error: {
    color: "red",
  },
});

export default ChangePasswordScreen;
