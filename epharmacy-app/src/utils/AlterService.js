import { Alert } from "react-native";

class AlertService {
  static titleAlert = {
    success: "Thành công",
    failure: "Thất bại",
  };

  static ErrorMessages = {
    bookingAppointment: "Đặt lịch hẹn thất bại",
    workingHours:
      "Giờ làm việc:\nBuổi sáng: 8:00 - 12:00\nBuổi chiều: 13:30 - 17:30\nNgày làm việc: Thứ Hai đến Thứ Sáu",
    buyMedicines: "Mua thuốc thất bại",
  };

  static SuccessMessages = {
    bookingAppointment: "Đặt lịch hẹn thành công",
    buyMedicines: "Đặt hàng thành công",
  };

  static showSuccessAlert(message) {
    Alert.alert(this.titleAlert.success, message);
  }

  static showErrorAlert(message) {
    Alert.alert(this.titleAlert.failure, message);
  }
  static showAnyAlert(title, message) {
    Alert.alert(title, message);
  }

  // Example method to show error messages
  static showErrorAlertByType(errorType) {
    const message = this.ErrorMessages[errorType] || "Có lỗi xảy ra";
    this.showErrorAlert(message);
  }

  // Example method to show success messages
  static showSuccessMessageByType(successType) {
    const message = this.SuccessMessages[successType] || "Thành công";
    this.showSuccessAlert(message);
  }
  static showConfirmationAlert(title, message, navigation, to) {
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => navigation.navigate(to),
      },
    ]);
  }
}

export default AlertService;
