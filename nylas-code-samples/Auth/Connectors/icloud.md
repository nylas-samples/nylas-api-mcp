To create an iCloud connector,  make a [`POST /v3/connectors` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors) and set the  `provider` to `icloud`.

When you start an authentication request for an iCloud account, use the `Bearer auth` request header with your Nylas application's API key, set `provider_type: "icloud"`, and include any states.
