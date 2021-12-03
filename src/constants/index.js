export const ACCESS_TOKEN = "accessToken";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL

// Google
export const API_BASE_URL_GOOGLE = "https://accounts.google.com/o/oauth2/v2/auth?"
export const OAUTH2_REDIRECT_URI_GOOGLE = "http://localhost:3000/oauth/callback/google";
export const CLIENT_ID_GOOGLE = process.env.REACT_APP_GOOGLE_CID
export const GOOGLE_AUTH_URL = API_BASE_URL_GOOGLE + "scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&response_type=code&client_id=" + CLIENT_ID_GOOGLE + "&redirect_uri=" + OAUTH2_REDIRECT_URI_GOOGLE;

// Kakao
export const OAUTH2_REDIRECT_URI_KAKAO = "http://localhost:3000/oauth/callback/kakao";
export const CLIENT_ID_KAKAO = process.env.REACT_APP_KAKAO_CID;
export const API_BASE_URL_KAKAO = "https://kauth.kakao.com/oauth/authorize?";
export const KAKAO_AUTH_URL = API_BASE_URL_KAKAO + "response_type=code&client_id=" + CLIENT_ID_KAKAO + "&redirect_uri=" + OAUTH2_REDIRECT_URI_KAKAO;

// Naver