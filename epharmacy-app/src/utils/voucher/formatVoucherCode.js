function formatVoucherCode(input) {
  if (input.length < 21) {
    input;
  }
  const part1 = input.slice(0, 5); // Lấy ký tự từ 1 đến 5
  const part2 = "***"; // Dấu ***
  const part3 = input.slice(input.length - 6, input.length); // Lấy ký tự từ 15 đến 21

  return part1 + part2 + part3;
}
export default formatVoucherCode;
