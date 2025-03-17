To create a Microsoft connector, make a [`POST /v3/connectors` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors) that includes your Azure `client_id` and `client_secret`, and a default set of scopes for your project.

When you start an authentication request with Microsoft, you use the `Bearer auth` request header with your Nylas application's API key, set `provider_type: "microsoft"`, and include any non-default scopes and states for the end user.

:::warn
⚠️ **Before you create a Microsoft connector, make sure you've migrated your project's old scopes to the new Microsoft Graph scopes and entered them in your Azure application's Entra ID**. Because the upgrade to Nylas v3 includes this scope update, all Microsoft users must re-authenticate to accept the new v3 scopes.
:::
