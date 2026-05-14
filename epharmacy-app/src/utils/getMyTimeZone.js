const getMyTimeZone = (date) => {
  const utcDate = new Date(date.getTime()); // Get current date in UTC
  const utcPlus7 = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000); // Add 7 hours

  return utcPlus7;
};
export default getMyTimeZone;
