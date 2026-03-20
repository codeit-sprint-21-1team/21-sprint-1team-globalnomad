export interface OAuthSignInRequest {
  token: string;
  redirectUri: string;
}

export interface OAuthSignUpRequest extends OAuthSignInRequest {
  nickname: string;
}
