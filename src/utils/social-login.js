import request from 'request-promise-native';

import { FacebookSignIn } from '@coolgk/facebook-sign-in';
import { googleConfig, facebookConfig } from '../../config';

const facebookSignIn = new FacebookSignIn({
  clientId: facebookConfig.clientId,
  secret: facebookConfig.secret,
});

async function verifyGoogle(authCode) {
  console.log(authCode);
  try {
    var authData = await request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      formData: {
        client_id: googleConfig.clientId,
        client_secret: googleConfig.clientSecret,
        grant_type: 'authorization_code',
        code: authCode,
      },
    });

    authData = authData && JSON.parse(authData);
    let result = await request({
      method: 'POST',
      uri: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
      },
    });
    result = result && JSON.parse(result);
    return result.sub != null && { id: result.sub };
  } catch (err) {
    throw 'InvalidAuth';
  }
}

async function verifyFacebook(authCode) {
  return await facebookSignIn.verify(authCode);
}

export default async function verify3rdParty(type, data) {
  switch (type) {
    case 'google':
      return await verifyGoogle(data);
    case 'facebook':
      return await verifyFacebook(data);
  }
  return false;
}
