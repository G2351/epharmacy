import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GradientButton from "../../../components/GradientButton";
import { CheckBox } from "react-native-elements";
import API_APP from "../../../utils/config";
console.log("log Api : ", API_APP);

export default function RegisterScreen({ navigation }) {
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  const toggleSecureEntryConfirm = () => {
    setIsSecureConfirm(!isSecureConfirm);
  };
  const schema = yup.object().shape({
    user_name: yup.string().required("Trường này không được trống"),
    email: yup
      .string()
      .required("Trường này không được trống")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Trường này không được trống")
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
    confirm_password: yup
      .string()
      .required("Trường này không được trống")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onPressSend = async (formData) => {
    try {
      const { user_name, email, password } = formData;
      const data = { name: user_name, email, password };
      const res = await fetch(`${API_APP}/v1/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const result = await res.json();
        console.log(result.message);
        Alert.alert("Register Failed", `${result.message}`);
        return;
      }
      const result = await res.json();
      Alert.alert("Register Success", `${result.message}`);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Register Failed", `${error?.message || error}`);
      console.log(error);
    }
  };
  const handleProceed = () => {
    if (isChecked) {
      // Logic to proceed to the next screen or action
      Alert.alert(
        "Cảm ơn!",
        "Bạn đã chấp nhận các điều khoản và chính sách quyền riêng tư."
      );
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng chấp nhận các điều khoản và chính sách quyền riêng tư để tiếp tục."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_logo}>
        <Image
          source={require("../../../assets/img/logo_stand.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text_title}>Tạo Tài Khoản</Text>
      <View style={styles.container_form}>
        <View style={styles.container_input}>
          <Text>Tên</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Tên của bạn"
                style={styles.input}
              />
            )}
            name="user_name"
          />
          <View style={styles.container_error}>
            {errors.user_name && (
              <Text style={styles.text_error}>{errors.user_name.message}</Text>
            )}
          </View>
          <Text style={styles.text_label}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Email của bạn"
                style={styles.input}
              />
            )}
            name="email"
          />
          <View style={styles.container_error}>
            {errors.email && (
              <Text style={styles.text_error}>{errors.email.message}</Text>
            )}
          </View>
          <Text style={styles.text_label}>Mật khẩu</Text>
          <View style={styles.container_icon_input}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  // placeholder="Password"
                  secureTextEntry={isSecure}
                  style={styles.input}
                />
              )}
              name="password"
            />
            <View style={styles.icon_eye}>
              <TouchableOpacity onPress={toggleSecureEntry}>
                <Icon
                  name={isSecure ? "eye" : "eye-slash"}
                  size={15}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container_error}>
            {errors.password && (
              <Text style={styles.text_error}>{errors.password.message}</Text>
            )}
          </View>
          <Text style={styles.text_label}>Nhập lại mật khẩu</Text>
          <View style={styles.container_icon_input}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  // placeholder="Confirm Password"
                  secureTextEntry={isSecureConfirm}
                  style={styles.input}
                />
              )}
              name="confirm_password"
              // confirm_password
            />
            <View style={styles.icon_eye}>
              <TouchableOpacity onPress={toggleSecureEntryConfirm}>
                <Icon
                  name={isSecureConfirm ? "eye" : "eye-slash"}
                  size={15}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container_error}>
            {errors.confirm_password && (
              <Text style={styles.text_error}>
                {errors.confirm_password.message}
              </Text>
            )}
          </View>
          <View style={styles.container_check}>
            <CheckBox
              checked={isChecked}
              onPress={handleCheckBoxToggle}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
            <Pressable
              onPress={() => navigation.navigate("TermsPrivacyScreen")}
            >
              <Text>Các điều khoản{" \n"} và chính sách quyền riêng tư</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.container_btn_submit}>
          <GradientButton
            title="Đăng kí"
            onPress={handleSubmit(onPressSend)}
            // onPress={onPressSend}
          />
        </View>
        <View style={styles.container_link_register}>
          <Text>Đã tài khoản ?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text_link_register}>Đăng nhập</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
