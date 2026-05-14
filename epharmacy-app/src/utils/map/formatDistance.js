const formatDistance = (distanceInMeters) => {
  const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers
  return distanceInKilometers.toLocaleString("en-US", {
    minimumFractionDigits: 2, // Show 2 decimal places
    maximumFractionDigits: 2, // Show up to 2 decimal places
  });
};

export default formatDistance;
