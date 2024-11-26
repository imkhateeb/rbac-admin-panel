function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+\d{8,15}$/;
  return phoneRegex.test(phoneNumber);
}

export default isValidPhoneNumber;
