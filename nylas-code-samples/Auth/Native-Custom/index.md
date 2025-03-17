Nylas v3 preserves Native authentication ("Bring your own token") almost unchanged, but renames it "Custom authentication". If you already have a refresh token (or credentials, if using IMAP) for your end users from your own authentication implementation, you can use it with the Nylas APIs to create a grant and get the `grant_id`, which you then use in requests to the provider.

### Upgrading Native authentication to Custom authentication

If you used Native auth in Nylas v2.x, the only changes are to the Nylas API URLs, the requirement that you create a connector (previously called an "integration") for your application, and the change from token authentication to bearer-token authentication.

The v3 requests now go through a connector, which can supply some of the provider details. This makes your [v3 Custom auth requests](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/custom) much simpler: you now pass the provider and request token, and can include scopes overrides and a state.

See [Creating grants with Custom authentication](https://developer.nylas.com/docs/v3/auth/custom/) for more details.

### Migrated endpoints

- Native auth → Custom auth: `POST /connect/token` → [`POST /v3/connect/custom`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/custom)

### Removed Connect endpoints

- Native auth - Exchange Token: `POST /connect/token`

### Create a grant using a Custom authentication flow

`POST /auth` → [`POST /v3/connect/custom`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/custom)

```Node
import 'dotenv/config';
import Nylas from 'nylas';

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY as string,
  apiUri: process.env.NYLAS_API_URI as string,
};

// gpt: does not initialize Nylas SDK, was using string
const nylas = new Nylas(NylasConfig);

async function customAuthentication() {
  const auth = await nylas.auth.customAuthentication({
    requestBody: {
      provider: "<PROVIDER>",
      settings: {
        username: "<USERNAME>",
        password: "<PASSWORD>"
      },
      state: "<STATE>",
      scope: ["email.read_only", "calendar.read_only", "contacts.read_only"],
    }
  })
  console.log({ auth });
}

await customAuthentication();
```

```Java
package org.example;

import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws
            NylasSdkTimeoutError, NylasApiError {
        NylasClient nylas = new NylasClient.Builder(<NYLAS_API_KEY>).build();
        AuthProvider provider = AuthProvider.ICLOUD;
        Map<String, String> settings = new HashMap<String, String>();
        settings.put("username","<USERNAME>");
        settings.put("password","<PASSWORD>");
        List<String> scope = new ArrayList<String>();
        scope.add("email.read_only");
        scope.add("calendar.read_only");
        scope.add("contacts.read_only");
        CreateGrantRequest request_body = new CreateGrantRequest(provider,settings, "<STATE>", scope);
        Response<Grant> auth = nylas.auth().customAuthentication(request_body);
        System.out.println(auth);
    }
}

```

```Python
import os
import sys
from nylas import Client
from nylas.models.grants import CreateGrantRequest
from nylas.models.auth import Provider

nylas = Client(
  "<NYLAS_API_KEY>",
  "<NYLAS_API_URI>"
)

request_body = CreateGrantRequest(
{
  "provider": "<PROVIDER>",
  "settings": {"username": "<USERNAME>", "password" : "<PASSWORD>"},
  "scope": ["email.read_only", "calendar.read_only", "contacts.read_only"],
  "state": "<STATE>"
} 
)

auth = nylas.auth.custom_authentication(request_body)
print(auth)

```

```Ruby
# Load gems
require 'dotenv/load'
require 'nylas'

# Initialize Nylas client
nylas = Nylas::Client.new(
 api_key: "<NYLAS_API_KEY>"
)

# Request body
request_body = {
  provider: '<PROVIDER>',
  settings: {'username': '<USERNAME>', 'password': '<PASSWORD>'},
  scope: 'email.read_only,calendar.read_only,contacts.read_only',
  state: '<STATE>'
}

# Call Custom Authentication
auth = nylas.auth.custom_authentication(request_body)
puts auth
```

```API
curl --request POST \
 --url "https://api.us.nylas.com/v3/connect/custom" \
 --header 'Accept: application/json' \
 --header 'Authorization: Bearer <NYLAS_API_KEY>' \
 -H "accept: application/json"\
 -H "content-type: application/json" \
 -d '{"provider":"<PROVIDER>","settings":{"username":"<USERNAME>","password":"<PASSWORD>"},
      "scope":"email.read_only,calendar.read_only,contacts.read_only"}'
```
