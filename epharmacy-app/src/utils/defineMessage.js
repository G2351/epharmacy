import { Alert } from "react-native";
const titleAlert = {
  success: "Thành công",
  failure: "Thất bại",
};
const ErrorMessages = {
  bookingAppointment: "Đặt lịch hẹn thất bại",
  workingHours:
    "Giờ làm việc:\nBuổi sáng: 8:00 - 12:00\nBuổi chiều: 13:00 - 17:00\nNgày làm việc: Thứ Hai đến Thứ Sáu",
  buyMedicines: "Mua thuốc thất bại",
};
const FailureMessages = {
  bookingAppointment: "Đặt lịch hẹn thành công",
  buyMedicines: "Đặt hàng thành công",
};
const SuccessAlert = (message) => {
  Alert.alert(titleAlert.success, message);
};

const FailureAlert = (message) => {
  Alert.alert(titleAlert.failure, message);
};
