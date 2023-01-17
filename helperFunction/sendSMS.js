import axios from "axios";

module.exports = sendOTP;

async function sendOTP(to, otp) {
  console.log('in send OTP', to, otp);
  let username = 'flitte';
  let pass = 'fli45tte';
  let senderid = 'FLITTE';
  let templateid = '1707167368050450593';
  return axios.get(`http://173.45.76.227/send.aspx?username=${username}&pass=${pass}&route=trans1&senderid=${senderid}&numbers=${to}&message=WG-${otp} is the OTP to login into White Glove Virtual Survey Engine. Please use this OTP to proceed. Thanks FLITTE LOGISTICS&templateid=${templateid}`);


}