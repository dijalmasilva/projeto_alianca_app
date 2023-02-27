import axios from 'axios';
import {API_URL} from 'constants/url.constants';

const httpClient = (accessToken?: string) =>
  accessToken
    ? axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : axios.create({
        baseURL: API_URL,
      });

export default httpClient;
