You can use connector credentials for bulk authentication with Microsoft's Admin Consent flow. What are connector credentials, I hear you asking? They're new in v3, read on...

#### Introducing connector credentials

Nylas v3 includes "credentials", which are packages of information that you can use when authenticating to override default connector settings and auth methods. You might use this if you're using more than one Azure auth app to authenticate your end users.

You can create credentials for alternate Azure auth apps, which include the app's `client_id` and `client_secret`, and any other connection settings. Nylas encrypts and stores this information securely in a credential record. You then refer to the record in Custom auth requests using the `credential_id`. This allows you to authenticate end users with the non-default Azure auth app.

Connector credentials are linked to a specific connector in a specific Nylas application. If you created the connector credential for a specific Microsoft connector, you can't use the `credential_id` for a different connector, or with a different Nylas application.

### Bulk authentication with Microsoft Admin Consent

You can use connector credentials for bulk authentication with Microsoft's "Admin consent" system. To do this, first [create an Azure auth app](https://developer.nylas.com/docs/dev-guide/provider-guides/microsoft/create-azure-app/), then open the app in the Azure Dashboard and configure it:

1. From the **Authentication** tab, add a platform and set its **redirect URI**.
2. Select **Certificates & secrets** and create a `client_secret`. Be sure to save it somewhere secure — the Dashboard only shows the value once!
3. Under **API permissions**, add all Microsoft Graph scopes that your project needs access to.
    - You don't need to select **Grant admin consent**. You add this later using a special Nylas authorization API call.
4. Select **Manifest** and add the following values:
    - `"accessTokenAcceptedVersion": 2`
    - `"signInAudience": "AzureADandPersonalMicrosoftAccount"`

#### Microsoft Service Accounts

Nylas v3 supports two versions of Microsoft's Service Accounts:

- **Version 1.0**: The _older_ version, where every scope defined in your Azure auth app is required during the authorization step of the Admin Consent flow. The `tenant` definition is optional, and Nylas uses `"tenant": "common"` if it's not defined.
- **Version 2.0**: The _new_ version, where scopes are defined for the Admin Consent flow only. All requested scopes must still be defined in your Azure auth app, and you must specify the exact `tenant` (v2.0 doesn't support `"tenant": "common"`).

Nylas automatically determines which version of the Admin Consent flow to use.

#### Prepare for Admin Consent flow

Before you begin, [set up a Microsoft connector](https://developer.nylas.com/docs/dev-guide/provider-guides/microsoft/create-azure-app/#add-a-microsoft-connector-to-nylas). Then, prepare your Nylas application for the Microsoft Admin Consent flow.

1. Make a [`POST /v3/connectors/<PROVIDER>/creds` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors/-provider-/creds) to create a connector credential. The request must include the `client_id` and `client_secret` for your provider auth app, and can include a `tenant`.
    - If you don't define the `client_id` and `client_secret`, Nylas uses the credentials associated with your application's Microsoft connector.
    - If you define the `tenant`, Nylas attempts to use Microsoft's Admin Consent flow v2.0.
2. Nylas returns a JSON response with the `id` of the new connector credential. Be sure to save it somewhere secure.

#### Make an Admin Consent flow request

Now you can make a request to use the Microsoft Admin Consent flow with the Nylas APIs.

1. Make a [`GET /v3/connect/auth` request](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connect/auth) and set `response_type` to `adminconsent`, and `credential_id` to the ID of the connector credential you created.
2. Nylas redirects the Service Account to the redirect URI. The response URL contains `admin_consent:true` and the contents of the `state`, if defined.
    - If the flow isn't successful, Nylas returns a normal OAuth 2.0 error.
3. Make a [`POST /v3/connect/custom` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/custom) to create a grant for the Service Account.
4. Nylas returns a JSON response containing the grant's information.
