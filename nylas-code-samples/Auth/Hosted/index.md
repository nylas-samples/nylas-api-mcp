Nylas v3 introduces a Hosted OAuth system that completely replaces v2 Hosted Auth. The new Hosted OAuth system is OAuth 2.0-compliant, and offers multiple ways to authorize requests after you complete the authentication process. Nylas also offers PKCE options for use with single page applications (SPAs) and mobile apps.

OAuth access tokens expire after one hour, so for most applications, Nylas recommends authenticating end users with OAuth, then using an application API key to authorize requests so you don't need to worry about refresh tokens. You can also choose to receive a refresh token during the authentication process, then use it to get a new access token when an older one expires.

To access your end users' data using pure OAuth, pass the access token as the Bearer token in your request's auth header.

See [Authentication in Nylas v3](https://developer.nylas.com/docs/v3/auth/) and the [Authentication references](https://developer.nylas.com/docs/api/v3/admin/#tag--Authentication-APIs) for more details.

### New Hosted OAuth endpoints

- Revoke an OAuth token: [`POST /v3/connect/revoke`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/revoke)

### Migrated Hosted auth endpoints

- Hosted auth - Authenticate user → Hosted OAuth - Authorization request (`GET /oauth/authorize` → [`GET /v3/connect/auth`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connect/auth))
- Hosted auth - Send authorization code → Hosted OAuth - Token exchange (`POST /oauth/token` → [`POST /v3/connect/token`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/token))
- Get token information: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/token-info` → [`GET /v3/connect/tokeninfo`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connect/tokeninfo)

### Deprecated Hosted auth endpoints

- Revoke all access tokens: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/revoke-all`

### Start a Hosted OAuth authorization request

`GET /oauth/authorize` → [`GET /v3/connect/auth`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connect/auth)

```Node
import 'dotenv/config'
import express from 'express'
import Nylas from 'nylas'

const config = {
  clientId: process.env.NYLAS_CLIENT_ID,
  callbackUri: "http://localhost:3000/oauth/exchange",
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas({ 
  apiKey: config.apiKey, 
  apiUri: config.apiUri,
})

const app = express()
const port = 3000

// Route to initialize authentication.
app.get('/nylas/auth', (req, res) => {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: config.clientId,
    provider: 'google',
    redirectUri: config.redirectUri,
    loginHint: 'email_to_connect',
    accessType: 'offline',
  })

  res.redirect(authUrl)
})   
```

```Java
get("/nylas/auth", (request, response) -> {
  List<String> scope = new ArrayList<>();
  scope.add("https://www.googleapis.com/auth/calendar");

  UrlForAuthenticationConfig config = new UrlForAuthenticationConfig("<NYLAS_CLIENT_ID>",
      "http://localhost:4567/oauth/exchange",
      AccessType.ONLINE,
      AuthProvider.GOOGLE,
      Prompt.DETECT,
      scope,
      true,
      "sQ6vFQN",
      "swag@nylas.com");

  String url = nylas.auth().urlForOAuth2(config);
  
  response.redirect(url);
  return null;
});   
        
get("/oauth/exchange", (request, response) -> {
  String code = request.queryParams("code");

  if(code == null) { response.status(401);}
  assert code != null;

  CodeExchangeRequest codeRequest = new CodeExchangeRequest(
      "http://localhost:4567/oauth/exchange",
      code,
      "<NYLAS_CLIENT_ID>",
      null,
      null);

  try{
    CodeExchangeResponse codeResponse = nylas.auth().exchangeCodeForToken(codeRequest);

    request.session().attribute("grant_id", codeResponse.getGrantId());

    return "%s".formatted(codeResponse.getGrantId());
  }catch(Exception e){
    return  "%s".formatted(e);
  }
});           
```

```Python
@app.route("/nylas/auth", methods=["GET"])
def login():
  if session.get("grant_id") is None:
    config = URLForAuthenticationConfig({"client_id": "<NYLAS_CLIENT_ID>", 
        "redirect_uri" : "http://localhost:5000/oauth/exchange"})

    url = nylas.auth.url_for_oauth2(config)
    return redirect(url)
  else:
    return f'{session["grant_id"]}'

@app.route("/oauth/exchange", methods=["GET"])
def authorized():
  if session.get("grant_id") is None:
    code = request.args.get("code")

    exchangeRequest = CodeExchangeRequest({"redirect_uri": "http://localhost:5000/oauth/exchange",
        "code": code, "client_id": "<NYLAS_CLIENT_ID>"})

    exchange = nylas.auth.exchange_code_for_token(exchangeRequest)
    session["grant_id"] = exchange.grant_id

    return redirect(url_for("login"))
```

```Ruby
get '/nylas/auth' do
  config = {
    client_id: '<NYLAS_CLIENT_ID>',
    provider: 'google',
    redirect_uri: 'http://localhost:4567/oauth/exchange',
    login_hint: 'swag@nylas.com',
    access_type: 'offline'
  }

  url = nylas.auth.url_for_oauth2(config)
  redirect url
end   


get '/oauth/exchange' do
  code = params[:code]
  status 404 if code.nil?

  begin
    response = nylas.auth.exchange_code_for_token({
        client_id: '<NYLAS_CLIENT_ID>',
        redirect_uri: 'http://localhost:4567/oauth/exchange',
        code: code})
  rescue StandardError
    status 500
  else
    response[:grant_id]
    response[:email]
    session[:grant_id] = response[:grant_id]
  end
end
```

```API
curl -X GET "https://api.us.nylas.com/v3/connect/auth?client_id=<CLIENT_ID>&provider=<PROVIDER>&redirect_uri=<REDIRECT_URI>&response_type=<RESPONSE>"
```

### Get token information

`POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/token-info` → [`GET /v3/connect/tokeninfo`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connect/tokeninfo)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

// Configure the Nylas SDK with your API key and server URL
const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

const revokeToken = async () => {
  try {
    const token = process.env.TOKEN
    const response = await nylas.auth.accessTokenInfo(token)
    
    console.log('Token Revoked:', response)
  } catch (error) {
    console.error('Error removing connector:', error)
  }
}

revokeToken()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class GetTokenInfo {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<TokenInfoResponse> token = nylas.auth().idTokenInfo("<ACCESS_TOKEN_ID>");
    
    System.out.println(token);
  }
}
```

```Python
import sys
from nylas import Client

