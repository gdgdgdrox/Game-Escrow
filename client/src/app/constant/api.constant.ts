const baseURL = 'http://localhost:8080/api';

export const API_URL = {
  REGISTRATION: `${baseURL}/register`,
  LOGIN: `${baseURL}/login`,
  GET_ALL_GAMES: `${baseURL}/games`,
  CHECK_IF_USER_EXISTS: `${baseURL}/user`,
  TRANSACTION_STEP1_CREATE_TRANSACTION: `${baseURL}/transaction/step1/createTransaction`,
  GET_ALL_TRANSACTION_BY_USER: `${baseURL}/transactions`,
  GET_TRANSACTION_BY_TRANSACTION_ID: `${baseURL}/transaction`,
  TRANSACTION_STEP2_ACCEPT_TRADE: `${baseURL}/transaction/step2`,
  TRANSACTION_STEP3_MONEY_TRANSFERRED: `${baseURL}/transaction/step3`,
  TRANSACTION_STEP4_BUYER_CONFIRM_ITEM_RECEIVED: `${baseURL}/transaction/step4`,
  TRANSACTION_STEP4_SELLER_UPLOAD_EVIDENCE: `${baseURL}/transaction/step4`
};
