/**
 * Authentication types shared between frontend and backend
 */

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenPayload {
  sub: string | null;
  exp: number | null;
}

export interface GoogleAuthResponse {
  authorization_url: string;
}
