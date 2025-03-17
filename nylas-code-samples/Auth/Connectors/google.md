To create a Google connector, make a [`POST /v3/connectors` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors) that includes your Google Cloud Platform (GCP) `client_id` and `client_secret`, and a default set of scopes for your project. You can also [configure the default scopes](https://developer.nylas.com/docs/v3/auth/#create-a-connector) for end users who authenticate through the Google connector.

Make sure the scopes on the connector exactly match or are a literal subset of the scopes on your GCP app.
