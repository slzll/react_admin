export const isUndefined = value => typeof value == 'undefined';
export const API_URL = "/api";
export const API_URL_ADMIN = "/api/admin";
export { post, get } from './fetch'
export const greetingText = () => {
  let welcomeTime = '';
  const hour = new Date().getHours();
  if (0 <= hour && hour <= 6) {
    welcomeTime = "凌晨好！";
  } else if (7 <= hour && hour <= 11) {
    welcomeTime = "早上好！";
  } else if (hour == 12) {
    welcomeTime = "中午好！";
  } else if (13 <= hour && hour <= 17) {
    welcomeTime = "下午好！";
  } else if (hour == 18) {
    welcomeTime = "傍晚好！";
  } else if (19 <= hour && hour <= 24) {
    welcomeTime = "晚上好！";
  }
  return welcomeTime;
}
