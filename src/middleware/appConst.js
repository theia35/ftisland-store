const appConst = {
  ENV: 'production',
  PARSE_API_CLASS_URL: 'https://parse-api-store.lollipop.camera/lollipop-store/class/',
  PARSE_API_URL: 'https://parse-api-store.lollipop.camera/lollipop-store/functions/',
  PARSE_APP_ID: 'NPzVQhktpuvxIE8UohO2Om0J28eborPHbhA1kT7f',
  PARSE_API_KEY: 'bHCcZdPW2ScBdcDNfZXruqhwIvQyLvqc5YPurJkW',
  UPLOAD_API_URL: 'https://parse-api.lollipop.camera:443/parse/functions/',
  UPLOAD_API_ID: 'WVxA1yrfGc8Jx9xNLyb0dX9005CI7cIThUFPSglD',
};
if (process.env.NODE_ENV === 'development') {
  appConst.ENV = 'sandbox';
  appConst.PARSE_API_CLASS_URL = 'https://store-test.lollipop.camera/lollipop-store/class/';
  appConst.PARSE_API_URL = 'https://store-test.lollipop.camera/lollipop-store/functions/';
}

export default appConst;
