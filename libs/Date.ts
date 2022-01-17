import { leftPad } from "./Commons";

export function today() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${leftPad(month)}-${leftPad(date)}`;
}

export function traslateInternationalAge(age: Date) {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  const internationalAge = nowYear - age.getFullYear();

  if (
    nowMonth > age.getMonth() ||
    (nowMonth === age.getMonth() && nowDate >= age.getDate())
  ) {
    return internationalAge;
  }

  return internationalAge - 1;
}
