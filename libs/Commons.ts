export const leftPad = (value: number | string) => {
  if (value >= 10) {
    return value;
  }
  return "0" + value;
};