nylas = Client(
    '<NYLAS_API_KEY>',
    '<NYLAS_API_URI>'
)

request = nylas.auth.id_token_info(
    '<ACCESS_TOKEN_ID>',
)

print(request)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
   api_key: "<NYLAS_API_KEY>"
)

query_params = {
    id_token: "<ACCESS_TOKEN_ID>"
}

token_info = nylas.auth.access_token_info(query_params: query_params)

puts token_info
```

```API
curl --request GET \
  --url 'https://api.us.nylas.com/v3/connect/tokeninfo?id_token=<ACCESS_TOKEN_ID>&access_token=<NYLAS_ACCESS_TOKEN>' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
```

### Exchange tokens

`POST /connect/token` → [`POST /v3/connect/token`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/token)

```Node
app.get('/oauth/exchange', async (req, res) => {
  console.log(res.status)

  const code = req.query.code

  if (!code) {
    res.status(400).send('No authorization code returned from Nylas')
    return
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({ 
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      codeVerifier: 'insert-code-challenge-secret-hash',
      code
    })

    const { grantId } = response

    res.status(200)
  } catch (error) {
    console.error('Error exchanging code for token:', error)

    res.status(500).send('Failed to exchange authorization code for token')
  }
})
```

```Java
get("/oauth/exchange", (request, response) -> {
  String code = request.queryParams("code");

  if(code == null) { response.status(401); }

  assert code != null;

  CodeExchangeRequest codeRequest = new CodeExchangeRequest(
      "http://localhost:4567/oauth/exchange",
      code,
      "<NYLAS_CLIENT_ID>",
      "nylas"
  );

  try {
    CodeExchangeResponse codeResponse = nylas.auth().exchangeCodeForToken(codeRequest);

    return "%s".formatted(codeResponse);
  } catch(Exception e) {
    return  "%s".formatted(e);
  }
});
```

```Python
import json
import os
from functools import wraps
from io import BytesIO
from flask import Flask
from nylas import Client

