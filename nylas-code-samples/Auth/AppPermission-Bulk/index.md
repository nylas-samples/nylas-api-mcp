You can use connector credentials for bulk authentication with Google's Service Accounts. What are connector credentials, I hear you asking? They're new in v3, read on...

#### Introducing connector credentials

Nylas v3 includes "credentials", which are packages of information that you can use when authenticating to override default connector settings and auth methods. You might use this if you're using more than one GCP auth app to authenticate your end users.

You can create credentials for alternate GCP auth apps, which include the app's `client_id` and `client_secret`, and any other connection settings. Nylas encrypts and stores this information securely in a credential record. You then refer to the record in Custom auth requests using the `credential_id`. This allows you to authenticate end users with the non-default GCP auth app.

Connector credentials are linked to a specific connector in a specific Nylas application. If you created the connector credential for a specific Google connector, you can't use the `credential_id` for a different connector, or with a different Nylas application.

### Bulk authentication with Google Service Accounts

You can use connector credentials for bulk authentication with Google's Service Accounts. To do this, first create a [Google auth app](https://developer.nylas.com/docs/dev-guide/provider-guides/google/create-google-app/) and a [Google connector](https://developer.nylas.com/docs/dev-guide/provider-guides/google/create-google-app/#add-a-connector-to-your-nylas-application). Next, create your connector credential:

1. Make a [`POST /v3/connectors/<PROVIDER>/creds` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors/-provider-/creds).
2. Nylas returns a JSON response with the `id` of the new connector credential. Be sure to save it somewhere secure.

Now, you can create an app permission grant:

1. Make a [`POST /v3/connect/custom` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connect/custom) that includes the `credential_id` of the connector credential you created.
2. Nylas returns a JSON response containing the grant's information.
