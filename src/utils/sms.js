import request from 'request-promise-native';
import { sms as smsConfig } from '../../config';

const sendPhoneSplit = smsConfig.sendPhone.split('-');

async function sendSMSbyCafe24(target, message) {
  let result = await request.post({
    url: 'https://sslsms.cafe24.com/sms_sender.php',
    formData: {
      user_id: smsConfig.userId,
      secure: smsConfig.secureKey,
      testflag: smsConfig.testFlag,
      sphone1: sendPhoneSplit[0],
      sphone2: sendPhoneSplit[1],
      sphone3: sendPhoneSplit[2],
      rphone: target,
      msg: message,
      nointeractive: '1',
      mode: '1',
    },
  });

  return result;
}

export { sendSMSbyCafe24 };
