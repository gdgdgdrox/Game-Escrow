const baseURL = 'http://localhost:8080/api';

export const API_URL = {
  REGISTRATION: `${baseURL}/register`,
  LOGIN: `${baseURL}/login`,
  GET_ALL_GAMES: `${baseURL}/games`,
  CREATE_TRANSACTION: `${baseURL}/createTransaction`,
  GET_ALL_TRANSACTION_BY_USER: `${baseURL}/transactions`,
  GET_TRANSACTION_BY_TRANSACTION_ID: `${baseURL}/transaction`,
  TRANSACTION_STEP2_ACCEPT_TRADE: `${baseURL}/transaction/step2`,
  TRANSACTION_STEP3_MONEY_TRANSFERRED: `${baseURL}/transaction/step3`,
};