nylas = Client(
    "<NYLAS_CLIENT_ID>",
    "<NYLAS_API_URI>"
)

REDIRECT_CLIENT_URI = 'http://localhost:9000/oauth/exchange'

@flask_app.route("/oauth/exchange", methods=["GET"])

def exchange_code_for_token():
  code_exchange_response = nylas.auth.exchange_code_for_token(
      request={
        "code": request.args.get('code'),
        "client_id": "<NYLAS_CLIENT_ID>",
        "redirect_uri": REDIRECT_CLIENT_URI
      }
  )

  return {
    'email_address': code_exchange_response.email,
    'grant_id': code_exchange_response.grant_id
  }
```

```Ruby
get '/oauth/exchange' do
  code = params[:code]
  status 404 if code.nil?

  begin
    response = nylas.auth.exchange_code_for_token({
      client_id: "<NYLAS_CLIENT_ID>",
      redirect_uri: 'http://localhost:4567/oauth/exchange',
      code: code
    })
  rescue StandardError
    status 500
  else
    grant_id = response[:grant_id]
    email = response[:email]

    "Grant_Id: #{grant_id} \n Email: #{email}"
  end
end
```

```API
curl -X POST "https://api.us.nylas.com/v3/connect/token" \
 -H "accept: application/json"\
 -H "content-type: application/json" \
 -d '{"client_id":"<NYLAS_CLIENT_ID>","client_secret":"<NYLAS_API_KEY>","grant_type":"authorization_code","code":"string","redirect_uri":"https://example.com/callback-handler","code_verifier":"nylas"}' \
```

### Revoke a specific token

You can use the [`POST /v3/connect/revoke` endpoint](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/revoke) to revoke a specific access token.

```Node
import 'dotenv/config'
import Nylas from 'nylas'

// Configure the Nylas SDK with your API key and server URL
const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

const revokeToken = async () => {
  try {
    const token = process.env.TOKEN
    const response = await nylas.auth.revoke(token)
    
    console.log('Token Revoked:', response)
  } catch (error) {
    console.error('Error removing connector:', error)
  }
}

revokeToken()
```

```Java
package org.example;

import com.nylas.NylasClient;
import com.nylas.models.TokenParams;

public class Revoke_Auth_Token {
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        NylasClient nylas = new NylasClient.Builder("<V3_TOKEN_API>").build();
        TokenParams token = new TokenParams("<NYLAS_AUTH_TOKEN>");

        try{
        boolean token_status = nylas.auth().revoke(token);
            if(token_status){
                System.out.println("The token was successfully removed");
            }else{
                System.out.println("The token cannot be removed");
            }
        }catch (Exception e){
            System.out.println("Invalid token cannot be removed");
        }
    }
}
```

```Python
from dotenv import load_dotenv
import os
from nylas import Client

load_dotenv()

nylas = Client(
    os.environ.get('NYLAS_API_KEY')
)

try:
    token_state = nylas.auth.revoke("")
    if token_state:
        print("The token was successfully removed")
    else:
        print("The token cannot be removed")
except:
    print("Invalid token cannot be removed")
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
  api_key: "<ACCESS_TOKEN_ID>"
)

token_state = nylas.auth.revoke("<NYLAS_AUTH_TOKEN>")
if(token_state)
  puts "The token was successfully removed"
else
  puts "Invalid token cannot be removed"
end
```

```API
curl -X POST "https://api.us.nylas.com/v3/connect/revoke?token=<NYLAS_AUTH_TOKEN>" \
 -H "accept: application/json" \
```
