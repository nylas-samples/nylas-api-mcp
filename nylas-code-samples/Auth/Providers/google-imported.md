If you used the Dashboard Migration button, or the [Import application settings endpoint](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/import-v2-app), Nylas created a connector for Google, but left the Scopes blank for you to fill in. Use the Google scopes you calculated in the previous steps.

To complete the import process, you can make an [Update connector request](https://developer.nylas.com/docs/api/v3/admin/#patch-/v3/connectors/-provider-) to update the scopes.

```API
curl --location --request PATCH 'http://api.us.nylas.com/v3/connectors/google' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "scope": 
        [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
        ]
  }'
```

If you prefer, you can also update the Microsoft connector from the Dashboard:

1. Navigate to the v3 Dashboard, click **Connectors**, click **...** (the "more" menu) next to the Microsoft connector and select **Edit**.
2. On the page that appears, double-check that the Client ID and Client secret for the Google connector are correct, and update them if needed.
3. Next, scroll down to **Authentication scopes** section, and select the scopes your app needs.
4. Click **Save**.
