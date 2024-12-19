import { environment } from "../../environments/environment";

export const API_URL = {
  REGISTRATION: `${environment.apiBaseUrl}/register`,
  LOGIN: `${environment.apiBaseUrl}/login`,
  GET_ALL_GAMES: `${environment.apiBaseUrl}/games`,
  CHECK_IF_USER_EXISTS: `${environment.apiBaseUrl}/user`,
  GET_ALL_TRANSACTION_BY_USER: `${environment.apiBaseUrl}/transactions`,
  GET_TRANSACTION_BY_TRANSACTION_ID: `${environment.apiBaseUrl}/transaction`,
  TRANSACTION_STEP1_CREATE_TRANSACTION: `${environment.apiBaseUrl}/transaction/step1/createTransaction`,
  TRANSACTION_STEP2_ACCEPT_TRADE: `${environment.apiBaseUrl}/transaction/step2`,
  TRANSACTION_STEP3_MONEY_TRANSFERRED: `${environment.apiBaseUrl}/transaction/step3`,
  TRANSACTION_STEP4_BUYER_CONFIRM_ITEM_RECEIVED: `${environment.apiBaseUrl}/transaction/step4`,
  TRANSACTION_STEP4_SELLER_UPLOAD_EVIDENCE: `${environment.apiBaseUrl}/transaction/step4`,
};