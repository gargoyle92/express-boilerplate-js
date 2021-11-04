import axios from 'axios';

export default class AxiosUtility {
  static async get(url, params, headers) {
    return await axios.get(url, { params: params, headers }).then((response) => response.data);
  }

  static async post(url, data, headers) {
    return await axios.post(url, data, { headers }).then((response) => response.data);
  }
}
