If you used the Dashboard Migration button, or the [Import application settings endpoint](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/import-v2-app), Nylas created a Microsoft connector in your v3 application, but didn't configure it because of the required Microsoft Graph changes. You can't connect Microsoft users in v3 until you update your application.

To complete the import process, you can make an [Update connector request](https://developer.nylas.com/docs/api/v3/admin/#patch-/v3/connectors/-provider-) to update the `client_id` and `client_secret` to those used by the Azure auth app you configured with Graph scopes.

```API
curl --location --request PATCH 'http://api.us.nylas.com/v3/connectors/microsoft' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "settings":
    {
      "client_id": "<AZURE_CLIENT_ID>",
      "client_secret": "<AZURE_CLIENT_SECRET",
      "tenant": "<AZURE_TENANT>" // Optional. Can be tenant ID or common.
    },
    "scope": 
    [
    "Mail.Read",
    "User.Read",
    "offline_access"
    ]
  }'
```

You can also [configure default scopes for users connecting through Microsoft](https://developer.nylas.com/docs/v3/auth/#create-a-connector).

If you prefer, you can also update the Microsoft connector from the Dashboard:

1. Navigate to the v3 Dashboard, click **Connectors**, click **...** (the "more" menu) next to the Microsoft connector and select **Edit**.
2. On the page that appears, update the Client ID and Client secret for the Microsoft connector.
3. Next, scroll down to **Authentication scopes** section, and select the scopes your app needs.
4. Click **Save**.
