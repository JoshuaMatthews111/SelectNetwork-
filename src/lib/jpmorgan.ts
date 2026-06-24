const DEFAULT_TOKEN_URL = "https://id.payments.jpmorgan.com/am/oauth2/alpha/access_token";
const DEFAULT_SCOPE = "jpm:payments:sandbox";

export type JpmorganTokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
};

export function hasJpmorganOAuthConfig() {
  return Boolean(process.env.JPMORGAN_CLIENT_ID && process.env.JPMORGAN_CLIENT_SECRET);
}

export async function getJpmorganAccessToken(): Promise<JpmorganTokenResponse> {
  const clientId = process.env.JPMORGAN_CLIENT_ID;
  const clientSecret = process.env.JPMORGAN_CLIENT_SECRET;
  const tokenUrl = process.env.JPMORGAN_ACCESS_TOKEN_URL || DEFAULT_TOKEN_URL;
  const scope = process.env.JPMORGAN_SCOPE || DEFAULT_SCOPE;

  if (!clientId || !clientSecret) {
    throw new Error("JPMorgan ACH credentials are not configured.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope,
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error_description || data?.error || "Unable to retrieve JPMorgan access token.");
  }

  if (!data?.access_token) {
    throw new Error("JPMorgan token response did not include an access token.");
  }

  return data as JpmorganTokenResponse;
}
