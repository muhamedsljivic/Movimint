export function isEmail(value) {
  return value.includes("@");
}

export function isEmpty(value) {
  return value.trim() === "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
